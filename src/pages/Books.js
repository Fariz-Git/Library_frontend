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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function Books() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [editData, setEditData] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    totalQuantity: "",
    availableQuantity: "",
  });

  const fetchBooks = useCallback(async () => {
    const res = await fetch(
      `${BASE_URL}/books?page=${page + 1}&limit=${pageSize}`
    );
    const data = await res.json();
    setRows(data.data);
    setRowCount(data.total);
  }, [page, pageSize]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
    setOpenEdit(false);
    fetchBooks();
  };

  const handleAdd = async () => {
    await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newBook.title,
        author: newBook.author,
        totalQuantity: Number(newBook.totalQuantity),
      }),
    });

    setOpenAdd(false);
    setNewBook({
      title: "",
      author: "",
      totalQuantity: "",
      availableQuantity: "",
    });

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
      {/* Centered Title */}
      <Box textAlign="center">
       <h2>Books</h2>
        </Box>

    <Box display="flex" justifyContent="flex-end" mb={2}>
   <Button size="small" variant="contained" onClick={() => setOpenAdd(true)}>
    + Add Book
     </Button>
      </Box>

      <DataGrid rows={rows} columns={columns} hideFooter autoHeight />

      <Stack mt={2} alignItems="center">
        <Pagination
          count={Math.ceil(rowCount / pageSize)}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
        />
      </Stack>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
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
              setEditData({
                ...editData,
                availableQuantity: e.target.value,
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

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Book </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={newBook.title}
            onChange={(e) =>
              setNewBook({ ...newBook, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Author"
            value={newBook.author}
            onChange={(e) =>
              setNewBook({ ...newBook, author: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Total Quantity"
            value={newBook.totalQuantity}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                totalQuantity: e.target.value,
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

export default Books;