var searchFormEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city");
var cityNameEl = document.getElementById("city-name-header");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uVIndexEl = document.getElementById("uv-index");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();
  console.log(cityname);

  if (cityname) {
    getCityWeather(cityname);
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
};

// var getCityWeather = function (cityname) {
//   var apiUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     cityname +
//     "&units=imperial&appid=28da97f6c34c725f70e79aba45588612";

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           console.log(data);
//           //   displayCityWeather();
//           cityNameEl.innerHTML = data.name;
//           tempEl.innerHTML = "Temp: " + data.main.temp + " Fahrenheit";
//           windEl.innerHTML = "Wind: " + data.wind.speed + " MPH";
//           humidityEl.innerHTML = "Humidity: " + data.main.humidity + " %";
//           //   uVIndexEl.innerHTML = data.
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect to Openweathermap");
//     });
// };

var getCityWeather = function (cityname) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=28da97f6c34c725f70e79aba45588612";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        cityNameEl.innerHTML = data.name;
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&exclude=hourly&units=imperial&appid=28da97f6c34c725f70e79aba45588612"
        ).then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              tempEl.innerHTML = "Temp: " + data.current.temp + " Fahrenheit";
              windEl.innerHTML = "Wind: " + data.current.wind_speed + " MPH";
              humidityEl.innerHTML =
                "Humidity: " + data.current.humidity + " %";
              uVIndexEl.innerHTML = "UV Index: " + data.current.uvi;
            });
          }
        });
      });
    }
  });
};

searchFormEl.addEventListener("submit", formSubmitHandler);
