import { DeleteOutline } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./Course.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utilies/constants";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({});

  useEffect(() => {
    fetch(BASE_URL + "/course/")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const deleteRow = (id) => {
    fetch(BASE_URL + "/course/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then(async (data) => {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        setOpen(true);
        if (data.deletedCount > 0) {
          setCourses(courses.filter((course) => course._id !== id));
          setAlertOptions({
            type: "success",
            message: ["Course succesfully deleted"],
          });
        } else
          setAlertOptions({
            type: "error",
            message: ["Error Occured, please try again"],
          });

        await delay(3000);
        setOpen(false);
      });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Course Name",
      width: 250,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="courseTableAction">
            <DeleteOutline
              className="courseListIcon delete"
              onClick={() => deleteRow(params.row._id)}
            />
          </div>
        );
      },
    },
  ];
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

      <div className="courseList">
        <div className="courseListTop">
          <h3 className="courseListTitle">Course List</h3>
          <Link to="/newCourse">
            <button className="courseCreateBtn">Create</button>
          </Link>
        </div>
        <div className="courseListContent">
          <DataGrid
            getRowId={(row) => row._id}
            rows={courses}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
