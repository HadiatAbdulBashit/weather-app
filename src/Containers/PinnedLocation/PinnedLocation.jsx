import { useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

import { BsSpeedometer2, BsTrash3, BsWind } from "react-icons/bs";

import LocationContext from "../../Contexts/LocationContext";
import { Link } from "react-router-dom";

const PinnedLocation = () => {
  const { setSelectedPlace } = useContext(LocationContext);

  const [weathers, setWeathers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onCelcius, setOnCelcius] = useState(true);

  const getWeathers = async () => {
    try {
      let savedLocation = JSON.parse(localStorage.getItem("location")) || [];
      const apiKey = "0cf0fea2677b42f899690517242901"; // API key

      const weatherPromises = savedLocation.map(async (location) => {
        try {
          const forecastUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
          const response = await axios.get(forecastUrl);
          return response.data; // You can modify this line as needed
        } catch (error) {
          console.error(`Error fetching forecast for ${location}:`, error);
          return {}; // Handle the error as needed
        }
      });

      const weatherData = await Promise.all(weatherPromises);
      setWeathers(weatherData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in getWeathers:", error);
    }
  };

  const cardClick = (valueLocation, labelLocation) => {
    setSelectedPlace({ value: valueLocation, label: labelLocation });
  };

  const clickDeleteLocation = (location) => {
    let savedLocation = JSON.parse(localStorage.getItem("location")) || [];
    savedLocation = savedLocation.filter((e) => e !== location);
    localStorage.setItem("location", JSON.stringify(savedLocation));
    getWeathers();
  };

  useEffect(() => {
    setLoading(true);
    getWeathers();
  }, []);

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between gap-3">
        <h1>Pinned Location</h1>
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
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "80vh" }}
        >
          <div
            className="spinner-border"
            style={{ width: "100px", height: "100px" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : weathers.length === 0 ? (
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{ minHeight: "80vh" }}
        >
          <h1>No saved location</h1>
          <p>Pin location on <Link to={'/'}>Home Page</Link></p>
        </div>
      ) : (
        <div className="my-3 g-3 row row-cols-1 row-cols-xl-2 justify-content-center">
          {weathers.map((location, index) => (
            <div className="col" key={index}>
              <div
                className="card"
                onClick={() =>
                  cardClick(
                    `${location.location?.name} ${location.location?.region} ${location.location?.country}`.replaceAll(
                      " ",
                      "-"
                    ),
                    `${location.location?.name} - ${location.location?.region}, ${location.location?.country}`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="row g-0">
                  <div className="col-md-4" style={{ position: "relative" }}>
                    <img
                      src={location.current?.condition?.icon}
                      alt={location.current?.condition?.text}
                      width={"60%"}
                      style={{ maxWidth: "100px", minWidth: "70px", zIndex: 1 }}
                    />
                    <div
                      className="me-3 me-md-0"
                      style={{ position: "absolute", right: 0, bottom: 0 }}
                    >
                      <div className="d-flex flex-column">
                        <span className="fw-bold" style={{ fontSize: "40px" }}>
                          {onCelcius
                            ? location.current?.temp_c
                            : location.current?.temp_f}
                          °
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{`${location.location?.name} - ${location.location?.region}, ${location.location?.country}`}</h5>
                        <button
                          className="btn"
                          onClick={() =>
                            clickDeleteLocation(
                              `${location.location?.name} ${location.location?.region} ${location.location?.country}`.replaceAll(
                                " ",
                                "-"
                              )
                            )
                          }
                        >
                          <BsTrash3
                            style={{
                              width: "20px",
                              height: "100%",
                              zIndex: 20,
                            }}
                          />
                        </button>
                      </div>
                      <div className="fs-5 d-flex gap-3">
                        <span>
                          <BsSpeedometer2 className="me-1" />
                          {location.current?.humidity}%
                        </span>
                        <span>
                          <BsWind className="me-1" />
                          {onCelcius
                            ? location.current?.wind_kph
                            : location.current?.wind_mph}
                          <span className="fs-6">
                            {onCelcius ? "Km/h" : "Mp/h"}
                          </span>
                        </span>
                      </div>
                      <p className="card-text">
                        <small className="text-muted">
                          Last update{" "}
                          {moment(
                            location.current?.last_updated,
                            "YYYY-MM-DD hh:mm"
                          ).fromNow()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PinnedLocation;
