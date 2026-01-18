import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewCase from "./pages/NewCase";
import AnalysisResults from "./pages/AnalysisResults";
import Dashboard from "./pages/Dashboard"; // ✅ ADDED ONLY THIS

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home WITH Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Login WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />

        {/* Signup WITHOUT Navbar */}
        <Route path="/signup" element={<Signup />} />

        {/* New Case */}
        <Route path="/new-case" element={<NewCase />} />

        {/* ✅ Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ Analysis Results */}
        <Route path="/case/:id" element={<AnalysisResults />} />

      </Routes>
    </BrowserRouter>
  );
}
