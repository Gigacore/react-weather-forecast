import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";

import WeatherForecast from './components/WeatherForecast';

@connect(store => {  
  return {
    forecast: store.weatherStation.data
  }
})
export default class App extends Component {

  // Fetching data for "London" by default for this exercise.
  // TODO: Detect user location automatically. 
  componentDidMount() {
    this.props.dispatch(fetchData("london"));
  }

  render() {
    const { forecast } = this.props;

    return (
      forecast === null ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <WeatherForecast data={forecast} />
          <div className="fork">
            <a href="https://github.com/Gigacore/react-weather-forecast" target="_blank">Fork it on Github</a>
          </div> 
        </div>
      )
    );
  }
}