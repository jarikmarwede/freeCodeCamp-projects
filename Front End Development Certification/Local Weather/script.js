function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  } else {
    console.log("No geolocation available.")
  }
}

async function getWeather(position) {
  const requestUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
  const response = await fetch(requestUrl);
  displayWeather(await response.json());
}

function displayWeather(json) {
  document.getElementById("location").textContent = json.name + ", " + json.sys.country;
  document.getElementById("weather-text").textContent = json.weather[0].main;
  document.getElementById("weather-description").textContent = json.weather[0].description;
  document.getElementById("weather-icon").src.value = json.weather[0].icon;
  document.getElementById("weather-icon").alt.value = json.weather[0].description;
  document.getElementById("humidity").textContent = "Humidity: " + json.main.humidity;
  document.getElementById("pressure").textContent = "Pressure: " + json.main.pressure;
  document.getElementById("temperature").textContent = "Temperature: " + json.main.temp + "°C";
  document.getElementById("temperature-max").textContent = "Temperature max: " + json.main.temp_max + "°C";
  document.getElementById("temperature-min").textContent = "Temperature min: " + json.main.temp_min + "°C";
  document.getElementById("wind-degrees").textContent = "Wind degrees: " + json.wind.deg;
  document.getElementById("wind-speed").textContent = "Wind speed: " + json.wind.speed;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
}

function switchTempUnit() {
  const switchUnitButton = document.getElementById("switch-unit-btn");
  const temperature = document.getElementById("temperature");
  const temperatureMax = document.getElementById("temperature-max");
  const temperatureMin = document.getElementById("temperature-min");

  if (switchUnitButton.textContent == "°F") {
    // change temperature
    const oldTemp = Number(temperature.textContent.split(" ")[1].split("°")[0]);
    const newTemp = Math.round(oldTemp * 1.8 + 32);
    temperature.textContent = "Temperature: " + newTemp + "°F";
    // change temperature max
    const oldTempMax = Number(temperatureMax.textContent.split(" ")[2].split("°")[0]);
    const newTempMax = Math.round(oldTempMax * 1.8 + 32);
    temperatureMax.textContent = "Temperature max: " + newTempMax + "°F";
    // change temperature min
    const oldTempMin = Number(temperatureMin.textContent.split(" ")[2].split("°")[0]);
    const newTempMin = Math.round(oldTempMin * 1.8 + 32);
    temperatureMin.textContent = "Temperature min: " + newTempMin + "°F";
    switchUnitButton.textContent = "°C";
  } else {
    // change temperature
    const oldTemp = Number(temperature.textContent.split(" ")[1].split("°")[0]);
    const newTemp = Math.round((oldTemp - 32) / 1.8);
    temperature.textContent = "Temperature: " + newTemp + "°C";
    // change temperature max
    const oldTempMax = Number(temperatureMax.textContent.split(" ")[2].split("°")[0]);
    const newTempMax = Math.round((oldTempMax - 32) / 1.8);
    temperatureMax.textContent = "Temperature max: " + newTempMax + "°C";
    // change temperature min
    const oldTempMin = Number(temperatureMin.textContent.split(" ")[2].split("°")[0]);
    const newTempMin = Math.round((oldTempMin - 32) / 1.8);
    temperatureMin.textContent = "Temperature min: " + newTempMin + "°C";
    switchUnitButton.textContent = "°F";
  }
}

function toggleMoreInfo() {
  const moreInfoButton = document.getElementById("more-info-btn");
  const extraInfoElements = document.getElementsByClassName("extra-info");

  if (moreInfoButton.textContent == "Show less") {
    moreInfoButton.textContent = "Show more";
    for (element of extraInfoElements) {
      element.style.display = "none";
    }
  } else {
    moreInfoButton.textContent = "Show less";
    for (element of extraInfoElements) {
      element.style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getLocation();
  toggleMoreInfo();
  document.getElementById("more-info-btn").addEventListener("click", toggleMoreInfo);
  document.getElementById("switch-unit-btn").addEventListener("click", switchTempUnit);
});
