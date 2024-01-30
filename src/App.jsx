import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import moment from "moment";

import { BsWind, BsSpeedometer2 } from "react-icons/bs";
import { RiWaterPercentLine } from "react-icons/ri";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({ value: "auto:ip" });
  const [optionSelect, setOptionSelect] = useState([]);
  const [onCelcius, setOnCelcius] = useState(true);

  const promiseOptions = async (searchKey) => {
    try {
      const apiKey = "0cf0fea2677b42f899690517242901"; // API key
      const response = await axios.get(
        `http://api.weatherapi.com/v1/search.json?q=${
          searchKey ? searchKey : "auto:ip"
        }&key=${apiKey}`
      );

      console.log(response);

      const formattedOptions = response.data.map((location) => ({
        value: location.url,
        label: `${location.name} - ${location.region}, ${location.country}`,
      }));

      console.log(formattedOptions);

      setOptionSelect(formattedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
      setOptionSelect([]);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedPlace(selectedOption);
  };

  const handleInputChange = (inputValueSearchSelect) => {
    promiseOptions(inputValueSearchSelect ?? "auto:ip");
  };

  const getWeather = () => {
    // Link API dari weatherapi untuk menampilkan data
    const apiKey = "0cf0fea2677b42f899690517242901"; // API key
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedPlace.value}&days=6`;

    // Mengambil data ramalan cuaca saat ini dan 5 hari ke depan
    axios
      .get(forecastUrl)
      .then((response) => {
        setForecast(response.data.forecast.forecastday);
        setCurrentWeather(response.data.current);
        setLocation(response.data.location);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching forecast:", error));
  };

  useEffect(() => {
    getWeather();
  }, [selectedPlace]);

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
            <Select
              value={selectedPlace}
              onChange={handleChange}
              onInputChange={handleInputChange}
              placeholder="Type to search a location"
              isSearchable
              options={optionSelect}
              className="search-navbar"
            />
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
      <div className="container my-3">
        <div>
          <div className="d-flex justify-content-between">
            <h1>{`${location.name} - ${location.region}, ${location.country}`}</h1>
            <div class="btn-group" style={{ height: "50px" }} role="group">
              <button
                type="button"
                class={
                  "btn btn-outline-secondary" + (onCelcius ? " active" : "")
                }
                onClick={() => setOnCelcius(true)}
              >
                C°
              </button>
              <button
                type="button"
                class={
                  "btn btn-outline-secondary" + (onCelcius ? "" : " active")
                }
                onClick={() => setOnCelcius(false)}
              >
                F°
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center flex-column">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: "100%" }}
            >
              <div className="d-flex flex-column">
                <span className="fs-1 fw-bold">
                  {onCelcius ? currentWeather.temp_c : currentWeather.temp_f}°
                </span>
                <span className="fs-5">
                  {onCelcius
                    ? forecast[0]?.day?.mintemp_c
                    : forecast[0]?.day?.mintemp_f}
                  °/
                  {onCelcius
                    ? forecast[0]?.day?.maxtemp_c
                    : forecast[0]?.day?.maxtemp_f}
                  °
                </span>
              </div>
              <img
                src={currentWeather.condition?.icon}
                alt={currentWeather.condition?.text}
                width={"50%"}
                style={{ maxWidth: "200px" }}
              />
              <span className="fs-5">
                RealFell{" "}
                {onCelcius
                  ? currentWeather.feelslike_c
                  : currentWeather.feelslike_f}
                °
              </span>
            </div>
            <span className="fs-2 text-capitalize fw-bold">
              {currentWeather.condition?.text}
            </span>
          </div>
          <div className="mt-5 d-flex justify-content-between fs-5">
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-1 flex-column flex-md-row">
                <BsWind /> Wind
                <div>
                  {onCelcius
                    ? currentWeather.wind_kph
                    : currentWeather.wind_mph}
                  <span className="fs-6">{onCelcius ? "Km/h" : "Mp/h"}</span>{" "}
                  {currentWeather.wind_dir}
                </div>
              </div>
              <div className="d-flex align-items-center gap-1 flex-column flex-md-row">
                <BsSpeedometer2 />
                Preassure
                <div>
                  {onCelcius
                    ? currentWeather.pressure_mb
                    : currentWeather.pressure_in}
                  <span className="fs-6">{onCelcius ? "mb" : "in"}</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-1 flex-column flex-md-row">
                <RiWaterPercentLine /> Humidity
                <div>
                  {currentWeather.humidity}
                  <span className="fs-6">%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center gap-1 flex-column flex-md-row">
                UV<span className="fs-6">index</span> {currentWeather.uv}
              </div>
            </div>
          </div>
        </div>
        <div className="my-3 g-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
          {forecast.slice(1).map((day) => (
            <div className="col" key={day.date}>
              <div className="card text-center">
                <div className="card-header text-uppercase">
                  {moment(day.date).format("dddd")}
                </div>
                <div className="card-body d-flex justify-content-center">
                  <img
                    src={currentWeather.condition?.icon}
                    alt={currentWeather.condition?.text}
                    width={"100px"}
                  />
                  <div className="text-muted d-flex justify-content-center flex-column me-3">
                    <span>
                      {onCelcius ? day.day.maxtemp_c : day.day.maxtemp_f}°
                    </span>
                    <span>
                      {onCelcius ? day.day.mintemp_c : day.day.mintemp_f}°
                    </span>
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
