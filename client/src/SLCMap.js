// From latlong.net:
// Salt Lake City=  lat:  40.760780  lng: -111.891045
// NOTE:  website Snazzy Maps has alternatives styles for the Google Maps, if don't want the default

import React, { useContext} from "react"
import {useState} from "react"
import "./SLCMap.css"
import GoogleMapReact from 'google-map-react';
import LocationMarker from "./LocationMarker"
import LocationInfoBox from "./LocationInfoBox"
import { PawsContext} from "./PawsContext"


export default function SLCMap(){
  const [locationInfo, setLocationInfo] = useState(null)

  const defaultProps = {
            center: {
            lat: 40.760780 ,
            lng: -111.891045
        },
          zoom: 11
        }

const {filteredSearchList} = useContext(PawsContext)

const mapMarkers = filteredSearchList.map((restaurant => 
    <LocationMarker
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            address={restaurant.location.address1}
            lat= {restaurant.coordinates.latitude}
            lng={restaurant.coordinates.longitude}
            onClick={()=> setLocationInfo({name: restaurant.name, address: restaurant.location.address1, city: restaurant.location.city, phone: restaurant.display_phone, isHearted: restaurant.isHearted })}
/>
))

return (
  <div>
     
  <div className="map">
      <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}}
          defaultCenter={ defaultProps.center}
          defaultZoom={ defaultProps.zoom }
        >
          {mapMarkers}
        </GoogleMapReact>
    {locationInfo && <LocationInfoBox info={locationInfo}/>}
  </div>
</div>
)
}
