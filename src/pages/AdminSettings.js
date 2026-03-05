import { useEffect, useState , useCallback} from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function AdminSettings() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const adminId = localStorage.getItem("adminId");

  const [rows, setRows] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    password: "",
  });

  // Fetch all admins (super admin only)
  const fetchAdmins = useCallback(async () => {
    if (role !== "superadmin") return;

    const res = await fetch(
      `${BASE_URL}/admin?adminId=${adminId}`
    );
    const data = await res.json();
    setRows(data);
},[role ,adminId]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // Create Admin
  const handleCreate = async () => {
    await fetch(`${BASE_URL}/admin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        currentAdminId: adminId,
      }),
    });

    alert("Admin created successfully");

    setOpenCreate(false);
    setForm({ username: "", password: "" });

    fetchAdmins();
  };

  // Delete Admin
  const handleDelete = async (id) => {
    await fetch(
      `${BASE_URL}/admin/${id}?adminId=${adminId}`,
      {
        method: "DELETE",
      }
    );

    alert("Admin deleted");

    fetchAdmins();
  };

  // Change Password
  const handleChangePassword = async () => {
    const targetId =
      role === "superadmin"
        ? selectedAdmin.id
        : adminId;

    await fetch(
      `${BASE_URL}/admin/password/${targetId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      }
    );

    alert("Password updated");

    setOpenPassword(false);
    setPasswordForm({ password: "" });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "role", headerName: "Role", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <EditIcon
            sx={{ cursor: "pointer", mr: 2 }}
            onClick={() => {
              setSelectedAdmin(params.row);
              setOpenPassword(true);
            }}
          />

          {params.row.role !== "superadmin" && (
            <DeleteIcon
              sx={{ cursor: "pointer" }}
              onClick={() =>
                handleDelete(params.row.id)
              }
            />
          )}
        </>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box textAlign="center">
        <h2>ADMIN SETTINGS</h2>
      </Box>

      {/* SUPER ADMIN VIEW */}
      {role === "superadmin" && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
          >
            <Button
              variant="contained"
              onClick={() => setOpenCreate(true)}
            >
              + Create Admin
            </Button>
          </Box>

          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        </>
      )}

      {/* NORMAL ADMIN VIEW */}
      {role !== "superadmin" && (
        <Stack
          spacing={2}
          mt={3}
          width={300}
          mx="auto"
        >
          <TextField
            label="New Password"
            type="password"
            value={passwordForm.password}
            onChange={(e) =>
              setPasswordForm({
                password: e.target.value,
              })
            }
          />

          <Button
            variant="contained"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Stack>
      )}

      {/* CREATE ADMIN DIALOG */}
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      >
        <DialogTitle>Create Admin</DialogTitle>

        <DialogContent>
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
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenCreate(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* PASSWORD CHANGE DIALOG */}
      <Dialog
        open={openPassword}
        onClose={() => setOpenPassword(false)}
      >
        <DialogTitle>Change Password</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            type="password"
            label="New Password"
            value={passwordForm.password}
            onChange={(e) =>
              setPasswordForm({
                password: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenPassword(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleChangePassword}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Stack mt={3} alignItems="center">
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
}

export default AdminSettings;