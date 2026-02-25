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
import { UNSAFE_ViewTransitionContext, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function Books() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchBooks = async () => {
    const res = await fetch(
      `${BASE_URL}/books?page=${page + 1}&limit=${pageSize}`
    );
    const data = await res.json();
    setRows(data.data);
    setRowCount(data.total);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/books/${id}`, {
      method: "DELETE",
    });
    fetchBooks();
  };

  const handleUpdate = async () => {
    await fetch(`${BASE_URL}/books/${editData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalQuantity: Number(editData.totalQuantity),
        availableQuantity: Number(editData.availableQuantity),
      }),
    });
    setOpen(false);
    fetchBooks();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "totalQuantity", headerName: "Total", width: 120 },
    { field: "availableQuantity", headerName: "Available", width: 120 },
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
    
      <h2 style={{ textAlign: "center" }}>BOOKS</h2>

      <DataGrid rows={rows} columns={columns} hideFooter autoHeight />

      <Stack mt={2} alignItems="center">
        <Pagination
          count={Math.ceil(rowCount / pageSize)}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
          color="primary"
        />
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Total Quantity"
            value={editData?.totalQuantity || ""}
            onChange={(e) =>
              setEditData({ ...editData, totalQuantity: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Available Quantity"
            value={editData?.availableQuantity || ""}
            onChange={(e) =>
              setEditData({ ...editData, availableQuantity: e.target.value })
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

export default Books;