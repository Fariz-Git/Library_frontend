import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [studentsCount, setStudentsCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [borrowCount, setBorrowCount] = useState(0);

  useEffect(() => {
    api.getStudents().then((data) =>
      setStudentsCount(data.length)
    );

    api.getBooks().then((data) =>
      setBooksCount(data.length)
    );

    api.getBorrows().then((data) =>
      setBorrowCount(data.length)
    );
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Library Management</h1>

      <div style={{ margin: "20px" }}>
        <button onClick={() => navigate("/students")}>
          Students
        </button>
        <button onClick={() => navigate("/books")} style={{ marginLeft: "10px" }}>
          Books
        </button>
        <button onClick={() => navigate("/borrow")} style={{ marginLeft: "10px" }}>
          Borrow
        </button>
      </div>

      <hr />

      <h3>Dashboard Details</h3>
      <p>Total Students: {studentsCount}</p>
      <p>Total Books: {booksCount}</p>
      <p>Total Borrow Records: {borrowCount}</p>
    </div>
  );
}

export default Home;