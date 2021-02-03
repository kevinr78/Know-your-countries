const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const axios = require("axios");
app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/countries/:countryName", (req, res) => {
  let countryName = req.params.countryName;
  axios
    .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(({ data }) => {
      const {
        name,
        capital,
        population,
        borders,
        region,
        subregion,
        timezones,
        currencies: [{ code, name: CurrencyName, symbol }],
        languages,
        flag,
      } = data[0];

      res.render("country", {
        CountryName: name,
        capital: capital,
        population: population,
        region: region,
        subregion: subregion,
        flag: flag,
        timezones: timezones,
        borders: borders,
        code: code,
        CurrencyName: CurrencyName,
        symbol: symbol,
        languages: languages,
      });
    })
    .catch((err) => {
      if (err.response.status) {
        res.sendFile("../public/404error.html");
      }
    });
});
app.listen("3000", () => {
  console.log("Server has Started");
});
