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
//function to get global postioning from city name and pull current weather
//Store latitude and longitude for saved city search

//Function to get current days weather for single card
//APPEND!(City Name, Date, Weather Icons, Temperature)

//Function to get current days weather for 5-day forcast
//APPEND!(City Name, Date, Weather Icons, Temperature)
//Day 1
//Day 2
//Day 3
//Day 4
//Day 5

//event listener when clickes run Search fuction
