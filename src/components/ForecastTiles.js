import React, { Component } from "react";
import DetailedInfo from "./DetailedInfo";

export default class ForecastTiles extends Component {

  // Filters the data by date and returns an Object containing a list of 5-day forecast.
  _groupByDays = data => {
    return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {}));
  };

  // Returns week of the day
  _getDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

  // Fetches the icon using the icon code available in the forecast data.
  _getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

  // Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
  _getInfo = (data, min=[], max=[], humidity=[]) => {
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

  // Toggles accordion to display hourly weather information
  _showMoreInfo = (index) => {
    const elm = this.refs[`div-${index}`];
    const expandedElment = document.querySelector(".expanded");

    elm.classList.add("expanded");
    expandedElment !== null && expandedElment.classList.remove("expanded");
  }

  render() {

    const { forecasts } = this.props;
    const tiles = Object.values(this._groupByDays(forecasts));

    // Edge case:
    // When the webservice returns data for 6 calendar days during evenings as a result of offset,
    // this ensures that we are showing only 5-days of forecast.
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <div className="forecast-tiles">
        {forecastTiles.map((item, i) => (
          <div
            className={`forecast-tile tile-${i}`}
            key={i}
            ref={`div-${i}`}
            onClick={() => {this._showMoreInfo(i)}}
          >
            <div className="primary-info">
              <div className="icon">
                <img src={this._getIcon(item)} />
                {this._getDayInfo(item)}
              </div>
              {this._getInfo(item)}
            </div>
            <div className="detailed-info" key={i}>
              <DetailedInfo data={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
// TODO: Add defaultProps and PropType validations
