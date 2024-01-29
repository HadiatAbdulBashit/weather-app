import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    // Link API dari weatherapi untuk menampilkan data
    const apiKey = "0cf0fea2677b42f899690517242901"; // API key
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&days=6`;

    // Mengambil data ramalan cuaca saat ini dan 5 hari ke depan
    axios
      .get(forecastUrl)
      .then((response) => {
        setForecast(response.data.forecast.forecastday);
        setCurrentWeather(response.data.current);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching forecast:", error));
  }, []);

  return (
    <div className="container">
      <h1>Weather App</h1>

      <h2>Today's Weather</h2>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">{currentWeather.condition?.text}</div>
              <img
                src={currentWeather.condition?.icon}
                alt={currentWeather.condition?.text}
              />
              <div>
                Temperature: {currentWeather.temp_c} °C
                <br />
                Humidity: {currentWeather.humidity}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>5-Day Forecast</h2>
      <div className="row">
        {forecast.map((day) => (
          <div className="col" key={day.date}>
            <div className="card">
              <div className="card-body">
                <div className="card-title">{day.date}</div>
                <img
                  src={currentWeather.condition?.icon}
                  alt={currentWeather.condition?.text}
                />
                <div>
                  Max Temp: {day.day.maxtemp_c} °C
                  <br />
                  Min Temp: {day.day.mintemp_c} °C
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
