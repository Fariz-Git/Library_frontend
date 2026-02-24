import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Books from "./pages/Books";
import Borrow from "./pages/Borrow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/books" element={<Books />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
    </Router>
  );
}

export default App;