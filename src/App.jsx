import Routing from "./routes/Routing.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./contexts/Authcontext.jsx";

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
