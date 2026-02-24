import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Borrow() {
  const navigate = useNavigate();

  const [borrows, setBorrows] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    bookId: "",
  });

  const BASE_URL = "http://localhost:3001";

  // Load borrow records
  const loadBorrows = async () => {
    const res = await fetch(`${BASE_URL}/borrow`);
    const data = await res.json();
    setBorrows(data);
  };

  useEffect(() => {
    loadBorrows();
  }, []);

  // Issue book
  const handleIssue = async (e) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/borrow/issue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: Number(form.studentId),
        bookId: Number(form.bookId),
      }),
    });

    setForm({ studentId: "", bookId: "" });
    loadBorrows();
  };

  // Return book
  const handleReturn = async (id) => {
    await fetch(`${BASE_URL}/borrow/return/${id}`, {
      method: "POST",
    });

    loadBorrows();
  };

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h2>Borrow Management</h2>

      {/* Issue Form */}
      <form onSubmit={handleIssue} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Student ID"
          value={form.studentId}
          onChange={(e) =>
            setForm({ ...form, studentId: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Book ID"
          value={form.bookId}
          onChange={(e) =>
            setForm({ ...form, bookId: e.target.value })
          }
          required
          style={{ marginLeft: "10px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Issue Book
        </button>
      </form>

      {/* Borrow Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            
            <th>ID</th>
            <th>Student ID</th>
            <th>Student</th>
            <th>Book ID</th>
            <th>Book</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.length > 0 ? (
            borrows.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.student?.id}</td>
                <td>{b.student?.name}</td>
                <td>{b.book?.id}</td>
                <td>{b.book?.title}</td>
                <td>
                  {b.returned ? "Returned" : "Not Returned"}
                </td>
                <td>
                  {!b.returned && (
                    <button
                      onClick={() => handleReturn(b.id)}
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Borrow Records Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Borrow;