import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46e5", // Indigo
    },
    secondary: {
      main: "#ec4899", // Pink
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);