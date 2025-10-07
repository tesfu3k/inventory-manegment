import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContext.jsx";
import EmployeeContextProvider from "./context/EmployeeContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <EmployeeContextProvider>
          <Toaster position="bottom-center" />
          <App />
        </EmployeeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
