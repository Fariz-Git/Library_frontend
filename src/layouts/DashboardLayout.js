import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", path: "/" },
    { text: "Students", path: "/students" },
    { text: "Books", path: "/books" },
    { text: "Borrow", path: "/borrow" },
    { text: "Admin Settings", path: "/admin-settings" },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #4f46e5, #6366f1)",
            color: "white",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6">📚 Library</Typography>
        </Toolbar>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* MAIN CONTENT FIXED */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;