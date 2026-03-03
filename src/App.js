import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Books from "./pages/Books";
import Borrow from "./pages/Borrow";
import Login from "./pages/login";
import AdminSettings from "./pages/AdminSettings";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
        path="/" element={<PrivateRoute> <Home /> </PrivateRoute> }/>

        <Route
         path="/students" element={<PrivateRoute> <Students /> </PrivateRoute> } />

        <Route
          path="/books" element={<PrivateRoute> <Books /> </PrivateRoute> } />

        <Route
        path="/borrow" element={ <PrivateRoute> <Borrow /> </PrivateRoute>} />
      
        <Route path="/admin-settings" element={<AdminSettings />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;