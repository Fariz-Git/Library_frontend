import React from "react"; 
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

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
    <Provider store={store}>
    <App />
    </Provider>
  </ThemeProvider>
);