import "./LocationInfoBox.css"
import print from "../assets/print-306214_640.png"



const LocationInfoBox = ({info}) => {

    return (
        <div className="location-info" key={info.id} id={info.id}>
            <img src={print} alt="paw" />
            <div className="rest-name">{info.name}</div>
            <div className="street">{info.address}/</div>
            <div className="city">{info.city}</div>
            <div className="phone">{info.phone}</div>
            <div className="isHearted">{info.isHearted ? "❤️" : null}</div>
            
            
        </div>

    )

}

export default LocationInfoBox