import { useState } from "react";
import { Box, Button, TextField, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";


const BASE_URL = "http://localhost:3001";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper sx={{ p: 4, width: 300 }}>
                <center>
            <h2>Admin Login</h2>
            </center>

        <TextField
          fullWidth
          margin="dense"
          label="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <TextField
          fullWidth
          margin="dense"
          type="password"
          label="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
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