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
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBorrow,
  issueBook,
  returnBook,
} from "../redux/slices/borrowSlice";

function Borrow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rows, total } = useSelector((state) => state.borrow);

  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const [search, setSearch] = useState("");

  const [openIssue, setOpenIssue] = useState(false);

  const [issueData, setIssueData] = useState({
    studentId: "",
    bookId: "",
  });

  const loadBorrow = useCallback(() => {
    dispatch(
      fetchBorrow({
        page: page + 1,
        limit: pageSize,
        search: search,
      })
    );
  }, [dispatch, page, pageSize, search]);

  useEffect(() => {
    loadBorrow();
  }, [loadBorrow]);

  const handleIssue = async () => {
    await dispatch(
      issueBook({
        studentId: Number(issueData.studentId),
        bookId: Number(issueData.bookId),
      })
    );

    setOpenIssue(false);

    setIssueData({
      studentId: "",
      bookId: "",
    });

    loadBorrow();
  };

  const handleReturn = async (id) => {
    await dispatch(returnBook(id));
    loadBorrow();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    { field: "student", headerName: "Student", flex: 1 },

    { field: "book", headerName: "Book", flex: 1 },

    {
      field: "returned",
      headerName: "Status",
      flex: 1,
      renderCell: (params) =>
        params.row.returned ? "Returned" : "Not Returned",
    },

    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) =>
        !params.row.returned && (
          <Button
            size="small"
            variant="contained"
            onClick={() => handleReturn(params.row.id)}
          >
            Return
          </Button>
        ),
    },
  ];

  return (
    <Box p={3}>
      <Box textAlign="center">
        <h2>BORROW BOOKS</h2>
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
          onClick={() => setOpenIssue(true)}
        >
          + Issue Book
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

      <Stack mt={2} alignItems="center">
        <Pagination
          count={Math.ceil(total / pageSize)}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
        />
      </Stack>

      <Stack mt={2} alignItems="center">
        <Button variant="outlined" onClick={() => navigate("/")}>
          ← Back to Home
        </Button>
      </Stack>

      {/* ISSUE BOOK */}

      <Dialog open={openIssue} onClose={() => setOpenIssue(false)}>
        <DialogTitle>Issue Book</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Student ID"
            value={issueData.studentId}
            onChange={(e) =>
              setIssueData({
                ...issueData,
                studentId: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Book ID"
            value={issueData.bookId}
            onChange={(e) =>
              setIssueData({
                ...issueData,
                bookId: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenIssue(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleIssue}>
            Issue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Borrow;