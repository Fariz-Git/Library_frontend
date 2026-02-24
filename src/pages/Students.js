import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  const BASE_URL = "http://localhost:3001";

  // Load students from backend
  const loadStudents = async () => {
    const res = await fetch(`${BASE_URL}/students`);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Add student
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", department: "" });
    loadStudents();
  };

  // Delete student
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/students/${id}`, {
      method: "DELETE",
    });

    loadStudents();
  };

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h2>Students</h2>

      {/* Add Student Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
          style={{ marginLeft: "10px" }}
        />

        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          required
          style={{ marginLeft: "10px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Add Student
        </button>
      </form>

      {/* Students List */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDelete(student.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Students Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;