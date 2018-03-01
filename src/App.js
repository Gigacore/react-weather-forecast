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

  // Fetches data by using geolocation. If the user blocks, or if the browser does not support the API, 
  // fallsback to default location of London
  componentDidMount() {  
    const detectLocation = new Promise((resolve,reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        }, (error) => {
          if(error.code === error.PERMISSION_DENIED) {
            console.error("Error detecting location.");
          }
        });
      }
    });

    detectLocation.then((location) => {
      this.props.dispatch(fetchData(location));
    }).catch(() => {
      this.props.dispatch(fetchData("london"));
    });
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