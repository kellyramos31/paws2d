import React, { useContext} from "react"
import { PawsContext} from "./PawsContext"
import "./Faves.css"
import PhotoForm from "./PhotoForm"
import FavesOnlyMap from "./FavesOnlyMap"



function Faves() {
   
    const {myFaves, handleFaveDelete, isChangingPhoto, handlePhotoFormToggle, isFaveMapView, handleFaveMapToggle, saveThisFavesList} = useContext(PawsContext) 



    
    return (
      <div className="faves-page">
        {isFaveMapView ? (
          <div>
            <div className="list-button-here">
              <button className="list-button" onClick={handleFaveMapToggle}>
                Faves List View{" "}
              </button>
            </div>

            <div className="faves-map">
              <FavesOnlyMap />
            </div>
          </div>
        ) : (
          <div>
            <div className="map-button-here">
              <button className="map-button" onClick={handleFaveMapToggle}>
                Faves Map View
              </button>
            </div>

            <div className="details-list">
              <button id="save-list-btn" onClick={saveThisFavesList}>
                SAVE THIS LIST FOR LATER
              </button>

              <div className="list-items">
                {myFaves.map((fave, index) => (
                  <div key={index} id={fave.id} index={index}>
                    <ul className="restaurant-list">
                      <li id={fave.id}>
                        <div>
                          <strong className="restaurant">{fave.name}</strong>
                          <br />
                          {fave.address}, {fave.city}
                          <br />
                          Phone: {fave.phone}
                        </div>

                        {fave.myDoggieImage !== "" ? (
                          <div>
                            <img
                              className="doggie-image"
                              key={index}
                              id={fave.id}
                              width="400px"
                              height="300px"
                              style={{ borderRadius: "10px" }}
                              src={fave.myDoggieImage}
                              alt=""
                            />
                          </div>
                        ) : null}

                        <div>
                          <button
                            key={fave.id}
                            id={fave.id}
                            onClick={(id) => handleFaveDelete(fave.id)}
                            className="delete-button"
                          >
                            Delete Fave
                          </button>
                        </div>

                        {isChangingPhoto[fave.id] ? (
                          <div>
                            <button
                              key={index}
                              id={fave.id}
                              onClick={(id) => handlePhotoFormToggle(fave.id)}
                            >
                              Cancel Photo
                            </button>
                            <PhotoForm key={index} fave={fave} />
                          </div>
                        ) : (
                          <div>
                            <button
                              key={index}
                              id={fave.id}
                              index={index}
                              onClick={(id) => handlePhotoFormToggle(fave.id)}
                            >
                              Click to Add Doggie & Me Photo{" "}
                            </button>
                          </div>
                        )}
                        {fave.isHearted}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );}


export default Faves
