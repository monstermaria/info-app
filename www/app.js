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

    console.log(city);

    getWeather(city);
    moreInfo(city);
}

// Function that gets weather data from openweathermap
function getWeather(city) {
    'use strict';

    var apiKey = "fc2cef4d05e5acca0565daf50456a1af";
    var query = `?q=${city}&units=metric&APPID=${apiKey}`;
    var url = `http://api.openweathermap.org/data/2.5/weather${query}`;

    $.getJSON(url, sendWeather);
}

function sendWeather(weatherDataJSON) {
    'use strict';

    console.log(weatherDataJSON);

    document.getElementById("weather").innerHTML = weatherDataJSON.main.temp;
    
}


// Function that reads JSON data from file
function moreInfo(city) {
    'use strict';

    $.getJSON("info.json", function (data) {
        console.log("moreInfo", data);
        $("#info").text(data[city]);
    });
}


$("#search-button").click(getCity);

/*
window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 15,cityid: '2643743',appid: 'fc2cef4d05e5acca0565daf50456a1af',units: 'metric',containerid: 'openweathermap-widget-15',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();*/
