// Add Notes
// mobile ready?;
var cityUrl = $("#cityInput").val().trim();
var key = "f183369b23d768246e94cc35ace9f5f9"
var current = "https://api.openweathermap.org/data/2.5/weather?q=" + cityUrl + "&appid=" + key;


//Button is clicked and value is taken
$(".searchBtn").click(function() {
    // Gets value of input
    var city = $("#cityInput").val().trim();

    if($(".savedBtn").html() !== city) {
        // add name to list in leftSide
        $(".savedDiv").append("<button class ='savedBtn'>" + city + "</button>");
    } else {
        return;
    }

    // passes city to another function to do the rest 
    beginHTML(city);
});

//SavedBtn is clicked and city in button is passed to beginHTML func
$(".savedDiv").on("click", ".savedBtn", function (event){
    var city = $(event.target).html().trim();
    beginHTML(city);
});

var beginHTML = function(searchValue) {
    
        // assigns current api url to a variable 
        var current = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + key;
        
        // fetches first data package in order to extract Lat and Lon
        fetch(current).then(function(response){
            if(response.ok) {
                response.json().then(function(data){
                    
                    // clear destination div before populating
                    $(".rightWrap").html(" ");

                    // add name of city to right side
                    $(".rightWrap").append("<span class='card-title'>" + searchValue + "</span>");
       
                    // get todays date for dipslay
                    var date = moment().format("dddd, MMMM Do YYYY");
        
                    // add date to right side
                    $(".rightWrap").append("<span class = card-subtile>" + date + "</span>")

                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    //data package i sent to another function in order retrieve full forecast API
                    futureFetch(lat, lon);
                })
            } else {
                // alert to please choose valid city
                window.alert("please choose a valid city");

                // clear input of nonvalid value
                $("#cityInput").val("");
            }
        });
};

// Takes data from current weather API and extracts lat and lon to use for multi day forecast API call
var futureFetch = function(lat, lon){

    var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude={part}&appid=" + key;
    fetch(fiveDay).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                createHTML(data);
            })
        }
    });
};

var createHTML = function (data) {
    // data variables 
    var wind = data.current.wind_speed;
    var humidity = data.current.humidity;
    var description = data.current.weather[0].description;
    var uvI = data.current.uvi;
    var farenheit = Math.floor(data.current.temp);
    var celsius = Math.floor(farenheit - 32);
    var icon = data.current.weather[0].icon;

    if(uvI >= 8 && uvI <= 10){
        var uvIColor = "text-danger";
    }else if(uvI >= 3 && uvI <= 7){
        var uvIColor = "text-warning";
    }else{
        var uvIColor = "text-success";
    };

    // clear conditions div and appends new conditions
    $(".conditions").html(" ");
    $(".conditions").append("<li> Wind Speed: " + wind + " mph </li><li> Humidity: " + humidity + " % </li><li class="+ uvIColor +"> UV Index: " + uvI + "</li><li>" + description + "</li>");

    // Current Temperature displayed as card body 
    $(".rightWrap").append("<h2 class='card-body'>" + farenheit + " F || " + celsius + " C")

    // weather.icon retrieved and appened to target div
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
    $(".rightWrap").prepend("<img alt = 'weather-icon' class='card-img-top' src =" + iconUrl + " height=120px>")

    // create cards for five day forecast
    today = moment();
    var tomorrow = today.add(1, 'days').format("L");
    var day2 = today.add(1, "days").format("L");
    var day3 = today.add(1, "days").format("L");
    var day4 = today.add(1, "days").format("L");
    var day5 = today.add(1, "days").format("L");

    var dayDivs = [".dayPlusOne", ".dayPlusTwo", ".dayPlusThree", ".dayPlusFour", ".dayPlusFive"]
    var days = [tomorrow , day2 , day3, day4, day5]

    for(var i = 0; i < 5; i++){
        var dailyHum = data.daily[i].humidity;// for loop
        var dailyHi = Math.floor(data.daily[i].temp.max);
        var dailyLow = Math.floor(data.daily[i].temp.min);
        var fiveIcon = data.daily[i].weather[0].icon;
        var fiveIconUrl = "https://openweathermap.org/img/wn/" + fiveIcon + ".png";
        $(dayDivs[i]).html(" ");

        $(dayDivs[i]).append("<h4 class='card-title'>" + days[i] + " </h4>" + "<img alt = 'weather-icon' height=.5em class='card-img-top' src=" + fiveIconUrl + "></img><h5>" + dailyHi + "F - Hi </h5><h5>" + dailyLow + "F - Low </h5><h5> Humidity: " + dailyHum + "% </h5>");
    }
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