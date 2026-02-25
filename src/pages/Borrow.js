import { useEffect, useState , useCallback } from "react";
import {
  Box,
  Button,
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

  const fetchBorrow = useCallback(async () => {
    const res = await fetch(
      `${BASE_URL}/borrow?page=${page + 1}&limit=${pageSize}`
    );    
    const data = await res.json();

    const formatted = data.data.map((b) => ({
      id: b.id,
      student: b.student?.name,
      studentId: b.student?.id,
      book: b.book?.title,
      bookId: b.book?.id,
      returned: b.returned ? "Returned" : "Not Returned",
    }));

    setRows(formatted);
    setRowCount(data.total);
  }, [page, pageSize]);

  useEffect(() => {
    fetchBorrow();
  }, [fetchBorrow]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "student", headerName: "Student", flex: 1 },
    { field: "studentId", headerName: "Student ID", flex: 1 },
    { field: "book", headerName: "Book", flex: 1 },
    {field : "bookId", headerName: "Book ID", flex: 1},
    { field: "returned", headerName: "Status", flex: 1 },
  ];

  return (
    <Box p={3}>

      <h2 style={{ textAlign: "center" }}>BORROW RECORDS</h2>

      <DataGrid rows={rows} columns={columns} hideFooter autoHeight />

      <Stack mt={2} alignItems="center">
        <Pagination
          count={Math.ceil(rowCount / pageSize)}
          page={page + 1}
          onChange={(e, value) => setPage(value - 1)}
          color="primary"
        />
      </Stack>
      <center><Button variant="outlined" onClick={() => navigate("/")}>
        ← Back to Home
      </Button>
      </center>
    </Box>
  );
}

export default Borrow;