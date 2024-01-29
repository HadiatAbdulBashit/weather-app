import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import moment from "moment";

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
    <>
      <nav
        className="navbar navbar-expand-md"
        style={{
          background:
            "linear-gradient(277deg, rgba(255,255,255,0.5) 0%, rgba(223,238,255,0.4) 100%)",
        }}
      >
        <div className="container-md">
          <a className="navbar-brand fw-bold" href="/">
            Weather App
          </a>
          <div className="d-flex gap-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="City name, US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude"
                aria-label="City name, US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude"
              />
              <button className="btn btn-secondary" type="button">
                Search
              </button>
            </div>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
              data-bs-target="#navbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <h1>Weather App</h1>

        <h2>Today's Weather</h2>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  {currentWeather.condition?.text}
                </div>
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
          {forecast.slice(1).map((day) => (
            <div className="col" key={day.date}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    {moment(day.date).format("dddd")}
                  </div>
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
    </>
  );
}

export default App;
