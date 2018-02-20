import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";

import WeatherForecast from './components/WeatherForecast';

@connect(store => {  
  return {
    forecast: store.weatherStation.data
  }
})
 class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    const { forecast } = this.props; 

    return (
      forecast === null ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <WeatherForecast data={forecast} />
      )
    );
  }
}

export default App;