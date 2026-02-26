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

const BASE_URL = "http://localhost:3001";

function Borrow() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [openIssue, setOpenIssue] = useState(false);
  const [issueData, setIssueData] = useState({
    studentId: "",
    bookId: "",
  });

  const fetchBorrow = useCallback(async () => {
    const res = await fetch(
      `${BASE_URL}/borrow?page=${page + 1}&limit=${pageSize}`
    );
    const data = await res.json();

    const formatted = data.data.map((b) => ({
      id: b.id,
      student: b.student?.name,
      book: b.book?.title,
      returned: b.returned,
    }));

    setRows(formatted);
    setRowCount(data.total);
  }, [page, pageSize]);

  useEffect(() => {
    fetchBorrow();
  }, [fetchBorrow]);

  const handleIssue = async () => {
    await fetch(`${BASE_URL}/borrow/issue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: Number(issueData.studentId),
        bookId: Number(issueData.bookId),
      }),
    });

    setOpenIssue(false);
    setIssueData({ studentId: "", bookId: "" });
    fetchBorrow();
  };

  const handleReturn = async (id) => {
    await fetch(`${BASE_URL}/borrow/return/${id}`, {
      method: "POST",
    });
    fetchBorrow();
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
      {/* Centered Title */}
      <Box textAlign="center">
        <h2>BORROW BOOKS</h2>
      </Box>

      {/* Issue Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          size="small"
          variant="contained"
          onClick={() => setOpenIssue(true)}
        >
          + Issue Book
        </Button>
      </Box>

      <DataGrid rows={rows} columns={columns} hideFooter autoHeight />

      {/* Pagination */}
      <Stack mt={2} alignItems="center">
        <Pagination
          count={Math.ceil(rowCount / pageSize)}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
        />
      </Stack>

      {/* Back Button Centered Below Pagination */}
      <Stack mt={2} alignItems="center">
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Stack>

      {/* Issue Dialog */}
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
          <Button onClick={() => setOpenIssue(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleIssue}>
            Issue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Borrow;