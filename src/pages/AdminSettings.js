import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function AdminSettings() {
  const navigate = useNavigate();
  const adminId = localStorage.getItem("adminId");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleUpdate = async () => {
    await fetch(`${BASE_URL}/admin/update/${adminId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Admin Updated Successfully");
    navigate("/");
  };

  return (
    <Box p={3}>
      <h2 style={{ textAlign: "center" }}>
        ADMIN SETTINGS
      </h2>

      <Stack spacing={2} mt={3} width={300} mx="auto">
        <TextField
          label="New Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
        />

        <TextField
          label="New Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <Button
          variant="contained"
          onClick={handleUpdate}
        >
          Update
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
}

export default AdminSettings;