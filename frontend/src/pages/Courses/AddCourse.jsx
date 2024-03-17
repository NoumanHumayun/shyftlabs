import "./AddCourse.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { BASE_URL } from "../../utilies/constants";
import TextField from "@mui/material/TextField";
export default function AddCourse() {
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({});
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: "",
  });

  const handleChange = (e, key) => {
    const { value } = e.target;
    const target = "Course Name";

    if (value.length === 0)
      setErrors({ ...errors, [key]: `${target} is required` });
    if (value.length < 4 && value.length > 0)
      setErrors({
        ...errors,
        [key]: `${target} must be valid`,
      });
    else
      setErrors({
        ...errors,
        [key]: "",
      });
  };

  const submit = (e) => {
    e.preventDefault();
    if (errors.name.length) {
      return;
    }

    fetch(BASE_URL + "/course/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        setOpen(true);
        if (data.error) {
          setAlertOptions({ type: "error", message: data.message });
        } else if (data._id) {
          setAlertOptions({
            type: "success",
            message: ["Course succesfully added"],
          });
        }
        await delay(3000);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(!open);
      });
  };

  return (
    <div>
      <Collapse in={open}>
        <Alert
          severity={alertOptions?.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertOptions?.message?.map((element) => {
            return <p>{element}</p>;
          })}
        </Alert>
      </Collapse>
      <div className="newCourse">
        <h3 className="newCourseTitle">New Course</h3>
        <form className="newCourseForm">
          <div className="newCourseItem">
            <label htmlFor="">Course Name</label>
            <TextField
              error={errors.name.length > 0}
              className="newCourseItemInput"
              type="text"
              name="name"
              placeholder="John"
              onChange={(e) => {
                setName(e.target.value);
                handleChange(e, "name");
              }}
              helperText={errors.name}
            />
          </div>

          <div className="newCourseItem">
            <button className="newCourseItemBtn" onClick={submit}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
