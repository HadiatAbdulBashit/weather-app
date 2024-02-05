// Module
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Component
import Loading from "../../Components/Loading";
import FailApi from "../../Components/FailApi";
import LocationCard from "../../Components/LocationCard";

// Context
import LocationContext from "../../Contexts/LocationContext";

// Handler
import handlers from "./PinnedLocation.handler";
// Inisialize handlers
const { getCurrentWeather } = handlers;

const PinnedLocation = () => {
  const { setSelectedPlace } = useContext(LocationContext);

  const [weathers, setWeathers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onCelcius, setOnCelcius] = useState(true);

  const getWeathers = async () => {
    try {
      let savedLocation = JSON.parse(localStorage.getItem("location")) || [];

      const weatherPromises = savedLocation.map(async (location) => {
        try {
          const response = await getCurrentWeather(location);
          return response.data;
        } catch (error) {
          console.error(
            `Error fetching current weather for ${location}:`,
            error
          );
          return null; // Handle the error as needed
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

  const clickDeleteLocation = (location) => {
    let savedLocation = JSON.parse(localStorage.getItem("location")) || [];
    savedLocation = savedLocation.filter((e) => e !== location);
    localStorage.setItem("location", JSON.stringify(savedLocation));
    setLoading(true);
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
        <Loading />
      ) : weathers.length === 0 ? (
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{ minHeight: "65vh" }}
        >
          <h1>No saved location</h1>
          <p>
            Pin location on <Link to={"/"}>Home Page</Link>
          </p>
        </div>
      ) : weathers[0] === null ? (
        <FailApi />
      ) : (
        <div className="my-3 g-3 row row-cols-1 row-cols-xl-2 justify-content-center">
          {weathers.map((location) => (
            <LocationCard
              location={location}
              key={`${location.location.lat} - ${location.location.lon}`}
              onCelcius={onCelcius}
              setSelectedPlace={setSelectedPlace}
              clickDeleteLocation={clickDeleteLocation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PinnedLocation;
