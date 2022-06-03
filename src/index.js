let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="bottom_line">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-sm-2">
            <div class="forecast_day">${formatDay(forecastDay.dt)}</div>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="Clouds"
            />
            <div class="forecast_temp"> 
              <span class="weather-forecast-temp-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
                <span class="weather-forecast-temp-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span> 
              </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let date = document.querySelector("#now");
date.innerHTML = `${day}, ${hours}:${minutes}`;

function getForecast(coordinates) {
  let apiKey = "5fac1c82a1b209a04fbd8df775e5cf4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = ` Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = ` Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "5fac1c82a1b209a04fbd8df775e5cf4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showKyivTemperature(event) {
  event.preventDefault();
  searchCity("Kyiv");
}

function showLondonTemperature(event) {
  event.preventDefault();
  searchCity("London");
}

function showBerlinTemperature(event) {
  event.preventDefault();
  searchCity("Berlin");
}

function showParisTemperature(event) {
  event.preventDefault();
  searchCity("Paris");
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5fac1c82a1b209a04fbd8df775e5cf4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", citySubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", showCurrentLocation);

let kyiv = document.querySelector("#Kyiv");
kyiv.addEventListener("click", showKyivTemperature);

let london = document.querySelector("#London");
london.addEventListener("click", showLondonTemperature);

let berlin = document.querySelector("#Berlin");
berlin.addEventListener("click", showBerlinTemperature);

let paris = document.querySelector("#Paris");
paris.addEventListener("click", showParisTemperature);

searchCity("Dnipro");
