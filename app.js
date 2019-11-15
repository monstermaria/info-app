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
        document.getElementById("test").innerHTML = "your choise: London (test)";
    } else if (city === "paris") {
        document.getElementById("test").innerHTML = "your choise: Paris (test)";
    } else if (city === "copenhagen") {
        document.getElementById("test").innerHTML = "your choise: Copenhagen (test)";
    } else if (city === "stockholm") {
        document.getElementById("test").innerHTML = "your choise: Stockholm (test)";
    }
}

// var city = "london";
// Function that gets weather data from openweathermap
function getWeather(city) {
	var weatherData = "There will be a call to openweathermap";
	$("weather").text(weatherdata);
}


// Function that reads JSON data from file



$("#search-button").click(getCity);