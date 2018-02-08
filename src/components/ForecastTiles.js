import React from "react";

const ForeCastTiles = ({ forecasts }) => {

  // Groups data by date and returns an array of 5-day forecast
  const groupByDays = data => {
    const sortByDate = data.reduce(function (obj, item) {
      const forecastDate = item.dt_txt.substr(0,10);
    
      obj[forecastDate] = obj[forecastDate] || [];
      obj[forecastDate].push(item);
      return obj;
    }, {});

    const grouppedForecast = Object.keys(sortByDate).map(key => {
      return {day: key, forecasts: sortByDate[key]};
    });
    
    return grouppedForecast;
  }

  // Returns week of the day
  const getDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const day = new Date(data.forecasts[0].dt * 1000).getDay();
    
    return daysOfWeek[day];
  }

  // Fetches the icon using the icon code available in the forecast data.
  const getIcon = data => {
    const icon = `http://openweathermap.org/img/w/${data.forecasts[0].weather[0].icon}.png`;
    return icon;
  }
  
  // Gets the Minimum and Maximum temperatures of the day.
  const getInfo = data => {
    let max = new Array;
    let min = new Array;
    let humidity = new Array;

    data.forecasts.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.min(...min),
      max: Math.max(...max),
    };

    const avgHumdity = humidity.reduce((prev, next) => prev + next) / humidity.length;

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
        </div>
        <div className="more-info">
          {`Avg. Humidity: ${Math.floor(avgHumdity)}%`}
        </div>
      </div>
    );
  };

  // const { forecasts } = props;
  const tiles = groupByDays(forecasts);

  return (
    <div className="forecast-tiles">
      {tiles.map((item, i) => (
        <div className="forecast-tile" key={i}>
          <div className="icon">
            <img src={getIcon(item)} />
            {getDayInfo(item)}
          </div>
          {getInfo(item)}
        </div>
      ))}
    </div>
  );
};

export default ForeCastTiles;