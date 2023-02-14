import React, { useContext} from "react"
import { PawsContext} from "./PawsContext"
import "./PhotoForm.css"


function PhotoForm(props) {

const {handleMyDogPhotoSubmit, handlePhotoFormChange, myDoggieImage} = useContext(PawsContext) 
console.log("props:", props)
return(
    <div key={props.fave.id} id={props.fave.id} >
        <form name="photoForm" onSubmit={(e)=>handleMyDogPhotoSubmit(e, props.fave.id, props.fave.name, props.fave.address, props.fave.city, props.fave.phone, props.fave.isHearted, myDoggieImage)}>
            <p>Add URL for image of you & your dog enjoying this restaurant:</p>
                    <input
                        className= "photo-input"
                        type="text"
                        value={myDoggieImage || props.fave.myDoggieImage}
                        onChange={(e, id)=>handlePhotoFormChange(id, e.target.value)}
                    />
            <button  className="photo-button" key={props.fave.id} id={props.fave.id} type="submit">Save Doggie & Me Photo</button>
                        
        </form>
    
        
    </div>
)
}

export default PhotoForm

