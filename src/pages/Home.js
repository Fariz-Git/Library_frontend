import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const BASE_URL = "http://localhost:3001";

function Home() {
  const navigate = useNavigate();

  const [students, setStudents] = useState(0);
  const [books, setBooks] = useState(0);
  const [borrow, setBorrow] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/students?page=1&limit=1`)
      .then(res => res.json())
      .then(data => setStudents(data.total));

    fetch(`${BASE_URL}/books?page=1&limit=1`)
      .then(res => res.json())
      .then(data => setBooks(data.total));

    fetch(`${BASE_URL}/borrow?page=1&limit=1`)
      .then(res => res.json())
      .then(data => setBorrow(data.total));
  }, []);

  return (
    <Box textAlign="center" p={4}>
      <h1>Library Management</h1>

      <Button variant="contained" onClick={() => navigate("/students")} sx={{ m: 1 }}>
        Students
      </Button>
      <Button variant="contained" onClick={() => navigate("/books")} sx={{ m: 1 }}>
        Books
      </Button>
      <Button variant="contained" onClick={() => navigate("/borrow")} sx={{ m: 1 }}>
        Borrow
      </Button>

      <hr />

      <h3>Dashboard Details</h3>
      <p>Total Students: {students}</p>
      <p>Total Books: {books}</p>
      <p>Total Borrow Records: {borrow}</p>
    </Box>
  );
}

export default Home;