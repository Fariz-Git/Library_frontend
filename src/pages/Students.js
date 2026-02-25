import { useEffect, useState } from "react";
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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function Students() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchStudents = async () => {
    const res = await fetch(
      `${BASE_URL}/students?page=${page + 1}&limit=${pageSize}`
    );
    const data = await res.json();
    setRows(data.data);
    setRowCount(data.total);
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

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
      body: JSON.stringify({
        name: editData.name,
        email: editData.email,
        department: editData.department,
      }),
    });
    setOpen(false);
    fetchStudents();
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
              setOpen(true);
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
      
      <h2 style={{ textAlign: "center" }}>STUDENTS</h2>

      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        autoHeight
      />

      <Stack mt={2} alignItems="center">
        <Pagination
          count={Math.ceil(rowCount / pageSize)}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
          color="primary"
        />
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)}>
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

       <center><Button variant="outlined" onClick={() => navigate("/")}>
        ← Back to Home
      </Button>
      </center>
    </Box>
  );
}

export default Students;