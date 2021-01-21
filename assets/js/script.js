var key = "f183369b23d768246e94cc35ace9f5f9"
var city = "Atlanta"
var current = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;




fetch(current).then(function(response){
    if(response.ok) {
        response.json().then(function(data){
            console.log(data);
            createHtml(data);
        })
    }
});

var createHtml = function(data) {

}



