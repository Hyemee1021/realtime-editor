import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./provider/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </StrictMode>
);
