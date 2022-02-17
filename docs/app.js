/* The user choses a city to show information about by using a dropdown
list and then clicking the search button.

This calls the initial function that reads the city input, and calls the 
other functions with the input as parameter.

The other functions gets data from their respective sources, and 
presents it in their corresponding divs on the homepage
*/

// Variables for handling the map
var map, mapMarker;


// Update map vith new coordinates
function updateMap(coordinates) {
    'use strict';
    // console.log("updateMap", coordinates);

    map.setView(coordinates, 11);
    if (mapMarker) {
        //console.log("remove mapMarker");
        map.removeLayer(mapMarker);
    }
    mapMarker = L.marker(coordinates).addTo(map);

}


// Function that gets weather data from openweathermap
/*function getWeather(city) {
    'use strict';

    var apiKey = "fc2cef4d05e5acca0565daf50456a1af";
    var query = `?q=${city}&units=metric&APPID=${apiKey}`;
    var url = `http://api.openweathermap.org/data/2.5/weather${query}`;

    $.getJSON(url, showWeather);
}*/


// Function that sets up a weather widget using data from openweathermap.org
function getWeather(weatherId) {
    'use strict';

    // var weather = $("#openweatermap-widget-5").html();
    // console.log(weather);
    // $("#openweatermap-widget-5").html("");
    
    
    // API call for several city IDs: 
    // http://api.openweathermap.org/data/2.5/group?id=2643743,2988507,2618425,2673730&units=metric
    
    // window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam = [{
        id: 5,
        cityid: weatherId,
        appid: 'fc2cef4d05e5acca0565daf50456a1af',
        units: 'metric',
        containerid: 'openweathermap-widget-5'
    }];

    console.log(window.myWidgetParam);

    (function () {
        var script = document.createElement('script');
        script.async = true;
        script.charset = "utf-8";
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    })();
    
    weatherId = null;
    document.getElementById("openweathermap-widget-5").innerHTML = null;

    // cityid: weatherId - must refresh and update with new data next time when button "search" is clicked
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


// Set up map
map = L.map('mapid').setView([55.583, 13.0333], 11);
mapMarker = L.marker([55.583, 13.0333]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: 'mapbox/streets-v11',
accessToken: 'pk.eyJ1IjoiZ3JlZW55NzMiLCJhIjoiY2szNXFhY3B4MWVoeTNobzJ0cjBrenl1biJ9.82vZeA5kvvzOlk2lFXlXlw'
}).addTo(map);
// Add event listener to search button
$("#search-button").click(getInfo);

// function which clear weatherId
/*function clearCityId(weatherId) {
    'use strict';
    weatherId = null;
    document.getElementById("openweathermap-widget-5").innerHTML = null;
}

// Add event listener to clear button
$("#clear-city").click(clearCityId);*/