// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Panel from "./pages/Panel";
import RequireAuth from "./pages/RequireAuth"; // o "./pages/RequireAuth"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/panel"
          element={
            <RequireAuth>
              <Panel />
            </RequireAuth>
          }
        />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
}
export default App;


