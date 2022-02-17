/* The user choses a city to show information about by using a dropdown
list and then clicking the search button.

This calls the initial function that reads the city input, and calls the 
other functions with the input as parameter.

The other functions gets data from their respective sources, and 
presents it in their corresponding divs on the homepage
*/


// Set up map
var map = L.map('mapid').setView([55.583, 13.0333], 11);
var mapMarker = L.marker([55.583, 13.0333]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoiZ3JlZW55NzMiLCJhIjoiY2szNXFhY3B4MWVoeTNobzJ0cjBrenl1biJ9.82vZeA5kvvzOlk2lFXlXlw'
}).addTo(map);


// Update map vith new coordinates
function updateMap(coordinates) {
  'use strict';

  map.setView(coordinates, 11);
  if (mapMarker) {
    map.removeLayer(mapMarker);
  }
  mapMarker = L.marker(coordinates).addTo(map);
}


// Function that sets up a weather widget using data from openweathermap.org
function getWeather(weatherId) {
  'use strict';

  // clear previous content from the weather div
  $("#openweathermap-widget-5").html("");

  // set weather widget parameters
  window.myWidgetParam = [{
    id: 5,
    cityid: weatherId,
    appid: 'fc2cef4d05e5acca0565daf50456a1af',
    units: 'metric',
    containerid: 'openweathermap-widget-5'
  }];

  // add a new script tag that loads the new widget
  // TODO: use jQuery instead of document.doSomething...
  // TODO: remove the previous script, to avoid having multiple copies in the document head
  (function () {
    var script = document.createElement('script');
    script.async = true;
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  })();
}


// Function that reads input, then reads JSON data from a local file and uses that data
// to call other functions that collect weather and map data
function getInfo() {
  'use strict';

  var city = $("#city").val();

  $.getJSON("info.json", function (data) {
    var cityData = data[city];
    getWeather(cityData.weatherId);
    updateMap(cityData.mapCoordinates);
    $("#info").text(cityData.infoText);
  });
}


// Add event listener to search button
$("#search-button").click(getInfo);

// load initial weather widget with data for Malmö
getWeather('2692969');
