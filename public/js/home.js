/*Declarations */
document.querySelector("#date").innerHTML = new Date().toLocaleDateString();
var CountriesArray = [];

/* Displays All countries on the page */
function displayCountries(countries) {
  let countryCard = countries
    .map((country) => {
      return `<div class='card animation'>
            <div class='card-img'>
                <img class='card-img-top' src='${country.flag}' />
            </div>  
            <div class='card-back card-img-top'>
              <p class="card-text"> <b>Population</b> : ${country.population}</p>
              <p class="card-text"> <b>Capital</b>: ${country.capital}</p>
              <p class="card-text"> <b>Region </b>: ${country.region}</p>
              <button class ='btn btn-light know-more-button '><a href='/countries/${country.name}'>Know More</a></button>
             </div>  
             <div class=' card-name'> 
            <p class='card-text'><b>Name</b>: ${country.name}</p>
            
            </div>
      </div>`;
    })
    .join("");
  $(".list-of-countries").html(countryCard);
}

/* Fetching all data from API */

const fetchingData = function () {
  $("#LoadingImage").show();
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      CountriesArray = response;
      $("#LoadingImage").hide();
      displayCountries(response);
    })
    .catch((err) => {
      alert(`Unable to fetch Data! Please try again. ${err}`);
    });
};
window.onload = fetchingData();

/* Fetching Data according to Region */
function filterByregion(region) {
  $("#LoadingImage").show();
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      $(".list-of-countries").html("");
      $("#LoadingImage").hide();
      displayCountries(response);
    })
    .catch((err) => {
      window.location.assign = "http://localhost:3000/404error.html";
    });
}

/* Live Search For Countries */

function clearScreen() {
  $(".list-of-countries").html("<b>No Such Country!! Please Try Again<b>");
}

function SearchCountryByName(e) {
  let inputString = e.target.value.toUpperCase();
  let filteredList = CountriesArray.filter((country) => {
    return country.name.toUpperCase().includes(inputString);
  });
  filteredList.length != 0
    ? displayCountries(filteredList)
    : setTimeout(() => {
        clearScreen();
      }, 1000);
}
