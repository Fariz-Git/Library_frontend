import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Books from "./pages/Books";
import Borrow from "./pages/Borrow";
import AdminSettings from "./pages/AdminSettings";
import DashboardLayout from "./layouts/DashboardLayout";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
            <PrivateRoute> <DashboardLayout> <Home /> </DashboardLayout> </PrivateRoute>}/>
            
        <Route path="/students" element={ 
          <PrivateRoute> <DashboardLayout> <Students /> </DashboardLayout> </PrivateRoute>}/>

        <Route path="/books" element={
          <PrivateRoute> <DashboardLayout> <Books /> </DashboardLayout> </PrivateRoute> } />

        <Route path="/borrow" element={
          <PrivateRoute> <DashboardLayout> <Borrow /> </DashboardLayout> </PrivateRoute> } />

        <Route path="/admin-settings" element={ <PrivateRoute>
            <DashboardLayout> <AdminSettings /> </DashboardLayout> </PrivateRoute> }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;