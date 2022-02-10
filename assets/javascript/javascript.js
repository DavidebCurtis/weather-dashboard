var searchFormEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city");

var date = moment().format("l");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getCityWeather(cityname);
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
};

let getCityWeather = function (cityname) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=28da97f6c34c725f70e79aba45588612";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        lat = data.coord.lat;
        lon = data.coord.lon;
        cityName = data.name;
        displayCityWeather();
        return lat + lon + cityName;
      });
    }
  });
};

let displayCityWeather = function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=hourly&units=imperial&appid=28da97f6c34c725f70e79aba45588612"
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        fiveDayData = data;
        $("#city-name-header").text(cityName + " (" + date + ")");
        $("#temp").text("Temp: " + data.current.temp + " Fahrenheit");
        $("#wind").text("Wind: " + data.current.wind_speed + " MPH");
        $("#humidity").text("Humidity: " + data.current.humidity + " %");
        $("#uv-index").text("UV Index: " + data.current.uvi);
        displayFiveDay();
        return fiveDayData;
      });
    }
  });
};

let displayFiveDay = function () {
  console.log(fiveDayData);
};

searchFormEl.addEventListener("submit", formSubmitHandler);
