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
    // There will be function som gets weather for London
    // I wrote only tests for checking 
    if (city === "london") {
        getWeather(city);
    } else if (city === "paris") {
        document.getElementById("test").innerHTML = "your choice: Paris (test)";
    } else if (city === "copenhagen") {
        document.getElementById("test").innerHTML = "your choice: Copenhagen (test)";
    } else if (city === "stockholm") {
        document.getElementById("test").innerHTML = "your choice: Stockholm (test)";
    }
}

// Function that gets weather data from openweathermap
function getWeather(city) {
    'use strict';
    var weatherData = $.ajax("http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=fc2cef4d05e5acca0565daf50456a1af");
    weatherData.then(function () {
        // console.log("In then", weatherData);
        //$("#weather").text(weatherData.responseText);
        sendWeather(weatherData.responseJSON);
    });
    console.log(weatherData);
}

function sendWeather(weatherDataJSON) {
    'use strict';
    console.log(weatherDataJSON);
    //var weatherObject = JSON.parse(weatherDataJSON);
    document.getElementById("weather").innerHTML = weatherDataJSON.main.temp;
}


// Function that reads JSON data from file
function moreInfo(city) {
    'use strict';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("test").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "info.json", true);
    xhttp.send();

//var moreInfo = fs.readFile("info.json");
    // data is a JavaScript object now. Handle it as such
}

moreInfo();

$("#search-button").click(getCity);


