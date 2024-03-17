import "./AddResult.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { BASE_URL } from "../../utilies/constants";
import TextField from "@mui/material/TextField";
import { InputLabel, MenuItem, Select } from "@mui/material";
export default function AddResult() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({});
  const [grade, setGrade] = useState("");
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({
    grade: "",
    student: "",
    course: "",
  });

  useEffect(() => {
    fetch(BASE_URL + "/course/")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });

    fetch(BASE_URL + "/student/")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  const handleChange = (e, target) => {
    const { value } = e.target;
    if (target === "course") setCourse(value);
    else setStudent(value);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!grade) setErrors({ ...errors, grade: "Grade is required" });
    else setErrors({ ...errors, grade: "" });
    if (!student) setErrors({ ...errors, student: "Student is required" });
    else setErrors({ ...errors, student: "" });
    if (!course) setErrors({ ...errors, course: "Course is required" });
    else setErrors({ ...errors, course: "" });

    if (
      (errors.grade.length || errors.course.length || errors.student.length)
    ) {
      return;
    }

    fetch(BASE_URL + "/result/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grade: grade,
        student: student,
        course: course
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
            message: ["Result succesfully added"],
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
      <div className="newResult">
        <h3 className="newResultTitle">New Result</h3>
        <form className="newResultForm">
          <div className="newResultItem">
            <InputLabel id="course">Course Name</InputLabel>
            <Select
              labelId="course"
              id="course"
              value={course}
              label="Course Name"
              onChange={(e) => handleChange(e, "course")}
            >
              {courses.map((res) => {
                return (
                  <MenuItem key={res._id} value={res._id}>
                    {res.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="newResultItem">
            <InputLabel id="course">Student Name</InputLabel>
            <Select
              labelId="student"
              id="student"
              value={student}
              label="Student Name"
              onChange={(e) => handleChange(e, "student")}
            >
              {students.map((res) => {
                return (
                  <MenuItem key={res._id} value={res._id}>
                    {res.firstName + " " + res.familyName}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="newResultItem">
            <InputLabel id="course">Grade</InputLabel>
            <Select
              labelId="grade"
              id="grade"
              value={grade}
              label="Grade"
              onChange={(e) => setGrade(e.target.value)}
            >
              <MenuItem key="A" value="A">
                A
              </MenuItem>
              <MenuItem key="B" value="B">
                B
              </MenuItem>
              <MenuItem key="C" value="C">
                C
              </MenuItem>
              <MenuItem key="D" value="D">
                D
              </MenuItem>
              <MenuItem key="E" value="E">
                E
              </MenuItem>
              <MenuItem key="F" value="F">
                F
              </MenuItem>
            </Select>
          </div>

          <div className="newResultItem">
            <button className="newResultItemBtn" onClick={submit}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
