import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import LocationContext from "../../Contexts/LocationContext";

const Navbar = () => {
  const { selectedPlace, setSelectedPlace } = useContext(LocationContext);
  const [optionSelect, setOptionSelect] = useState([]);

  const promiseOptions = async (searchKey) => {
    try {
      const apiKey = "0cf0fea2677b42f899690517242901"; // API key
      const response = await axios.get(
        `http://api.weatherapi.com/v1/search.json?q=${
          searchKey ? searchKey : "auto:ip"
        }&key=${apiKey}`
      );

      const formattedOptions = response.data.map((location) => ({
        value: location.url,
        label: `${location.name} - ${location.region}, ${location.country}`,
      }));

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

  useEffect(() => {
    promiseOptions();
  }, []);

  return (
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
  );
};

export default Navbar;
