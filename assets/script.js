let city = document.querySelector('.weather_city');
let date = document.querySelector('.weather_indicator--date>.value');
let humidity = document.querySelector('.weather_indicator--humidity>.value');
let wind = document.querySelector('.weather_indicator--wind>.value');
let pressure = document.querySelector('.weather_indicator--pressure>.value');
let temperature = document.querySelector(".weather_indicator--temperature>.value");


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

//getWeatherByCityName("New York");
searchinp.addEventListener("keydwon", async (e) => {
    if (e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchinp.value);
        //  console.log(weather);
        weatherdisplay(weather);
        showdate();
        //  makeList();

    }
})


let weatherdisplay = (data) => {
    console.log(data);

    city.textContent = data.name + ',' + data.sys.country;
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    wind.textContent = data.wind.speed;
    temperature.textContent = data.main.temp;
}

function showdate() {
    var currentDate = dayjs().format("dddd,MMMM D");
    date.textContent = currentDate;
    console.log(currentDate);

}



function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    console.log(listItem);
    $(".list").append(listItem);
}




