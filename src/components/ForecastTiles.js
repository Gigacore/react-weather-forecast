import React from "react";

const ForecastTiles = ({ forecasts }) => {

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
  };

  // Returns week of the day
  const getDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data.forecasts[0].dt * 1000).getDay()];
  };

  // Fetches the icon using the icon code available in the forecast data.
  const getIcon = data => `https://openweathermap.org/img/w/${data.forecasts[0].weather[0].icon}.png`;
  
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

    // Gets the day's average humdity
    const avgHumdity = humidity.reduce((prev, next) => prev + next) / humidity.length;

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`${Math.round(minMax.max)}°C`}</strong> / {`${Math.round(minMax.min)}°C`}
        </div>
        <div className="more-info">
          {`Avg. Humidity: ${Math.round(avgHumdity)}%`}
        </div>
      </div>
    );
  };

  const tiles = groupByDays(forecasts);
  
  // EDGE CASE
  // When the web service returns data for 6 calendar days during evenings as a result of offset, 
  // this ensures that we are showing only 5-days of forecast.
  
  const trimmedTiles = (tiles.length > 5) ? tiles.slice(0, 5) : tiles;

  return (
    <div className="forecast-tiles">
      {trimmedTiles.map((item, i) => (
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

export default ForecastTiles;