import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../redux/slices/studentSlice";

function Students() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rows, total } = useSelector((state) => state.students);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [editData, setEditData] = useState(null);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    department: "",
  });

  const loadStudents = useCallback(() => {
    dispatch(
      fetchStudents({
        page: page + 1,
        limit: pageSize,
        search: search,
      })
    );
  }, [dispatch, page, pageSize, search]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleDelete = async (id) => {
    await dispatch(deleteStudent(id));
    loadStudents();
  };

  const handleUpdate = async () => {
    await dispatch(
      updateStudent({
        id: editData.id,
        data: editData,
      })
    );

    setOpenEdit(false);
    loadStudents();
  };

  const handleAdd = async () => {
    await dispatch(addStudent(newStudent));

    setOpenAdd(false);

    setNewStudent({
      name: "",
      email: "",
      department: "",
    });

    loadStudents();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    { field: "name", headerName: "Name", flex: 1 },

    { field: "email", headerName: "Email", flex: 1 },

    { field: "department", headerName: "Department", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,

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
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
        />

        <Button
          size="small"
          variant="contained"
          onClick={() => setOpenAdd(true)}
        >
          + Add Student
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        hideFooter
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
        }}
      />

      <Stack
        mt={2}
        direction="row"
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          count={Math.ceil(total / pageSize)}
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
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack mt={3} alignItems="center">
        <Button variant="outlined" onClick={() => navigate("/")}>
          ← Back to Home
        </Button>
      </Stack>

      {/* EDIT DIALOG */}

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Student</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={editData?.name || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                name: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Email"
            value={editData?.email || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                email: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Department"
            value={editData?.department || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                department: e.target.value,
              })
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

      {/* ADD STUDENT */}

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Student</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                name: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                email: e.target.value,
              })
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
    </Box>
  );
}

export default Students;