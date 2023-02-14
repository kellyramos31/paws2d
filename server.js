
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


// app.use("/", (req, res)=> {
//   res.json("hi")
// })


app.get("https://magnificent-helmet-lion.cyclic.app/eateries", async(req, res) => {
  await axios
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
      console.log(res.json(response.data.businesses));

    })

    .catch((err) => console.log(err));
});

app.get(
  "https://magnificent-helmet-lion.cyclic.app/moreeats", async(req, res) => {
    await axios
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
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));


//not NOT NOT NOT NOT
// "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"