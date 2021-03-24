let searchInput = $('#search-input');
// let currentApi = 'http://api.openweathermap.org/data/2.5/weather?q=';
let newApi = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let uvApi = 'https://api.openweathermap.org/data/2.5/uvi?';
let apiKey = 'f0ab57e4693bb4a80535f0b3185f2865';

//creating function to access the openweathermap api
function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //getting weather conditions/description data and appending to html
            let conditions = data.list[0].weather[0].main;
            let description = data.list[0].weather[0].description;
            $('#main-info').append(conditions + "/" + description);

            //getting temperature data and appending to html
            let temp = data.list[0].main.temp;
            $('#temperature').append("Temperature: " + temp + " °F");

            //getting humidity data and appending to html
            let humidity = data.list[0].main.humidity;
            $('#humidity').append("Humidity: " + humidity + " %");
            
            //getting wind data and appending to html
            let wind = data.list[0].wind.speed;
            $('#wind-speed').append("Wind Speed: " + wind + " mph");
            
            //getting city name and appending to html
            let location = data.city.name;
            let date = data.list[0].dt_txt;
            $('#location').append(location + " " + date);
            
            //getting icon id and appending to page
            let icon = data.list[0].weather[0].icon;
            let iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
            $('#icon-img').attr('src', iconurl);

            //getting latitude and longitude data to use in second function
            let lat= data.city.coord.lat;
            let lon= data.city.coord.lon;
            getUvApi(lat, lon);

            for (i = 0; i < 5; i++) {
                let forcastDay = data.list[i].dt_txt;
                $('#forcast-date' + '-' + (i+1).toString()).append(forcastDay);
            }



            console.log(lat);
            console.log(lon);
            console.log(conditions);
            console.log(wind);
            console.log(icon);
        });
    
}

//creating function to access data from UV openweathermap api
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
        //getting UV value data and appending to html    
        let uvIndex = data.value;
        $('#uv-index').append("UV Index: " + uvIndex);  
});
}

//creating click event to access data on click based upon user input
$('.btn').on('click', function (event) {
    event.preventDefault();
    let city = $('#search-input').val();
    localStorage.setItem('city', city);
    let finalCurrentWeather = newApi + city + "&appid=" + apiKey + "&units=imperial";
    getCurrentApi(finalCurrentWeather);
})