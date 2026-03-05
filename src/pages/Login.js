import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {

      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {

        // Store login session
        localStorage.setItem("isLoggedIn", "true");

        // Store admin id
        localStorage.setItem("adminId", data.adminId);

        // Store role (superadmin / admin)
        localStorage.setItem("role", data.role);

        alert("Login Successful");

        navigate("/");

      } else {
        alert(data.message || "Invalid Credentials");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#f4f6f8" }}
    >

      <Paper
        sx={{
          p: 4,
          width: 320,
          borderRadius: 3,
          boxShadow: 4
        }}
      >

        <Typography
          variant="h5"
          textAlign="center"
          mb={3}
        >
          🔒 Admin Login
        </Typography>

        <TextField
          fullWidth
          margin="dense"
          label="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value
            })
          }
        />

        <TextField
          fullWidth
          margin="dense"
          type="password"
          label="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

      </Paper>

    </Box>
  );
}

export default Login;