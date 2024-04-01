import React, { useState } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lastRequestDate, setLastRequestDate] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(null);

  return (
    <div>
      <div className="application">
        <div className="main-content">
          <div className="padded-main-content">
            <LeftSide
              weatherData={weatherData}
              setLastRequestDate={setLastRequestDate}
              setLastRequestTime={setLastRequestTime}
              setWeatherData={setWeatherData}
              lastRequestDate={lastRequestDate}
              lastRequestTime={lastRequestTime}
            />
            {weatherData && !weatherData.error && (
              <RightSide
                weatherData={weatherData}
                lastRequestDate={lastRequestDate}
                lastRequestTime={lastRequestTime}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
