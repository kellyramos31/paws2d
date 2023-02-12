import React, { Component } from "react";
import axios from "axios";
import zero from "./assets/small_0.png";
import one from "./assets/small_1.png";
import oneHalf from "./assets/small_1_half.png";
import two from "./assets/small_2.png";
import twoHalf from "./assets/small_2_half.png";
import three from "./assets/small_3.png";
import threeHalf from "./assets/small_3_half.png";
import four from "./assets/small_4.png";
import fourHalf from "./assets/small_4_half.png";
import five from "./assets/small_5.png";

const PawsContext = React.createContext();

class PawsContextProvider extends Component {
  state = {
    dogFriendlyRestaurants: [],
    searchText: "",
    filteredSearchList: [],
    oneDollarSign: [],
    twoDollarSigns: [],
    threeDollarSigns: [],
    myDoggieImage: "",
    isHearted: false,
    isChangingPhoto: false,
    myFaves: JSON.parse(localStorage.getItem("myFaves")) || [],
    isFaveMapView: false,
  };

  //Two chained API calls b/c limited to 50 datapoints at a time:

  async componentDidMount() {
    const dogFriendlyRestaurants = {
      method: "GET",
      url: `http://localhost:8000/eateries`,
    };

    const moreDogFriendly = {
      method: "GET",
      url: `http://localhost:8000/moreeats`,
    };

   await axios
      .request(dogFriendlyRestaurants)

      .then((response) => {
        console.log("first response", response.data);
        this.setState({ dogFriendlyRestaurants: response.data });
        // this.addToggleProperty();
      });

   await axios
      .request(moreDogFriendly)
      .then((response) => {
        console.log("second response", response.data);
        this.setState({
          dogFriendlyRestaurants: [
            ...this.state.dogFriendlyRestaurants,
            ...response.data,
          ],
        });

        this.addToggleProperty();
      })

      .catch((error) => {
        console.log("error", error);
      });
  };

  addToggleProperty = () => {
    console.log("addToggleProperty called");
    let addedProperty = this.state.dogFriendlyRestaurants.map((restaurant) => {
      restaurant.isHearted = false;
      restaurant.myDoggieImage = "";
      return restaurant;
    });
    console.log("data with isHearted added:", addedProperty);
    this.setState({
      dogFriendlyRestaurants: addedProperty,
      filteredSearchList: addedProperty,
    });
  };

  //Switch statement to display Yelp Stars ratings
  //(NOTE:  leave breaks in even though "unreachable code" warning)

  yelpStars = (yelpRating) => {
    switch (yelpRating) {
      case 0:
        return <img src={zero} alt="zero stars" />;
        // eslint-disable-next-line
        break;
      case 1.0:
        return <img src={one} alt="one star" />;
        // eslint-disable-next-line
        break;
      case 1.5:
        return <img src={oneHalf} alt="one and half stars" />;
        // eslint-disable-next-line
        break;
      case 2.0:
        return <img src={two} alt="two stars" />;
        // eslint-disable-next-line
        break;
      case 2.5:
        return <img src={twoHalf} alt="two and half stars" />;
        // eslint-disable-next-line
        break;
      case 3.0:
        return <img src={three} alt="three stars" />;
        // eslint-disable-next-line
        break;
      case 3.5:
        return <img src={threeHalf} alt="three and half stars" />;
        // eslint-disable-next-line
        break;
      case 4.0:
        return <img src={four} alt="four stars" />;
        // eslint-disable-next-line
        break;
      case 4.5:
        return <img src={fourHalf} alt="four and half stars" />;
        // eslint-disable-next-line
        break;
      case 5.0:
        return <img src={five} alt="five stars" />;
        // eslint-disable-next-line
        break;
      default:
        return <h2>no rating available</h2>;
    }
  };

  handleFaveToggle = (id) => {
    console.log(id);
    const updatedDogFriendly = this.state.dogFriendlyRestaurants.map(
      (business) => {
        if (business.id === id) {
          const updatedListing = {
            ...business,
            isHearted: !business.isHearted,
          };

          return updatedListing;
        }

        return business;
      }
    );

    const takeOut = updatedDogFriendly.filter(
      (business) => business.isHearted === false
    );

    this.setState({
      dogFriendlyRestaurants: takeOut,
      filteredSearchList: takeOut,
      // isHearted: !this.state.isHearted,
    });
    // localStorage.clear()
    // localStorage.setItem("myFaves", JSON.stringify(this.state.myFaves));
  };

  handleFave = (id, restaurant, address, city, phone, lat, lng, isHearted) => {
    console.log("current isHearted state:", isHearted);
    this.handleFaveToggle(id);
    console.log("id:", id);

    const newFave = {
      id: id,
      name: restaurant,
      address: address,
      city: city,
      phone: phone,
      lat: lat,
      lng: lng,
      isHearted: !isHearted,
      myDoggieImage: "",
    };

    console.log("newFave is:", newFave);
    console.log("newFave.isHearted:", newFave.isHearted);
    console.log("current isHearted state", this.state.isHearted);

    if (newFave.isHearted === true) {
      this.handleFaveToggle(id);

      this.setState((prevState) => ({
        myFaves: [...prevState.myFaves, newFave],
      }));
      // localStorage.clear()
      // localStorage.setItem("myFaves", JSON.stringify(this.state.myFaves));
    } else if (newFave.isHearted === false) {
      this.handleFaveDelete(id);
      // localStorage.remove("newFave");
    }
  };

  handleFaveDelete = (id) => {
    console.log("delete this id", id);

    this.setState((prevState) => ({
      myFaves: prevState.myFaves.filter((fave) => fave.id !== id),
    }));

    this.handleFaveToggle(id);

    // localStorage.clear()
    // localStorage.remove("id");
  };

  searchBarOnChange = (searchTerm) => {
    console.log("searchText", searchTerm);
    this.setState({
      searchText: searchTerm,
    });
    this.getSearchFilteredList(searchTerm);

    console.log("this.state.searchText", this.state.searchText);
  };

  getSearchFilteredList = (searchText) => {
    if (searchText !== "") {
      const searchResults = this.state.dogFriendlyRestaurants.filter(
        (restaurant) =>
          restaurant.name
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
      this.setState({
        filteredSearchList: searchResults,
      });
    } else {
      this.setState({
        searchText: "",
        filteredSearchList: this.state.dogFriendlyRestaurants,
      });
    }
  };

  handlePriceClickOne = () => {
    const oneDollar = this.state.dogFriendlyRestaurants.filter(
      (business) => business.price === "$"
    );
    this.setState({
      filteredSearchList: oneDollar,
    });
  };

  handlePriceClickTwo = (e) => {
    const twoDollar = this.state.dogFriendlyRestaurants.filter(
      (business) => business.price === "$$"
    );
    this.setState({
      filteredSearchList: twoDollar,
    });
  };

  handlePriceClickThree = (e) => {
    const threeDollar = this.state.dogFriendlyRestaurants.filter(
      (business) => business.price === "$$$"
    );
    this.setState({
      filteredSearchList: threeDollar,
    });
  };

  handleClickAll = (e) => {
    this.setState({
      filteredSearchList: this.state.dogFriendlyRestaurants,
    });
  };

  handlePhotoFormToggle = (id) => {
    console.log("toggled for Photo id", id);

    this.setState({
      isChangingPhoto: {
        ...this.state.isChangingPhoto,
        [id]: !this.state.isChangingPhoto[id],
      },
    });
    console.log(
      "isChangingPhoto state (after second click)",
      this.state.isChangingPhoto
    );
  };

  handlePhotoFormChange = (id, myDoggieImage) => {
    console.log(id);
    this.setState({
      myDoggieImage: myDoggieImage,
    });
    console.log("myDoggieImage URL from input", this.state.myDoggieImage);
  };

  handleMyDogPhotoSubmit = (
    e,
    id,
    name,
    address,
    city,
    phone,
    isHearted,
    myDoggieImage
  ) => {
    e.preventDefault();
    console.log("HEY");
    console.log("change/add photo for this id", id);

    const updatedPhotoListing = {
      id: id,
      name: name,
      address: address,
      city: city,
      phone: phone,
      isHearted: isHearted,
      myDoggieImage: myDoggieImage,
    };
    console.log("updated Photo Listing object", updatedPhotoListing);

    const editedFavesWithPhoto = this.state.myFaves.map((fave) =>
      fave.id === id ? updatedPhotoListing : fave
    );
    console.log("updatedPhotoListing id:", updatedPhotoListing.id);
    console.log("editFavesWithPhoto result of map:", editedFavesWithPhoto);

    this.setState({
      myFaves: [...editedFavesWithPhoto],
      myDoggieImage: "",
    });

    // localStorage.clear()
    // localStorage.setItem("myFaves", JSON.stringify(this.state.myFaves));

    this.handlePhotoFormToggle(id);
  };

  handleFaveMapToggle = (e) => {
    this.setState((prevState) => ({ isFaveMapView: !prevState.isFaveMapView }));
  };

  saveThisFavesList = (e) => {
    localStorage.setItem("myFaves", JSON.stringify(this.state.myFaves));
  };

  render() {
    return (
      <PawsContext.Provider
        value={{
          dogFriendlyRestaurants: this.state.dogFriendlyRestaurants,
          yelpStars: this.yelpStars,
          handleFave: this.handleFave,
          myFaves: this.state.myFaves,
          searchBarOnChange: this.searchBarOnChange,
          filteredSearchList: this.state.filteredSearchList,
          handleFaveDelete: this.handleFaveDelete,
          myDoggieImage: this.state.myDoggieImage,
          isChangingPhoto: this.state.isChangingPhoto,
          handlePhotoFormToggle: this.handlePhotoFormToggle,
          handlePhotoFormChange: this.handlePhotoFormChange,
          handleMyDogPhotoSubmit: this.handleMyDogPhotoSubmit,
          handlePriceClickOne: this.handlePriceClickOne,
          handlePriceClickTwo: this.handlePriceClickTwo,
          handlePriceClickThree: this.handlePriceClickThree,
          handleClickAll: this.handleClickAll,
          isFaveMapView: this.state.isFaveMapView,
          handleFaveMapToggle: this.handleFaveMapToggle,
          handleMoreRestaurants: this.handleMoreRestaurants,
          saveThisFavesList: this.saveThisFavesList,
        }}
      >
        {this.props.children}
      </PawsContext.Provider>
    );
  }
}
export { PawsContextProvider, PawsContext };
