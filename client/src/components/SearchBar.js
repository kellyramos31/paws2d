import React, { useContext} from "react"
import { PawsContext} from "./PawsContext"
import PriceRatingButtons from "./PriceRatingButtons"
import "./SearchBar.css"



function SearchBar () {

const {searchBarOnChange} = useContext(PawsContext) 

    return (
        <div className="searchbar-buttons">
            <div >
              <input
                className="searchbar" 
                type="text" 
                placeholder="Search By Name..."
                onChange={(e)=>searchBarOnChange(e.target.value)}
                />
            </div>
            <div className="price-buttons">            
                <PriceRatingButtons />
            </div>

        </div>
    )}

export default SearchBar

