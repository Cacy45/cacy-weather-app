function refreshWeather(data) {
    // Check if data is valid
    if (!data || !data.city || !data.temperature) {
        console.error("Invalid weather data:", data);
        return;
    }

    let temperatureElement = document.querySelector("#weather-temperature");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");

    // Access properties directly from the data object
    temperatureElement.innerHTML = Math.round(data.temperature.current);
    cityElement.innerHTML = data.city;
    descriptionElement.innerHTML = data.condition.description;
    humidityElement.innerHTML = data.temperature.humidity + "%";
    windElement.innerHTML = data.wind.speed + " km/h";

    // Update the weather icon
    iconElement.innerHTML = `<img src="${data.condition.icon_url}" class="weather-icon" />`;

    // Format and update the time
    let date = new Date(data.time * 1000);
    timeElement.innerHTML = formatDate(date);
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
  //searchCity = "Paris"; // default city valuesearchCity=("Paris"); // default city value
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  if (!city) {
    console.error("No city provided!");
    return; // Exit the function if no city is provided
  }

  let apiKey = "af55121o24b9f5169b1be07t33c94a6a"; // Ensure you have your actual API key here
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Make the API call using Axios
  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data); // Log the response for debugging
      refreshWeather(response.data); // Call your function to update the UI
   

      // Call getForecast to fetch and display forecast data for the same city
      getForecast(city);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please check the city name.");
    });

  /*let apiKey = "af55121o24b9f5169b1be07t33c94a6a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);*/
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input").value;
  console.log("Searching for city:", searchInput); // Debugging log
  searchCity(searchInput);
}

function getForecast(city) {
  let myApiKey = "af55121o24b9f5169b1be07t33c94a6a";
  let myApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${myApiKey}&units=metric`;
  axios.get(myApiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);
  //let days = ["Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast">
<div class="forecast-day">
<div class="forecast-date">${formatDay(day.time)}</div>

<img src="${day.condition.icon_url}" class="forecast-icon"/>

            <div class="forecast-temperatures">
              <div class="forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°C</strong>
              </div>
              <div class="forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div>
          </div>
          </div>
          `;
    }
  });

  let forecast = document.querySelector("#forecast-container");
  forecast.innerHTML = forecastHtml;
}
/*let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Cape Town"); // default city value*/

//displayForecast();
//getForecast("Paris");
document.addEventListener("DOMContentLoaded", function() {
    let searchFormElement = document.querySelector("#search-form");
    searchFormElement.addEventListener("submit", handleSearchSubmit);
});

