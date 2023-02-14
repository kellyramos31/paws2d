
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());

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
        },
      }
    )
    .then((response) => {
      res.json(response.data.businesses);
    })

    .catch((err) => console.log(err));
});

app.get("/moreeats", (req, res) => {
  axios
    .get(
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
      res.json(response.data.businesses);
    })
    .catch((err) => console.log(err));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));


//not