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
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../redux/slices/bookSlice";

function Books() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rows, total } = useSelector((state) => state.books);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [editData, setEditData] = useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    totalQuantity: "",
  });

  const loadBooks = useCallback(() => {
    dispatch(
      fetchBooks({
        page: page + 1,
        limit: pageSize,
        search: search,
      })
    );
  }, [dispatch, page, pageSize, search]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleDelete = async (id) => {
    await dispatch(deleteBook(id));
    loadBooks();
  };

  const handleUpdate = async () => {
    await dispatch(
      updateBook({
        id: editData.id,
        data: {
          totalQuantity: Number(editData.totalQuantity),
          availableQuantity: Number(editData.availableQuantity),
        },
      })
    );

    setOpenEdit(false);
    loadBooks();
  };

  const handleAdd = async () => {
    await dispatch(
      addBook({
        title: newBook.title,
        author: newBook.author,
        totalQuantity: Number(newBook.totalQuantity),
      })
    );

    setOpenAdd(false);

    setNewBook({
      title: "",
      author: "",
      totalQuantity: "",
    });

    loadBooks();
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
        <h2>BOOKS</h2>
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
          sx={{ width: 200 }}
        />

        <Button
          size="small"
          variant="contained"
          onClick={() => setOpenAdd(true)}
        >
          + Add Book
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
              setPageSize(Number(e.target.value));
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

      {/* ADD BOOK */}

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Book</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={newBook.title}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                title: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Author"
            value={newBook.author}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                author: e.target.value,
              })
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

      {/* EDIT BOOK */}

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Book</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Total Quantity"
            value={editData?.totalQuantity || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                totalQuantity: e.target.value,
              })
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
    </Box>
  );
}

export default Books;