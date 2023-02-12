import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import SLCMap from "./components/SLCMap";
import Faves from "./components/Faves";
// import SearchBar from "./SearchBar";
import LocationCard from "./components/LocationCard";
import "./App.css";

function App() {
  return (
    <div>
      <div>
        <Header />

        <nav>
          <div>
            <Link to="/">MAP</Link>
          </div>
          <div>
            <Link to="/details">DETAILS</Link>
          </div>
          <div>
            <Link to="/faves">FAVES</Link>
          </div>
        </nav>
      </div>

      <Routes>
        <Route exact path="/" element={<SLCMap />} navigateTo="/"/>
        <Route path="/details" element={<LocationCard/>} navigateTo="/"/>
        <Route path="/faves" element={<Faves/>} navigateTo="/"/>
      </Routes>
    </div>
  );
}

export default App;


