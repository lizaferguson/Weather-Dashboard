let searchInput = $('#search-input');
let currentApi = 'http://api.openweathermap.org/data/2.5/weather?q=';
let newApi = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let apiKey = 'f0ab57e4693bb4a80535f0b3185f2865';

function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let conditions = data.list[0].weather[0].main;
            $('#main-info').append(conditions);
            
            let main = data.list[0].main;
            let wind = data.list[0].wind;
            
            let icon = data.list[0].weather[0].icon;
            $('#weather-icon').append(icon);

            console.log(conditions);
            console.log(main);
            console.log(wind);
            console.log(icon);
        });
    
}



$('.btn').on('click', function (event) {
    event.preventDefault();
    let city = $('#search-input').val();
    let finalCurrentWeather = newApi + city + "&appid=" + apiKey + "&units=imperial";
    getCurrentApi(finalCurrentWeather);
})
