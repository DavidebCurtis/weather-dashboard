var searchFormEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city");

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
        $("#city-name-header").text(
          cityName + " (" + moment().format("l") + ")"
        );
        $("#temp").text("Temp: " + data.current.temp + " Fahrenheit");
        $("#wind").text("Wind: " + data.current.wind_speed + " MPH");
        $("#humidity").text("Humidity: " + data.current.humidity + " %");
        $("#uv-index").text("UV Index: " + data.current.uvi);
        displayFiveDay();
        console.log(fiveDayData);
        return fiveDayData;
      });
    }
  });
};

// let displayFiveDay = function () {
//   let i = fiveDayData.daily;
//   let index = 0;
//   i.forEach((day) => {
//     const dayContainer = document.createElement("div");

//     const temp = fiveDayData.daily[index].temp.day;
//     const tempElem = document.createElement("div");
//     tempElem.innerText = Math.round(temp) + "°F";
//     dayContainer.appendChild(tempElem);

//     $("#daily-row").append(dayContainer);
//   });
// };

let displayFiveDay = function () {
  for (let index = 0; index < fiveDayData.daily.length; index++) {
    console.log(fiveDayData.daily[index]);
    let i = fiveDayData.daily[index];

    // create card
    let card = document.createElement("div");
    card.setAttribute("id", index);
    card.classList.add("weather-card");

    const temp = fiveDayData.daily[index].temp.day;
    const tempElem = document.createElement("div");
    tempElem.innerText = Math.round(temp) + "°F";
    card.appendChild(tempElem);

    $("#daily-row").append(card);
    if (index === 4) {
      return;
    }
  }
};

searchFormEl.addEventListener("submit", formSubmitHandler);

// $("#0 #day-header").text(cityName);
// $("#1 #day-header").text(cityName);
// $("#2 #day-header").text(cityName);
// $("#3 #day-header").text(cityName);
// $("#4 #day-header").text(cityName);
