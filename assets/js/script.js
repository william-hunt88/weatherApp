var savedDiv = document.querySelector(".savedDiv");
var rightWrap = document.querySelector(".rightWrap")
var searchBtn = document.querySelector(".searchBtn");
var city = $("#cityInput").val().trim();
var key = "f183369b23d768246e94cc35ace9f5f9"
var current = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;


//Button is clicked and value is taken
$(searchBtn).click(function(){
    // Gets value of input
    var city = $("#cityInput").val().trim();
    // add name to list in leftSide
    var savedCity = document.createElement("button")
    savedCity.innerHTML = city;
    savedDiv.appendChild(savedCity);

    // add name of city to right side
    rightWrap.innerHTML = " ";
    var cityDisplay = document.createElement("span");
    cityDisplay.innerHTML = city;
    rightWrap.appendChild(cityDisplay);

    // add date to right side
    var date = moment().format("dddd, MMMM Do YYYY");
    console.log(date);
    var dateDisplay=document.createElement("span");
    dateDisplay.innerHTML = date;
    rightWrap.appendChild(dateDisplay);


    // assigns url to a variable 
    var current = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
    
    // fetches data package
    fetch(current).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                createCurrent(data);
            })
        } else {
            // alert to please choose valid city
        }
    })
});


var createCurrent = function (data) {
    // temp, humidity, wind speed, icon rep' of weather, uv index.

    // UV index remains
    var wind = data.wind.speed
    console.log(wind);

    var humidity = data.main.humidity;
    console.log(humidity);

    var description = data.weather[0].description;
    console.log(description);

    var lat = data.coord.lat;
    var lon = data.coord.lon;

    // weather.icon - asuccesffuly retrieved and appened to target div
    var icon = data.weather[0].icon;
    console.log(icon);
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
    var iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconUrl);
    iconImg.setAttribute("height", "80px")
    rightWrap.append(iconImg);

    var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + key;
    fetch(fiveDay).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                createFuture(data);
            })
        }
    });
}

var createFuture = function(data) { 
    // still need date display

    // variables for data
    var uvi = data.current.uvi;
    var dailyHum = data.daily[0].humidity;// for loop
    var dailyHi = data.daily[0].temp.max;
    var dailyLow = data.daily[0].temp.min;

    // send UV index to be applied to HTML
    createUvi(uvi);

    // create cards for five day forecast

};

var createUvi = function(uvi) {
    //create or request colored icon to represent UV index
    console.log(uvi);
};



// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city