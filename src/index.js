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

let date = document.querySelector("#now");
date.innerHTML = `${day}, ${hours}:${minutes}`;
function showWeather(response) {
  console.log(response);
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
function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusSign.classList.remove("active");
  fahrenheitSign.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusSign.classList.add("active");
  fahrenheitSign.classList.remove("active");
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", citySubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", showCurrentLocation);

let fahrenheitSign = document.querySelector("#fahrenheitSign");
fahrenheitSign.addEventListener("click", showFahrenheitTemperature);

let celsiusSign = document.querySelector("#celsiusSign");
celsiusSign.addEventListener("click", showCelsiusTemperature);

let kyiv = document.querySelector("#Kyiv");
kyiv.addEventListener("click", showKyivTemperature);

let london = document.querySelector("#London");
london.addEventListener("click", showLondonTemperature);

let berlin = document.querySelector("#Berlin");
berlin.addEventListener("click", showBerlinTemperature);

let paris = document.querySelector("#Paris");
paris.addEventListener("click", showParisTemperature);

searchCity("Dnipro");
