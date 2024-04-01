import React from "react";

const RightSide = ({ weatherData, lastRequestDate, lastRequestTime }) => {
  return (
    <div className="right-side">
      <div className="right-card">
        <div className="location-name">{weatherData.location.name}</div>
        <div className="location-country">{weatherData.location.country}</div>
        <div className="current-time">
          {lastRequestDate} at {lastRequestTime.split(":")[0]}:00
        </div>
        <div className="temperature">
          {Math.floor(weatherData.current.temp_c)}°
        </div>
        <div className="condition">{weatherData.current.condition.text}</div>
        <div className="weather-categories">
          <div>
            <div className="weather-categories-title">precipitation</div>
            <div className="weather-categories-value">
              {weatherData.current.precip_mm} mm
            </div>
          </div>
          <div>
            <div className="weather-categories-title">humidity</div>
            <div className="weather-categories-value">
              {weatherData.current.humidity}%
            </div>
          </div>
          <div>
            <div className="weather-categories-title">wind</div>
            <div className="weather-categories-value">
              {weatherData.current.wind_kph} km/h
            </div>
          </div>
        </div>
        <div className="hours-of-day">
          <div>
            <div className="hours">13:00</div>
            <div className="degrees">
              {Math.floor(weatherData.forecast.forecastday[0].hour[13].temp_c)}°
            </div>
          </div>
          <div>
            <div className="hours">14:00</div>
            <div className="degrees">
              {Math.floor(weatherData.forecast.forecastday[0].hour[14].temp_c)}°
            </div>
          </div>
          <div>
            <div className="hours">15:00</div>
            <div className="degrees">
              {Math.floor(weatherData.forecast.forecastday[0].hour[15].temp_c)}°
            </div>
          </div>
          <div>
            <div className="hours">16:00</div>
            <div className="degrees">
              {Math.floor(weatherData.forecast.forecastday[0].hour[16].temp_c)}°
            </div>
          </div>
          <div>
            <div className="hours">17:00</div>
            <div className="degrees">
              {Math.floor(weatherData.forecast.forecastday[0].hour[17].temp_c)}°
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
