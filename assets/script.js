//openweatherAPI
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var APIKey = `d33f443aa634fe21a7565ac3d428430a`;
var forecastContainer = document.getElementById("five-day-forecast");
var forecastHtmlContent = "";

//image
const weatherImg = document.querySelector(".weather-img");
const h1 = document.querySelector("h1");
const p = document.querySelector("p");
const h5 = document.querySelector("h5");
//location/city
//temperuature
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.querySelector("#city").value;
  console.log(city);
  fetch(`${weatherUrl}?q=${city}&units=imperial&appid=${APIKey}`)
    .then((response) => response.json()) // "return" is implied
    .then((data) => {
      console.log(data);
      h1.innerHTML = city;
      p.innerHTML = `Current Weather: ${data.main.temp}`;
      weatherImg.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      secondAPICall(data.coord.lat, data.coord.lon, APIKey);
    });
});

function secondAPICall(lat, lon, apiKey) {
  var secondAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(secondAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var dailyWeatherArray = data.list;

      for (let index = 0; index < dailyWeatherArray.length; index += 8) {
        console.log(dailyWeatherArray[index]);

        const fiveDayCard = `<div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${dailyWeatherArray[index].main.temp}</h5>
          <p class="card-text"></p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`;

        //   concvatenating the cards
        forecastHtmlContent += fiveDayCard;
      }
      forecastContainer.innerHTML = forecastHtmlContent;
    });
}
//make sure everything
