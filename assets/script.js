let searchInput = $('#search-input');
let currentApi = 'http://api.openweathermap.org/data/2.5/weather?q=';
let newApi = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let uvApi = 'http://api.openweathermap.org/data/2.5/uvi?';
let apiKey = 'f0ab57e4693bb4a80535f0b3185f2865';

function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let conditions = data.list[0].weather[0].main;
            let description = data.list[0].weather[0].description;
            $('#main-info').append(conditions + "/" + description);

            let temp = data.list[0].main.temp;
            $('#temperature').append("Temperature: " + temp + " °F");

            let humidity = data.list[0].main.humidity;
            $('#humidity').append("Humidity: " + humidity + " %");
            
            let main = data.list[0].main;
            
            let wind = data.list[0].wind.speed;
            $('#wind-speed').append("Wind Speed: " + wind + " mph");
            
            let location = data.city.name;
            let date = data.list[0].dt_txt;
            $('#location').append(location + " " + date);
            
            let icon = data.list[0].weather[0].icon;
            let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            // $('#weather-icon').append(icon);
            $('#icon-img').attr('src', iconurl);

            let lat= data.city.coord.lat;
            let lon= data.city.coord.lon;
            getUvApi(lat, lon);

            console.log(lat);
            console.log(lon);

            console.log(conditions);
            console.log(main);
            console.log(wind);
            console.log(icon);
        });
    
}

function getUvApi(lat, lon) {
    let latParam = 'lat=' + lat;
    let lonParam = 'lon=' + lon;
    let uvApiString = uvApi + latParam + '&' + lonParam + '&appid=' + apiKey;
    fetch(uvApiString)
         .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        let uvIndex = data.value;
        $('#uv-index').append("UV Index: " + uvIndex);  
});
}

$('.btn').on('click', function (event) {
    event.preventDefault();
    let city = $('#search-input').val();
    let finalCurrentWeather = newApi + city + "&appid=" + apiKey + "&units=imperial";
    getCurrentApi(finalCurrentWeather);
})