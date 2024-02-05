// Module
import { useContext, useEffect, useState } from "react";
import moment from "moment";

// Icons
import {
  BsWind,
  BsSpeedometer2,
  BsPinAngle,
  BsPinAngleFill,
} from "react-icons/bs";
import { RiWaterPercentLine } from "react-icons/ri";

// Component
import Loading from "../../Components/Loading";
import FailApi from "../../Components/FailApi";

// Context
import LocationContext from "../../Contexts/LocationContext";

// Handler
import handlers from "./Home.handler";
import DayCard from "../../Components/DayCard/DayCard";
import HourCard from "../../Components/HourCard/HourCard";
// Inisialize handlers
const { getForecast } = handlers;

const Home = () => {
  const { selectedPlace } = useContext(LocationContext);

  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState({});
  const [onCelcius, setOnCelcius] = useState(true);
  const [isPinLocation, setIsPinLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDays, setShowDays] = useState(true);

  const getWeather = async () => {
    try {
      const response = await getForecast(selectedPlace.value);
      setForecast(response.data.forecast.forecastday);
      setCurrentWeather(response.data.current);
      setLocation(response.data.location);
      isPin(response.data.location);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setCurrentWeather(null);
      console.error("Error fetching forecast:", error);
    }
  };

  const clickPinLocation = () => {
    let savedLocation = JSON.parse(localStorage.getItem("location")) || [];
    const locationName =
      `${location.name} ${location.region} ${location.country}`.replaceAll(
        " ",
        "-"
      );
    if (savedLocation.includes(locationName)) {
      savedLocation = savedLocation.filter((e) => e !== locationName);
    } else {
      savedLocation.push(locationName);
    }
    localStorage.setItem("location", JSON.stringify(savedLocation));
    isPin(location);
  };

  const isPin = (location) => {
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
  };

  useEffect(() => {
    setLoading(true);
    getWeather();
  }, [selectedPlace]);

  return (
    <div className="container my-3">
      {loading ? (
        <Loading />
      ) : currentWeather === null ? (
        <FailApi />
      ) : (
        <>
          {/* Detail weather forecast right now */}
          <div>
            <div className="d-flex justify-content-between gap-3">
              <div className="d-flex gap-3">
                <h1>{`${location.name} - ${location.region}, ${location.country}`}</h1>
                <button className="btn" onClick={() => clickPinLocation()}>
                  {isPinLocation ? (
                    <BsPinAngleFill style={{ width: "30px", height: "100%" }} />
                  ) : (
                    <BsPinAngle style={{ width: "30px", height: "100%" }} />
                  )}
                </button>
              </div>
              <div
                className="btn-group"
                style={{ height: "50px", zIndex: 0 }}
                role="group"
              >
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
          {/* Detail per day and per hour */}
          <div className="mt-3">
            <ul
              className="nav nav-tabs justify-content-center"
              style={{ border: 0 }}
            >
              <li className="nav-item">
                <button
                  className={
                    "nav-link text-black" + (showDays ? " active" : "")
                  }
                  onClick={() => setShowDays(true)}
                >
                  Days
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={
                    "nav-link text-black" + (showDays ? "" : " active")
                  }
                  onClick={() => setShowDays(false)}
                >
                  Hours
                </button>
              </li>
            </ul>
            <div
              style={{
                border: "1px solid #ffffff50",
                padding: "15px",
                borderRadius: "15px",
                backgroundColor: "#ffffff30",
              }}
            >
              <div className="g-3 row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
                {showDays
                  ? forecast
                      .slice(1)
                      .map((day) => (
                        <DayCard
                          day={day}
                          onCelcius={onCelcius}
                          key={day.date}
                        />
                      ))
                  : forecast[0].hour
                      ?.slice(moment().format("H"))
                      .map((hour) => (
                        <HourCard
                          hour={hour}
                          onCelcius={onCelcius}
                          key={hour.time}
                        />
                      ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
