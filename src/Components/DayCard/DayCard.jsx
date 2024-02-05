import moment from "moment";

const DayCard = ({ day, onCelcius }) => {
  return (
    <div className="col">
      <div className="card text-center">
        <div className="card-header text-uppercase">
          {moment(day.date).format("dddd")}
        </div>
        <div className="card-body d-flex justify-content-center">
          <img
            src={day.day.condition?.icon}
            alt={day.day.condition?.text}
            width={"100px"}
          />
          <div className="text-muted d-flex justify-content-center flex-column me-3">
            <span>{onCelcius ? day.day.maxtemp_c : day.day.maxtemp_f}°</span>
            <span>{onCelcius ? day.day.mintemp_c : day.day.mintemp_f}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
