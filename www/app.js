/* The user choses a city to show information about by using a dropdown
list and the clicking the search button.

This calls the initial function that reads the input, and calls the 
other functions with the input as parameter.

The other functions gets data from their respective sources, and 
presents it in their corresponding divs on the homepage
*/


// Function to read input and call other functions that collect data
function getCity() {
    'use strict';

    var city = $("#city").val();
    //console.log(city);
    moreInfo(city);
}

function getMyMap(coordinates) {
    console.log("getMyMap", coordinates);

    mymap.setView(coordinates, 3);
    if (marker) {
        console.log("remove marker");
        mymap.removeLayer(marker);
    }
    marker = L.marker(coordinates).addTo(mymap);

}
var mymap = L.map('mapid').setView([0, 0], 0);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZ3JlZW55NzMiLCJhIjoiY2szNXFhY3B4MWVoeTNobzJ0cjBrenl1biJ9.82vZeA5kvvzOlk2lFXlXlw'
}).addTo(mymap);
// var marker = L.marker([0, 0]).addTo(mymap);
var marker;


// Function that reads JSON data from file
function moreInfo(city) {
    'use strict';

    $.getJSON("info.json", function (data) {
        //console.log("moreInfo", data);
        var cityData = data[city];
        //console.log(cityData);
        sendWeather(cityData.weatherId);
        $("#info").text(cityData.infoText);
    });
}


// Function that gets weather data from openweathermap
/*function getWeather(city) {
    'use strict';

    var apiKey = "fc2cef4d05e5acca0565daf50456a1af";
    var query = `?q=${city}&units=metric&APPID=${apiKey}`;
    var url = `http://api.openweathermap.org/data/2.5/weather${query}`;

    $.getJSON(url, sendWeather);
}*/


function sendWeather(city) {
    'use strict';

    //console.log();    
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({id: 15, cityid: city, appid: 'fc2cef4d05e5acca0565daf50456a1af', units: 'metric', containerid: 'openweathermap-widget-15'});
    (function () {var script = document.createElement('script');
                 script.async = true; script.charset = "utf-8";
                 script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
                 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
                })();
}


$("#search-button").click(getCity);
