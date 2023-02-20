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
function getWeatherForecast(latValue, lonValue) {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latValue +
    "&lon=" +
    lonValue +
    "&units=imperial&appid=9c63818d2a58372824ad020aa4224924";
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      day1Card.innerHTML = "";
      //Day 1
      // Date
      var day1Date = document.createElement("p");
      var milliseconds1 = new Date(data.list[3].dt * 1000);
      var convertedDate1 = milliseconds1.toLocaleDateString();
      day1Date.textContent = convertedDate1;
      day1Card.appendChild(day1Date);
      // Weather icon
      var day1IconCode = data.list[3].weather[0].icon;
      var day1IconUrl =
        "https://openweathermap.org/img/wn/" + day1IconCode + "@2x.png";
      var day1Icon = document.createElement("img");
      day1Icon.src = day1IconUrl;
      day1Card.appendChild(day1Icon);
      // Temperature
      var day1Temp = document.createElement("p");
      day1Temp.textContent = data.list[3].main.temp + "°F";
      day1Card.appendChild(day1Temp);
      // Wind
      var day1Wind = document.createElement("p");
      day1Wind.textContent = data.list[3].wind.speed + " MPH Winds";
      day1Card.appendChild(day1Wind);
      // Humidity
      var day1Humidity = document.createElement("p");
      day1Humidity.textContent = data.list[3].main.humidity + "% Humidity";
      day1Card.appendChild(day1Humidity);
      //Day 2
      day2Card.innerHTML = "";
      var day2Date = document.createElement("p");
      var milliseconds2 = new Date(data.list[11].dt * 1000);
      var convertedDate2 = milliseconds2.toLocaleDateString();
      day2Date.textContent = convertedDate2;
      day2Card.appendChild(day2Date);

      var day2IconCode = data.list[11].weather[0].icon;
      var day2IconUrl =
        "https://openweathermap.org/img/wn/" + day2IconCode + "@2x.png";
      var day2Icon = document.createElement("img");
      day2Icon.src = day2IconUrl;
      day2Card.appendChild(day2Icon);

      var day2Temp = document.createElement("p");
      day2Temp.textContent = data.list[11].main.temp + "°F";
      day2Card.appendChild(day2Temp);

      var day2Wind = document.createElement("p");
      day2Wind.textContent = data.list[11].wind.speed + " MPH Winds";
      day2Card.appendChild(day2Wind);

      var day2Humidity = document.createElement("p");
      day2Humidity.textContent = data.list[11].main.humidity + "% Humidity";
      day2Card.appendChild(day2Humidity);

      day3Card.innerHTML = "";
      //Day 3
      var day3Date = document.createElement("p");
      var milliseconds3 = new Date(data.list[19].dt * 1000);
      var convertedDate3 = milliseconds3.toLocaleDateString();
      day3Date.textContent = convertedDate3;
      day3Card.appendChild(day3Date);

      var day3IconCode = data.list[19].weather[0].icon;
      var day3IconUrl =
        "https://openweathermap.org/img/wn/" + day3IconCode + "@2x.png";
      var day3Icon = document.createElement("img");
      day3Icon.src = day3IconUrl;
      day3Card.appendChild(day3Icon);

      var day3Temp = document.createElement("p");
      day3Temp.textContent = data.list[19].main.temp + "°F";
      day3Card.appendChild(day3Temp);

      var day3Wind = document.createElement("p");
      day3Wind.textContent = data.list[19].wind.speed + " MPH Winds";
      day3Card.appendChild(day3Wind);

      var day3Humidity = document.createElement("p");
      day3Humidity.textContent = data.list[19].main.humidity + "% Humidity";
      day3Card.appendChild(day3Humidity);

      day4Card.innerHTML = "";
      //Day 4
      var day4Date = document.createElement("p");
      var milliseconds4 = new Date(data.list[27].dt * 1000);
      var convertedDate4 = milliseconds4.toLocaleDateString();
      day4Date.textContent = convertedDate4;
      day4Card.appendChild(day4Date);

      var day4IconCode = data.list[27].weather[0].icon;
      var day4IconUrl =
        "https://openweathermap.org/img/wn/" + day4IconCode + "@2x.png";
      var day4Icon = document.createElement("img");
      day4Icon.src = day4IconUrl;
      day4Card.appendChild(day4Icon);

      var day4Temp = document.createElement("p");
      day4Temp.textContent = data.list[27].main.temp + "°F";
      day4Card.appendChild(day4Temp);

      var day4Wind = document.createElement("p");
      day4Wind.textContent = data.list[27].wind.speed + " MPH Winds";
      day4Card.appendChild(day4Wind);

      var day4Humidity = document.createElement("p");
      day4Humidity.textContent = data.list[27].main.humidity + "% Humidity";
      day4Card.appendChild(day4Humidity);
      day5Card.innerHTML = "";
      //Day 5
      var day5Date = document.createElement("p");
      var milliseconds5 = new Date(data.list[35].dt * 1000);
      var convertedDate5 = milliseconds5.toLocaleDateString();
      day5Date.textContent = convertedDate5;
      day5Card.appendChild(day5Date);

      var day5IconCode = data.list[35].weather[0].icon;
      var day5IconUrl =
        "https://openweathermap.org/img/wn/" + day5IconCode + "@2x.png";
      var day5Icon = document.createElement("img");
      day5Icon.src = day5IconUrl;
      day5Card.appendChild(day5Icon);

      var day5Temp = document.createElement("p");
      day5Temp.textContent = data.list[35].main.temp + "°F";
      day5Card.appendChild(day5Temp);

      var day5Wind = document.createElement("p");
      day5Wind.textContent = data.list[35].wind.speed + " MPH Winds";
      day5Card.appendChild(day5Wind);

      var day5Humidity = document.createElement("p");
      day5Humidity.textContent = data.list[35].main.humidity + "% Humidity";
      day5Card.appendChild(day5Humidity);
    });
}
//event listener when clickes run Search fuction
submitBtn.addEventListener("click", runWeatherSearch);
