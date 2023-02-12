import React from "react";
import "./Header.css";
import logo from "./assets/paws2-logo-green.jpg";
import glassesDog from "./assets/sunglasses-dog-cropped.jpg";
import fluffyPuppy from "./assets/fluffy-puppy.jpg";
import dogWaterBottle from "./assets/dog-water-bottle.jpg";
import roundGlassesDog from "./assets/round-glasses-dog.jpg";

function Header() {
  return (
    <div className="logo-plus-dog-images">
      <div className="app-title">
        <img
          src={logo}
          className="paws2-logo"
          height="160px"
          width="160px"
          alt="logo"
        />
      </div>

      <div className="dog-header-images">
        <img
          className="header-dog1"
          src={glassesDog}
          alt="glasses dog"
        />
        <img className="header-dog2" src={fluffyPuppy} alt="fluffy puppy" />
        <img
          className="header-dog3"
          src={dogWaterBottle}
          alt="dog water bottle table"
        />
        <img
          className="header-dog4"
          src={roundGlassesDog}
          alt="round glasses dog"
        />
      </div>
    </div>
  );
}

export default Header;
