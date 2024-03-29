import React, { useContext } from "react";
import { useState } from "react";
import "./SLCMap.css";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";
import "./FavesOnlyMap.css";
import { PawsContext } from "./PawsContext";

export default function FavesOnlyMap() {
  const [locationInfo, setLocationInfo] = useState(null);

  const defaultProps = {
    center: {
      lat: 40.76078,
      lng: -111.891045,
    },
    zoom: 11,
  };

const { myFaves} = useContext(PawsContext);

  // const { myFaves } = useContext(PawsContext);

  // let getFaveMarkers = filteredSearchList.filter(
  //   (restaurant) => restaurant.isHearted
  // );

  // console.log("getFaveMarkers that are hearted", getFaveMarkers)

  // if(myFaves){
  //   getFaveMarkers = [...myFaves]
  // }

  // const getFaveMarkers = [...myFaves];

  // console.log("myFaves to use for markers", myFaves);

  const mapMarkers = myFaves.map((restaurant) => (
    <LocationMarker
      key={restaurant.id}
      id={restaurant.id}
      name={restaurant.name}
      address={restaurant.address}
      lat={restaurant.coordinates.latitude}
      lng={restaurant.coordinates.longitude}
      onClick={() =>
        setLocationInfo({
          name: restaurant.name,
          address: restaurant.address,
          city: restaurant.city,
          phone: restaurant.phone,
          isHearted: restaurant.isHearted,
        })
      }
    />
  ));

  return (
    <div>
      <div className="faves-map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {mapMarkers}
        </GoogleMapReact>
        <div className="location-info-box-faves">
          {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
      </div>
    </div>
  );
}
