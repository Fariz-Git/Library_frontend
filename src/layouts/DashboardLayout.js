import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  colors,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 220;

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", path: "/" },
    { text: "Students", path: "/students" },
    { text: "Books", path: "/books" },
    { text: "Borrow", path: "/borrow" },
    { text: "Admin ⚙️ ", path: "/admin-settings" },
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
            backgroundColor : "black",
            color : "white"

          },
        
        }}
      >
        <Toolbar>
          <Typography variant="h6">
            📚 Library
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}

          <Divider sx={{my: 1 }}  />

          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;