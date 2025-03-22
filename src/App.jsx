import Routing from "./routes/Routing.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";

function App() {
  return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
  );
}

export default App;
