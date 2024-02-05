import moment from "moment";

const HourCard = ({ hour, onCelcius }) => {
  return (
    <div className="col" key={hour.time}>
      <div className="card text-center">
        <div className="card-header text-uppercase">
          {moment(hour.time).format("LT")}
        </div>
        <div className="card-body d-flex justify-content-center">
          <img
            src={hour.condition?.icon}
            alt={hour.condition?.text}
            width={"100px"}
          />
          <div className="text-muted d-flex justify-content-center flex-column me-3">
            <span>{onCelcius ? hour.temp_c : hour.temp_f}°</span>
            <span>{onCelcius ? hour.feelslike_c : hour.feelslike_f}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourCard;
