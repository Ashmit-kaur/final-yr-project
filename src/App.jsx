import Routing from "./routes/Routing.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./contexts/Authcontext.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (

      <BrowserRouter>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </BrowserRouter>
    // </ToastContainer>
  );
}

export default App;
