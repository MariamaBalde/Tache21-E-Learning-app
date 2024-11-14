// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Composants/ApprenantsComposants/Dashboard";
// src/App.js


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;








