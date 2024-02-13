const inputbox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humdity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector(`.location-not-found`);
const weather_body =document.querySelector(`.weather-body`);
async function checkWeather(city){
    const api_key = "18e4cabd811ffd7ba333e325c66b6e74";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json()); 

    if(weather_data.cod === '404'){
        location_not_found.style.display= "flex";
        weather_body.style.display = "none";
        console.log("ERROR");
        return;
    }
    location_not_found.style.display= "none";
        weather_body.style.display = "flex";

    temperature.innerHTML =  `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML =`${weather_data.weather[0].description}`;
    humdity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    switch(weather_data.weather[0].main){
        case'Clouds':
        weather_img.src = "cloud.png"
        break;
        case'Rain':
        weather_img.src = "rain.png"
        break;
        case'Clear':
        weather_img.src = "clear.png"
        break;
        case'Snow':
        weather_img.src = "snow.png";
        break;
        case'Mist':
        weather_img.src = "mist.png";
        break;
    }
}
inputbox.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        if(inputbox.value.length === 0) return
        checkWeather(inputbox.value);
    }
})

