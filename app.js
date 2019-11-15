/* The user choses a city to show information about by using a dropdown
list and the clicking the search button.

This calls the initial function that reads the input, and calls the 
other functions with the input as parameter.

The other functions gets data from their respective sources, and 
presents it in their corresponding divs on the homepage
*/


// Function to read input and call other functions that collect data
function getTown() {
    'use strict';
    var town = $("#town").val();
    // here will be function som gets weather for London
    // I wrote only tests for checking 
    if (town === "london") {
        document.getElementById("info").innerHTML = "your choise: London (test)";
    } else if (town === "paris") {
        document.getElementById("info").innerHTML = "your choise: Paris (test)";
    }
}


// Function that gets weather data from openweathermap



// Function that reads JSON data from file



$("#search-button").click(getTown);