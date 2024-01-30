import { useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

import {
  BsWind,
  BsSpeedometer2,
  BsPinAngle,
  BsPinAngleFill,
} from "react-icons/bs";
import { RiWaterPercentLine } from "react-icons/ri";

import LocationContext from "../../Contexts/LocationContext";

const Home = () => {
  const { selectedPlace } = useContext(LocationContext);

  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState({});
  const [onCelcius, setOnCelcius] = useState(true);
  const [isPinLocation, setIsPinLocation] = useState("");

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
        // console.log(response.data);
      })
      .catch((error) => console.error("Error fetching forecast:", error));
  };

  const clickPinLocation = () => {
    let savedLocation = JSON.parse(localStorage.getItem("location")) || [];
    const locationName =
      `${location.name} ${location.region} ${location.country}`.replaceAll(
        " ",
        "-"
      );
    if (savedLocation.includes(locationName)) {
      savedLocation = savedLocation.filter(e => e !== locationName)
      setIsPinLocation(true);
    } else {
      savedLocation.push(locationName);
      setIsPinLocation(false);
    }
    localStorage.setItem("location", JSON.stringify(savedLocation));
  };

  useEffect(() => {
    getWeather();
    const savedLocation = JSON.parse(localStorage.getItem("location")) || [];
    const locationName =
      `${location.name} ${location.region} ${location.country}`.replaceAll(
        " ",
        "-"
      );
    if (savedLocation.includes(locationName)) {
      setIsPinLocation(true);
    } else {
      setIsPinLocation(false);
    }
  }, [selectedPlace]);

  return (
    <div className="container my-3">
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3">
            <h1>{`${location.name} - ${location.region}, ${location.country}`}</h1>
            <button className="btn" onClick={() => clickPinLocation()}>
              {isPinLocation ? (
                <BsPinAngle style={{ width: "30px", height: "100%" }} />
              ) : (
                <BsPinAngleFill style={{ width: "30px", height: "100%" }} />
              )}
            </button>
          </div>
          <div className="btn-group" style={{ height: "50px" }} role="group">
            <button
              type="button"
              className={
                "btn btn-outline-secondary" + (onCelcius ? " active" : "")
              }
              onClick={() => setOnCelcius(true)}
            >
              C°
            </button>
            <button
              type="button"
              className={
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
                {onCelcius ? currentWeather.wind_kph : currentWeather.wind_mph}
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
  );
};

export default Home;
