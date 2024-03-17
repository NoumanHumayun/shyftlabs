import { DeleteOutline } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./Students.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utilies/constants";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({});

  useEffect(() => {
    fetch(BASE_URL + "/student/")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  const deleteRow = (id) => {
    fetch(BASE_URL + "/student/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then(async (data) => {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        setOpen(true);
        if (data.deletedCount > 0) {
          setStudents(students.filter((student) => student._id !== id));
          setAlertOptions({
            type: "success",
            message: ["Student succesfully deleted"],
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
      field: "firstName",
      headerName: "First Name",
      width: 250,
    },
    { field: "familyName", headerName: "Family Name", width: 250 },
    {
      field: "DOB",
      headerName: "Birth Date",
      width: 250,
      renderCell: (params) => new Date(params?.row?.DOB).toLocaleDateString(),
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="studentTableAction">
            <DeleteOutline
              className="studentListIcon delete"
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

      <div className="studentList">
        <div className="studentListTop">
          <h3 className="studentListTitle">Student List</h3>
          <Link to="/newStudent">
            <button className="studentCreateBtn">Create</button>
          </Link>
        </div>
        <div className="studentListContent">
          <DataGrid
            getRowId={(row) => row._id}
            rows={students}
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
