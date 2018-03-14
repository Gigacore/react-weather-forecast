import React from "react";

const DetailedInfo = ({ data }) => {
  return (
    <div className="hourly">
      {data.map((item, i) => (
        <div className="hourly-info" key={i}>
          <div className="hour-temperature">
            {Math.round(item.main.temp) + "°C"}
          </div>
          <div className="hour-of-the-day">
            {new Date(item.dt * 1000).getHours() + ":00"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedInfo;
