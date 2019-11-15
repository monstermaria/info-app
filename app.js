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
    var weatherData = $.ajax("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=fc2cef4d05e5acca0565daf50456a1af");
    weatherData.then(() => {
        // console.log("In then", weatherData);
        $("#weather").text(weatherData.responseText);
    });
    console.log(weatherData);
}


// Function that reads JSON data from file



$("#search-button").click(getCity);