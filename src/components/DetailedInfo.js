import React from "react";

const DetailedInfo = ({ data }) => {

  const displayMoreInfo = (item, i) => {
    return (
      <div className="hourly-info" key={i}>
        <div className="hour-temperature">
          {Math.round(item.main.temp) + "°C"}
        </div>
        <div className="hour-of-the-day">
          {new Date(item.dt * 1000).getHours() + ":00"}
        </div>
      </div>
    );
  };

  const getHour = time => time ? new Date(time).getHours() : new Date().getHours();
  const getDate = date => date ? new Date(date).getDate() : new Date().getDate();

  return (
    <div className="hourly">
      {data.map((item, i) => (
        (getHour(item.dt * 1000) > getHour() && getDate(item.dt * 1000) === getDate()) ? (
          displayMoreInfo(item, i)
         ) : getHour(item.dt * 1000) >= 5 && getHour(item.dt * 1000) <= 23 ? (
            displayMoreInfo(item, i)
         ) : null
      ))}
    </div>
  );
};

export default DetailedInfo;
