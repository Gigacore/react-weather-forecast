import React, { Component } from "react";
import ForecastTiles from "./ForecastTiles";

export default class WeatherForecast extends Component {
  render() {

    const { data } = this.props;
    const { city, list } = data;
    const { name, country } = city;

    return (
      <div className="weather-forecast-wrapper">
        <header>
          <h1 className="heading">5-Day Weather Forecast</h1>
          <h2 className="city-name">{name}, {country}</h2>
        </header>
        <ForecastTiles forecasts={list} />

        <div className="fork">
          <a href="https://github.com/Gigacore/react-weather-forecast" target="_blank">Fork it on Github</a>
        </div> 
      </div>
    );
  }
}
