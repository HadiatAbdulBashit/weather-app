import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import moment from "moment";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({ value: "auto:ip" });
  const [optionSelect, setOptionSelect] = useState([]);

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
        <h1>{`${location.name} - ${location.region}, ${location.country}`}</h1>

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
        <div className="my-3 g-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
          {forecast.slice(1).map((day) => (
            <div className="col" key={day.date}>
              <div className="card text-center">
                <div className="card-header">
                {moment(day.date).format("dddd")}
                </div>
                <div className="card-body">
                  <img
                    src={currentWeather.condition?.icon}
                    alt={currentWeather.condition?.text}
                    width={'100px'}
                  />
                </div>
                <div className="card-footer text-muted d-flex justify-content-between">
                  <span>
                    Max {day.day.maxtemp_c} °C
                  </span>
                  <span>
                    Min {day.day.mintemp_c} °C
                  </span>
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
