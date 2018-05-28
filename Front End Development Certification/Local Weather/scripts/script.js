function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  } else {
    console.log("No geolocation available.")
  }
}

function getWeather(position) {
  var requestUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
  $.getJSON(requestUrl, function(json) {displayWeather(json);});
}

function displayWeather(json) {
  $("#location").text(json.name + ", " + json.sys.country)
  $("#weather-text").text(json.weather[0].main);
  $("#weather-description").text(json.weather[0].description);
  $("#weather-icon").attr("src", json.weather[0].icon);
  $("#weather-icon").attr("alt", json.weather[0].description);
  $("#humidity").text("Humidity: " + json.main.humidity);
  $("#pressure").text("Pressure: " + json.main.pressure);
  $("#temperature").text("Temperature: " + json.main.temp + "°C");
  $("#temperature-max").text("Temperature max: " + json.main.temp_max + "°C");
  $("#temperature-min").text("Temperature min: " + json.main.temp_min + "°C");
  $("#wind-degrees").text("Wind degrees: " + json.wind.deg);
  $("#wind-speed").text("Wind speed: " + json.wind.speed);
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
  if ($("#switch-unit-btn").text() == "Switch to Fahrenheit") {
    // change temperature
    $("#temperature").text(function(i, origText) {
      var oldTemp = Number(origText.split(" ")[1].split("°")[0]);
      var newTemp = oldTemp * 1.8 + 32;
      $("#temperature").text("Temperature: " + newTemp + "°F");
    })
    // change temperature max
    $("#temperature-max").text(function(i, origText) {
      var oldTemp = Number(origText.split(" ")[2].split("°")[0]);
      var newTemp = oldTemp * 1.8 + 32;
      $("#temperature-max").text("Temperature max: " + newTemp + "°F");
    })
    // change temperature min
    $("#temperature-min").text(function(i, origText) {
      var oldTemp = Number(origText.split(" ")[2].split("°")[0]);
      var newTemp = oldTemp * 1.8 + 32;
      $("#temperature-min").text("Temperature min: " + newTemp + "°F");
    })
    $("#switch-unit-btn").text("Switch to Celsius");
  } else {
    // change temperature
    $("#temperature").text(function(i, origText) {
      var oldTemp = Number(origText.split(" ")[1].split("°")[0]);
      var newTemp = (oldTemp - 32) / 1.8;
      $("#temperature").text("Temperature: " + newTemp + "°C");
    })
    // change temperature max
    $("#temperature-max").text(function(i, origText) {
      var oldTemp = Number(origText.split(" ")[2].split("°")[0]);
      var newTemp = (oldTemp - 32) / 1.8;
      $("#temperature-max").text("Temperature max: " + newTemp + "°C");
    })
    // change temperature min
    $("#temperature-min").text(function(i, origText) {
      var oldTemp = Number(origText.split(" ")[2].split("°")[0]);
      var newTemp = (oldTemp - 32) / 1.8;
      $("#temperature-min").text("Temperature min: " + newTemp + "°C");
    })
    $("#switch-unit-btn").text("Switch to Fahrenheit");
  }
}

$(document).ready(function() {
  $(".extra-info").hide();
  getLocation();
  $("#more-info-btn").on("click", function() {
    $(".extra-info").toggle();
    if ($("#more-info-btn").text() == "Hide additional info") {
      $("#more-info-btn").text("Show additional info");
    } else {
      $("#more-info-btn").text("Hide additional info");
    }
  })
  $("#switch-unit-btn").on("click", function() {switchTempUnit();})
})