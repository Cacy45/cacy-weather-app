function refreshWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  console.log(temperature);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidtyElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidtyElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  //getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "af55121o24b9f5169b1be07t33c94a6a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city){
  let myApiKey = "af55121o24b9f5169b1be07t33c94a6a";
  let myApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${myApiKey}&units=metric`;
  axios.get(myApiUrl).then(displayForecast);

};

function displayForecast(response) {
  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast">
<div class="forecast-day">
<div class="forecast-date">${day}</div>
<div class="forecast-icon">🌧️</div>
            <div class="forecast-temperatures">
              <div class="forecast-temperature">
                <strong>15°C</strong>
              </div>
              <div class="forecast-temperature">23°C</div>
            </div>
          </div>
          </div>
          `;
  });

  let forecast = document.querySelector("#forecast-container");
  forecast.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity=("Paris"); // default city value

//displayForecast();
//getForecast("Paris");

