import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { PawsContextProvider } from "./PawsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <PawsContextProvider>
      <App />
    </PawsContextProvider>
  </Router>,
  document.getElementById("root")
);
