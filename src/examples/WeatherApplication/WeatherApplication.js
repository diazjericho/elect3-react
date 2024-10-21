import React, { useState } from 'react';
import './WeatherApplication.css';

function WeatherApplication() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getWeather = () => {
        const apiKey = 'e7ba4b789d1a0b51afd74e99ca7405d4';
        if (!city) {
            setErrorMessage('Please enter a city name.');
            setWeatherData(null);
            return;
        }
        setErrorMessage('');
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                const countryNames = {
                    US: 'United States', CA: 'Canada', GB: 'United Kingdom', AU: 'Australia',
                    FR: 'France', DE: 'Germany', IN: 'India', JP: 'Japan', KR: 'South Korea', PH: 'Philippines'
                };
                const countryName = countryNames[data.sys.country] || data.sys.country;
                setWeatherData({
                    cityName: `${data.name}, ${countryName}`,
                    temperature: `${data.main.temp}°C`,
                    feelsLike: `Feels like: ${data.main.feels_like}°C`,
                    condition: `${data.weather[0].main} (${data.weather[0].description})`,
                    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                    humidity: `Humidity: ${data.main.humidity}%`,
                    visibility: `Visibility: ${data.visibility / 1000} km`,
                    fullTemperature: `Min / Max Temperature: ${data.main.temp_min}°C - ${data.main.temp_max}°C`,
                    windSpeed: `Wind Speed: ${data.wind.speed} m/s`,
                    sunrise: `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`,
                    sunset: `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`
                });
            })
            .catch(error => {
                setErrorMessage('Invalid city name or failed request. Please try again.');
                setWeatherData(null);
            });
    };

    return (
        <div className="weather-container">
            <h1>SkyCaster: Weather Application</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={getWeather}>Get Weather</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {weatherData && (
                <div className="weather-result">
                    <div className="row">
                        <div className="col">
                            <img src={weatherData.icon} alt="Weather Icon" />
                            <h3>{weatherData.condition}</h3>
                            <h6>{weatherData.cityName}</h6>
                            <h6>{weatherData.temperature}</h6>
                        </div>
                        <div className="col">
                            <h4>Other details for this city:</h4>
                            <h6>{weatherData.humidity}</h6>
                            <h6>{weatherData.windSpeed}</h6>
                            <h6>{weatherData.visibility}</h6>
                            <h6>{weatherData.fullTemperature}</h6>
                            <h6>{weatherData.sunrise}</h6>
                            <h6>{weatherData.sunset}</h6>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherApplication;
