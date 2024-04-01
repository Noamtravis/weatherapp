import React, { useState } from "react";
import logo from "../assets/logoimage.png";
import { includesDigit } from "../utils";
import { API_URL } from "../consts";

const LeftSide = ({
  weatherData,
  setWeatherData,
  setLastRequestDate,
  setLastRequestTime,
  lastRequestTime,
  lastRequestDate,
}) => {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onInputKeyDown = (event) => {
    // only if enter pressed
    if (event.keyCode === 13) {
      fetchWeather();
    }
  };

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

  return (
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
        {error && <p>{error}</p>}
        {isLoading && <p>Loading data ...</p>}
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
  );
};

export default LeftSide;
