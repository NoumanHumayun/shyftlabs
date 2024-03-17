import "./AddStudent.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import DatePicker from "react-date-picker";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { BASE_URL } from "../../utilies/constants";
import TextField from "@mui/material/TextField";
export default function AddStudent() {
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({});
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [dob, onDOBChange] = useState(new Date());
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    familyName: "",
    email: "",
    DOB: "",
  });

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 10);

  const handleChange = (e, key) => {
    const { value } = e.target;
    let target = "First Name";
    switch (key) {
      case "firstName":
        target = "First Name";
        break;
      case "familyName":
        target = "Family Name";
        break;
      case "email":
        target = "Email";
        break;
      default:
        target = "Date of Birth";
        break;
    }
    if (key === "email") {
      var re = /\S+@\S+\.\S+/;
      if (!re.test(value))
        setErrors({ ...errors, [key]: `${target} must be valid` });
      else
        setErrors({
          ...errors,
          [key]: "",
        });
    } else {
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
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (
      errors.email.length ||
      errors.firstName.length ||
      errors.familyName.length
    ) {
      return;
    }

    fetch(BASE_URL + "/student/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        familyName: familyName,
        DOB: dob,
        email: email,
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
            message: ["Student succesfully added"],
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
      <div className="newStudent">
        <h3 className="newStudentTitle">New Student</h3>
        <form className="newStudentForm">
          <div className="newStudentItem">
            <label htmlFor="">First Name</label>
            <TextField
              error={errors.firstName.length > 0}
              className="newStudentItemInput"
              type="text"
              name="firstName"
              placeholder="John"
              onChange={(e) => {
                setFirstName(e.target.value);
                handleChange(e, "firstName");
              }}
              helperText={errors.firstName}
            />
          </div>
          <div className="newStudentItem">
            <label htmlFor="">Family Name</label>
            <TextField
              className="newStudentItemInput"
              type="text"
              name="familyName"
              error={errors.familyName.length > 0}
              helperText={errors.familyName}
              placeholder="Doe"
              onChange={(e) => {
                setFamilyName(e.target.value);
                handleChange(e, "familyName");
              }}
            />
          </div>
          <div className="newStudentItem">
            <label htmlFor="">Email</label>
            <TextField
              error={errors.email.length > 0}
              className="newStudentItemInput"
              type="email"
              name="email"
              placeholder="john@doe.com"
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange(e, "email");
              }}
              helperText={errors.email}
            />
          </div>
          <div className="newStudentItem">
            <label htmlFor="">Birth Date</label>
            <DatePicker
              error={errors.DOB.length > 0}
              onChange={onDOBChange}
              value={dob}
              maxDate={maxDate}
              helperText={errors.DOB}
            />
            {/* <input  type="password" name="password" placeholder="Password" /> */}
          </div>

          <div className="newStudentItem">
            <button className="newStudentItemBtn" onClick={submit}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
