import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginAdmin } from "../redux/slices/adminSlice";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {

    try {

      const resultAction = await dispatch(loginAdmin(form));

      const data = resultAction.payload;

      // If backend returns error
      if (!data || !data.adminId) {
        alert("Invalid username or password");
        return;
      }

      // Save session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminId", data.adminId);
      localStorage.setItem("role", data.role);

      alert("Login Successful");

      navigate("/");

    } catch (error) {
      console.error(error);
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
          boxShadow: 4,
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
              username: e.target.value,
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
              password: e.target.value,
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