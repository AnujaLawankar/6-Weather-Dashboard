let city = document.querySelector('.weather_city');
let date = document.querySelector('.weather_indicator--date>.value');
let humidity = document.querySelector('.weather_indicator--humidity>.value');
let wind = document.querySelector('.weather_indicator--wind>.value');
let pressure = document.querySelector('.weather_indicator--pressure>.value');
let temperature = document.querySelector(".weather_indicator--temperature>.value");
let weatherIcon = document.querySelector('.weather_image');
let forecastElements = document.querySelectorAll('.weather_forecast_item');
let searchinp = document.querySelector('#inputtag');




let weatherAPIKey = "cefe35c460e97cd8334d1bdfbaf225e7";
let weatherBaseEndpoint = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + weatherAPIKey;



let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();

    // console.log(weather);
    return weather;


}



let searchBtn = document.querySelector('#serach-btn');

searchBtn.addEventListener('click', async () => {

    let weather = await getWeatherByCityName(searchinp.value);
    weatherdisplay(weather, searchinp.value);
    showdate();
    storeSearch();
    makeList();






    var lastCity = localStorage.getItem("city");

    console.log(lastCity);
    // let weatherForecast = await getWeatherForecastByCityName(searchinp.value);
    // displayWeatherForecast(weatherForecast);

});



function storeSearch() {
    localStorage.setItem("city", searchinp.value);
    console.log(searchinp.value);
}


let weatherdisplay = (data, cityname) => {
    console.log(data);

    city.textContent = data.name + '' + ',' + '' + data.sys.country;
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    wind.textContent = data.wind.speed;
    temperature.textContent = data.main.temp;
    // Get the weather icon code from the data
    const weatherIconCode = data.weather[0].icon;

    // Set the source of the weather icon image to the URL of the weather icon image
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;


    getWeatherForecastByCityName(cityname);


}

function showdate() {
    var currentDate = dayjs().format("dddd,MMMM D");
    date.textContent = currentDate;
    console.log(currentDate);

}


function makeList() {


    let listItem = $("<li>").addClass("list-group").text(searchinp.value);
    listItem.on('click', async function (event) {


        let weather = await getWeatherByCityName(event.target.textContent);
        weatherdisplay(weather, event.target.textContent);
        showdate();


    })


    console.log(listItem);
    $(".list").append(listItem);




    document.querySelector("#inputtag").value = "";


}





let forecastAPIKey = "cefe35c460e97cd8334d1bdfbaf225e7";
let forecastBaseEndpoint = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" + forecastAPIKey;

console.log(forecastAPIKey);

console.log(forecastBaseEndpoint);

let getWeatherForecastByCityName = async (city) => {
    let endpoint = forecastBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weatherForecast = await response.json();

    console.log(weatherForecast);



    // Loop through the forecast data for the next 5 unique days
    let forecastItems = document.querySelectorAll('.weather_forecast_item');
    let uniqueDays = []; // array to store the unique forecast dates
    for (let i = 0; i < weatherForecast.list.length; i++) {
        let forecast = weatherForecast.list[i];
        let forecastDate = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        // check if forecast date is already displayed
        if (!uniqueDays.includes(forecastDate)) {
            uniqueDays.push(forecastDate); // add forecast date to unique days array
            let index = uniqueDays.indexOf(forecastDate); // get index of the unique forecast date
            if (index < 5) { // display data for next 5 unique days only
                // Display the forecast data for the current day
                forecastItems[index].querySelector('.weather_forecast--date .value').textContent = forecastDate;
                forecastItems[index].querySelector('.weather_forecast--humidity .value').textContent = forecast.main.humidity + '';
                forecastItems[index].querySelector('.weather_forecast--wind .value').textContent = `${forecast.wind.speed} `;
                forecastItems[index].querySelector('.weather_forecast--pressure .value').textContent = `${forecast.main.pressure} `;
                forecastItems[index].querySelector('.weather_image').src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
            } else {
                break; // exit loop if data for next 5 unique days has been displayed
            }
        }
    }
}