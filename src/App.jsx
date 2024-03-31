import React, { useEffect, useState } from "react";
import "./App.css";
import { API_URL } from "./consts";
import logo from "./assets/logoimage.png";
import { includesDigit } from "./utils";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [lastRequestDate, setLastRequestDate] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async () => {
    setWeatherData(null);
    setIsLoading(true);
    setError(null);
    setCity("");
    try {
      const date = new Date();
      setLastRequestDate(date.toLocaleDateString("en-GB"));
      setLastRequestTime(
        date
          .toLocaleTimeString("en-US", { hour12: false })
          .split(":")
          .slice(0, 2)
          .join(":")
      );
      const response = await fetch(`${API_URL}/weather?city=${city}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      if (data.error) {
        setError("Location not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onInputKeyDown = (event) => {
    // only if enter pressed
    if (event.keyCode === 13) {
      fetchWeather();
    }
  };

  return (
    <div className="application">
      <div className="main-content">
        <div className="padded-main-content">
          <div className="left-side">
            <img src={logo} />
            <div className="left-card">
              <div>
                <div className="app-description">
                  Use our weather app
                  <br /> to see the weather
                  <br />
                  around the world
                </div>
                <div className="citysearch">
                  <div className="search-title">City name</div>
                  <div className="input-container">
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Enter city name"
                      value={city}
                      onKeyDown={onInputKeyDown}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                      disabled={isLoading || !city || includesDigit(city)}
                      className="check-button"
                      onClick={fetchWeather}
                    >
                      Check
                    </button>
                  </div>
                </div>
              </div>
              {weatherData && !weatherData.error && (
                <div className="left-side-bottom">
                  <div className="coordinates">
                    <div>latitude {weatherData.location.lat}</div>
                    <div>longitude {weatherData.location.lon}</div>
                  </div>
                  <div>
                    accurate to {lastRequestDate} at {lastRequestTime}
                  </div>
                </div>
              )}
            </div>
          </div>
          {error && <p>{error}</p>}
          {isLoading && <p>Loading data ...</p>}
          {weatherData && !weatherData.error && (
            <div className="right-side">
              <div className="right-card">
                <div className="location-name">{weatherData.location.name}</div>
                <div className="location-country">
                  {weatherData.location.country}
                </div>
                <div className="current-time">
                  {lastRequestDate} at {lastRequestTime.split(":")[0]}:00
                </div>
                <div className="temperature">
                  {Math.floor(weatherData.current.temp_c)}°
                </div>
                <div className="condition">
                  {weatherData.current.condition.text}
                </div>
                <div className="weather-categories">
                  <div>
                    <div className="weather-categories-title">
                      precipitation
                    </div>
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
                      {Math.floor(
                        weatherData.forecast.forecastday[0].hour[13].temp_c
                      )}
                      °
                    </div>
                  </div>
                  <div>
                    <div className="hours">14:00</div>
                    <div className="degrees">
                      {Math.floor(
                        weatherData.forecast.forecastday[0].hour[14].temp_c
                      )}
                      °
                    </div>
                  </div>
                  <div>
                    <div className="hours">15:00</div>
                    <div className="degrees">
                      {Math.floor(
                        weatherData.forecast.forecastday[0].hour[15].temp_c
                      )}
                      °
                    </div>
                  </div>
                  <div>
                    <div className="hours">16:00</div>
                    <div className="degrees">
                      {Math.floor(
                        weatherData.forecast.forecastday[0].hour[16].temp_c
                      )}
                      °
                    </div>
                  </div>
                  <div>
                    <div className="hours">17:00</div>
                    <div className="degrees">
                      {Math.floor(
                        weatherData.forecast.forecastday[0].hour[17].temp_c
                      )}
                      °
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
