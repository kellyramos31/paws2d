const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios")
require("dotenv").config()
const path = require("path");

const app = express();

app.use(cors());

// app.get("/", (req, res)=>{
//     res.json("hi")
// })




app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/eateries", (req, res) => {
  axios
   .get(
      `https://api.yelp.com/v3/businesses/search?location=Salt Lake City&categories=restaurants&term="dog friendly"`,

      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        params: {
          limit: 50,
          // offset: 11
        },
      }
    )
   .then((response) => {
      res.json(response.data.businesses);
    })

    .catch((err) => console.log(err));
});


app.get("/moreeats", (req,res) =>{
  axios.get(
          `https://api.yelp.com/v3/businesses/search?location=Salt Lake City&categories=restaurants&term="dog friendly"`,
        
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            params: {
              limit: 50,
              offset: 51,
            },
          }
        )
      .then((response) => {
        res.json(response.data.businesses)

      })
      .catch((err) => console.log(err));
    })

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(8000, () => console.log(`Server running on ${PORT} `));




  
    // "start": "node server.js && react-scripts start",
    //   "start:frontend": "react-scripts start",
    // "start:backend": "node server.js",