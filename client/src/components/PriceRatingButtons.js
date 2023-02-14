import React, { useContext} from "react"
import { PawsContext} from "./PawsContext"
import "./PriceRatingButtons.css"


function PriceRatingButtons() {
    const {handlePriceClickOne, handlePriceClickTwo, handlePriceClickThree, handleClickAll} = useContext(PawsContext) 


    return(
        <div>  
                <div className="price-rating-buttons">
                <button className="pricing" onClick={handlePriceClickOne}>$</button>
                <button className="pricing" onClick={handlePriceClickTwo}>$$</button>
                <button className="pricing" onClick={handlePriceClickThree}>$$$</button>
                <button className="pricing" onClick={handleClickAll}>All</button>
    
            </div>
        </div>

    )
}

export default PriceRatingButtons