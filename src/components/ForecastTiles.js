import React from "react";

const ForecastTiles = ({ forecasts }) => {

  // Filters the data by date and returns an Object containing a list of 5-day forecast.
  const groupByDays = data => {
    return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {}));
    
    // The below commented code reduces unnecessary iteration over an array (mapping) of values to keys. 
    // Instead it is cutshort with use of Object.values() method applied to the value this function returns
    // TODO: Benchmark the below against Object.values() and determine the fastest execution method. Use: performance.now()

    // return Object.keys(filterByDate).map(key => filterByDate[key];
  };

  // Returns week of the day
  const getDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

  // Fetches the icon using the icon code available in the forecast data.
  const getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;
  
  // Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
  const getInfo = (data, min=[], max=[], humidity=[]) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // Gets the day's average humdity
    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
        </div>
        <div className="more-info">
          {`Avg. Humidity: ${avgHumdity}%`}
        </div>
      </div>
    );
  };

  const tiles = Object.values(groupByDays(forecasts));

  // Edge case:
  // When the webservice returns data for 6 calendar days during evenings as a result of offset, 
  // this ensures that we are showing only 5-days of forecast.
  const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

  return (
    <div className="forecast-tiles">
      {forecastTiles.map((item, i) => (
        <div className="forecast-tile" key={i}>
          <div className="primary-info">
            <div className="icon">
              <img src={getIcon(item)} />
              {getDayInfo(item)}
            </div>
            {getInfo(item)}
          </div>
          <div className="detailed-info">
          
          </div>
        </div>
      ))}
    </div>
  );
};

// TODO: Add defaultProps and PropType validations

export default ForecastTiles;