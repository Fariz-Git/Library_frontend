import { useEffect, useState, useCallback } from "react";
import {Box, Button, Dialog,DialogTitle,DialogContent, DialogActions,
  TextField, Stack, Pagination,MenuItem,Select,FormControl,
  InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function Students() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize , setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [editData, setEditData] = useState(null);
  const [search ,   setSearch] = useState ("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    department: "",
  });

  const fetchStudents = useCallback(async () => {
    const res = await fetch(
      `${BASE_URL}/students?page=${page + 1}&limit=${pageSize}&search=${search}`
    );
    const data = await res.json();
    setRows(data.data);
    setRowCount(data.total);
  }, [page, pageSize, search]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/students/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  const handleUpdate = async () => {
    await fetch(`${BASE_URL}/students/${editData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setOpenEdit(false);
    fetchStudents();
  };

  const handleAdd = async () =>  {
    try{
      const res = await fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    if (res.ok){
      alert ("New Student Added")
      setOpenAdd(false);
      setNewStudent({ name: "", email: "", department: "" });
      fetchStudents();
    }else {
    alert("Failed to add student or Email address already exist");
    }
  }catch (error){
    alert("server error");
    console.error(error);
  }
};

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <EditIcon
            sx={{ cursor: "pointer", mr: 1 }}
            onClick={() => {
              setEditData(params.row);
              setOpenEdit(true);
            }}
          />
          <DeleteIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <Box p={3}>

    <Box textAlign="center">
     <h2>STUDENTS</h2>
      </Box>

 <Box 
  display="flex" 
  justifyContent="space-between" 
  alignItems="center"
  mb={2}
>
  {/* Search bar */}
  <TextField
    size="small"
    label="Search"
    value={search}
    onChange={(e) => {
      setPage(0);
      setSearch(e.target.value);
    }}
    sx={{ width: 200 }}
  />

  {/* Add Student Button */}
  <Button 
    size="small" 
    variant="contained" 
    onClick={() => setOpenAdd(true)}
  >
    + Add Student
      </Button>
  </Box>
  
      <DataGrid rows={rows} columns={columns} autoHeight 
        sx={{backgroundColor : "white" , borderRadius :2 , boxShadow :2 }} />

       <Stack
        mt={2}
        direction="row"
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          count={Math.ceil(rowCount / pageSize)}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
        />

        <FormControl size="small">
          <InputLabel>Per Page</InputLabel>
          <Select
            value={pageSize}
            label="Per Page"
            onChange={(e) => {
              setPage(0);
              setPageSize(e.target.value);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={editData?.name || ""}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            value={editData?.email || ""}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Department"
            value={editData?.department || ""}
            onChange={(e) =>
              setEditData({ ...editData, department: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Department"
            value={newStudent.department}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                department: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <center>
      <Button variant="outlined" onClick={() => navigate("/")}>
        ← Back to Home
      </Button>
      </center>
    </Box>
  );
}

export default Students;