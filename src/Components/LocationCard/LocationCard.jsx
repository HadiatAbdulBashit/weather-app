// Module
import moment from "moment";

// Icons
import { BsSpeedometer2, BsTrash3, BsWind } from "react-icons/bs";

const LocationCard = ({ location, onCelcius, setSelectedPlace, clickDeleteLocation }) => {
  const cardClick = (valueLocation, labelLocation) => {
    setSelectedPlace({ value: valueLocation, label: labelLocation });
  };

  return (
    <div className="col">
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
                  <span className="fs-6">{onCelcius ? "Km/h" : "Mp/h"}</span>
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
  );
};

export default LocationCard;
