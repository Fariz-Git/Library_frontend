import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    totalQuantity: "",
  });

  const BASE_URL = "http://localhost:3001";

  // Load books
  const loadBooks = async () => {
    const res = await fetch(`${BASE_URL}/books`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Add book
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        totalQuantity: Number(form.totalQuantity),
      }),
    });

    setForm({ title: "", author: "", totalQuantity: "" });
    loadBooks();
  };

  // Delete book
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/books/${id}`, {
      method: "DELETE",
    });

    loadBooks();
  };

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h2>Books</h2>

      {/* Add Book Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          required
          style={{ marginLeft: "10px" }}
        />

        <input
          type="number"
          placeholder="Total Quantity"
          value={form.totalQuantity}
          onChange={(e) =>
            setForm({ ...form, totalQuantity: e.target.value })
          }
          required
          style={{ marginLeft: "10px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Add Book
        </button>
      </form>

      {/* Books Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Total</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.totalQuantity}</td>
                <td>{book.availableQuantity}</td>
                <td>
                  <button
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Books Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Books;