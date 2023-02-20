//Global Variables
//global variables
var submitBtn = document.querySelector("#submit-btn");
var cityInput = document.querySelector("#city-input");
var savedSearchBtn = document.querySelector("#saved-searches");
var currentWeatherCard = document.querySelector("#current-weather");
var forecastCard = document.querySelector("#forecast-cards");
var day1Card = document.querySelector("#day1forecast");
var day2Card = document.querySelector("#day2forecast");
var day3Card = document.querySelector("#day3forecast");
var day4Card = document.querySelector("#day4forecast");
var day5Card = document.querySelector("#day5forecast");
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
//Function to get saved seaches out of local storage
function getHistory() {
  savedSearchBtn.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var cityNameBtn = document.createElement("button");
    cityNameBtn.textContent = searchHistory[i];
    savedSearchBtn.appendChild(cityNameBtn);
    cityNameBtn.addEventListener("click", runWeatherSearch);
  }
}
getHistory();
//function to Run a search by, getting global postioning from city name and pull current weather
function runWeatherSearch(event) {
  event.preventDefault();
  var searchInputVal = "";
  if (event.target.textContent !== "Search") {
    searchInputVal = event.target.textContent;
  } else {
    searchInputVal = document.querySelector("#city-input").value;
  }
  var geocodeUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    searchInputVal +
    "&appid=9c63818d2a58372824ad020aa4224924";
  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latValue = data[0].lat;
      var lonValue = data[0].lon;
      //Store latitude and longitude for saved city search
      if (!searchHistory.includes(searchInputVal)) {
        searchHistory.push(searchInputVal);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
      getHistory();
      getWeatherForecast(latValue, lonValue);
      getCurrentWeather(latValue, lonValue);
      cityInput.value = "";
    });
}
//Function to get current days weather for single card
//APPEND!(City Name, Date, Weather Icons, Temperature)
function getCurrentWeather(latValue, lonValue) {
  var currentWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latValue +
    "&lon=" +
    lonValue +
    "&units=imperial&appid=9c63818d2a58372824ad020aa4224924";
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentWeatherCard.innerHTML = "";
      // City Name
      var cityName = document.createElement("h3");
      cityName.textContent = data.name;
      currentWeatherCard.appendChild(cityName);
      // Date
      var currentDate = document.createElement("p");
      var milliseconds = new Date(data.dt * 1000);
      var convertedDate = milliseconds.toLocaleDateString();
      currentDate.textContent = convertedDate;
      currentWeatherCard.appendChild(currentDate);
      // Weather icon
      var currentIconCode = data.weather[0].icon;
      var currentIconUrl =
        "https://openweathermap.org/img/wn/" + currentIconCode + "@2x.png";
      var currentIcon = document.createElement("img");
      currentIcon.src = currentIconUrl;
      currentWeatherCard.appendChild(currentIcon);
      // Temperature
      var currentTemp = document.createElement("p");
      currentTemp.textContent = data.main.temp + "°F";
      currentWeatherCard.appendChild(currentTemp);
      // Wind
      var currentWind = document.createElement("p");
      currentWind.textContent = data.wind.speed + " MPH Winds";
      currentWeatherCard.appendChild(currentWind);
      // Humidity
      var currentHumidity = document.createElement("p");
      currentHumidity.textContent = data.main.humidity + "% Humidity";
      currentWeatherCard.classList.add("current-weather-card");
      currentWeatherCard.appendChild(currentHumidity);
    });
}

//Function to get current days weather for 5-day forcast
//APPEND!(City Name, Date, Weather Icons, Temperature)
//Day 1
//Day 2
//Day 3
//Day 4
//Day 5

//event listener when clickes run Search fuction
