import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PawsContextProvider } from "./components/PawsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <PawsContextProvider>
      <App />
    </PawsContextProvider>
  </BrowserRouter>
  // document.getElementById("root")
);
