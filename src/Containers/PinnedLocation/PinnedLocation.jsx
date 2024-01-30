import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsSpeedometer2, BsWind } from "react-icons/bs";

const PinnedLocation = () => {
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

  console.log(weathers);

  useEffect(() => {
    setLoading(true);
    getWeathers();
  }, []);

  return (
    <div className="container my-3">
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
        <h1>No data</h1>
      ) : (
        <div className="my-3 g-3 row row-cols-1 row-cols-xl-2 justify-content-center">
          {weathers.map((location, index) => (
            <div className="col" key={index}>
              <div className="card">
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
                      <div>
                        <h5 className="card-title">{`${location.location?.name} - ${location.location?.region}, ${location.location?.country}`}</h5>
                      </div>
                      <div className="fs-5 d-flex gap-3">
                        <span>
                          <BsSpeedometer2 className="me-1" />
                          {onCelcius
                            ? location.current?.humidity
                            : location.current?.mintemp_f}
                          %
                        </span>
                        <span>
                          <BsWind className="me-1" />
                          {onCelcius
                            ? location.current?.wind_kph
                            : location.current?.maxtemp_f}
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
