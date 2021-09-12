// Feature 1: Showing the date
function displayDate(date) {
  let currentDate = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let formattedDate = `${day}, ${month} ${currentDate}, ${hours}:${minutes}`;
  return formattedDate;
}
let now = new Date();
let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = displayDate(now);

// Feature 2: Displaying city name
function displayCity(event) {
  event.preventDefault();
  let cityHeader = document.querySelector("#city-name");
  let searchInput = document.querySelector("#city-search");
  let newCityName = searchInput.value.trim().toLowerCase();
  let sentenceCaseCity =
    newCityName[0].toUpperCase() + newCityName.substring(1);
  cityHeader.innerHTML = sentenceCaseCity;
  let apiKey = `9a2a40fbafb3cdf4386821927d8245af`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

// Feature 3: Displaying current temperature
function showCurrentTemperature(response) {
  console.log(response);
  let currentTemperatureHeader = document.querySelector("#current-temp");
  currentTemperatureHeader.innerHTML = Math.round(response.data.main.temp);
}

// Feature 4: Getting weather by geolocation
function getTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `836945bb1ae780c68d086d693cfcb666`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function callForGeolocation(event) {
  navigator.geolocation.getCurrentPosition(getTemperature);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", callForGeolocation);
