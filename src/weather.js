const fetch = require('node-fetch-commonjs');
const dotenv = require('dotenv');
const API_KEY = process.env.WEATHER_API_KEY;

async function fetchForecast(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Error fetching forecast data. Please check the city name and try again.');

    const data = await response.json();
    const myData = data.list;

    let weatherMessage = '';
    const today = new Date().getDate();
    let currentDay = today;

    myData.forEach((weth) => {
        const dayOfMonth = new Date(weth.dt * 1000).getDate();
        if (dayOfMonth !== currentDay) {
            const options = { weekday: 'long' };
            const dayName = new Date(weth.dt * 1000).toLocaleDateString('en-US', options);
            const temp = weth.main.temp.toFixed(0);
            weatherMessage += `${dayName} 🌤️  ${temp}°C\n`;
            currentDay = dayOfMonth;
        }
    });

    return weatherMessage;
}

async function fetchWeather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Error fetching weather data. Please check the city name and try again.');

    const data = await response.json();
    const temperature = data.main.temp.toFixed();
    const description = data.weather[0].description;
    return `The Weather 🌤️ in ${cityName} is currently ${temperature} °C with ${description}.`;
}

module.exports = { fetchForecast, fetchWeather };
