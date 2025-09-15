// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Panel from "./pages/Panel";
import RequireAuth from "./pages/RequireAuth"; // o "./pages/RequireAuth"
import AgendaApp from "./agenda/AgendaApp";
import OAuth2Redirect from "./pages/OAuth2Redirect";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
        <Route path="/agenda/*" element={<RequireAuth><AgendaApp /></RequireAuth>} />
        <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
}
export default App;


