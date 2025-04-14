import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { VideoProvider } from "./contexts/videoContext.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import { ModalProvider } from "./contexts/ModalContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <ModalProvider>
            <App />
          </ModalProvider>      
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
