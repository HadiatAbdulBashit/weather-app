// Module
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

// Context
import LocationContext from "../../Contexts/LocationContext";

// Handler
import handlers from "./Navbar.handler";
// Inisialize handlers
const { getSuggestLocation } = handlers;

const Navbar = () => {
  const { selectedPlace, setSelectedPlace } = useContext(LocationContext);
  const [optionSelect, setOptionSelect] = useState([]);
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const promiseOptions = async (searchKey) => {
    try {
      const response = await getSuggestLocation(searchKey);

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
    navigate("/");
  };

  const handleInputChange = (inputValueSearchSelect) => {
    promiseOptions(inputValueSearchSelect ?? "auto:ip");
  };

  useEffect(() => {
    promiseOptions();
  }, []);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <nav
      className="navbar navbar-expand-md nav-tabs"
      style={{
        background:
          "linear-gradient(277deg, rgba(255,255,255,0.5) 0%, rgba(223,238,255,0.4) 100%)",
      }}
    >
      <div className="container-md">
        <Link className="navbar-brand fw-bold" to={"/"}>
          Weather App
        </Link>
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
              <Link
                className={"nav-link ps-2" + (url === "/" ? " active" : "")}
                to={"/"}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={"nav-link ps-2" + (url === "/pin" ? " active" : "")}
                to={"/pin"}
              >
                Pin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
