import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/weatherStation";

@connect((store) => store)
export default class Dashboard extends Component {

  _updateCity = () => {
    const city = this.__cityInput.value;
    this.props.dispatch(fetchData(city));
  }

  _onkeyPress = e => {
    e.key === "Enter" ? this._updateCity() : null
  }

  render() {

    const { city } = this.props;

    return (
      <div className="weather-dashboard">
        <header>
          <h1 className="heading">5-Day Weather Forecast</h1>
        </header>
        <section className="controls">
          <div>
            <input
              type="search"
              className="city-input"
              id="city-name"
              ref={input => {
                this.__cityInput = input;
                return this.__cityInput;
              }}
              onKeyPress={this._onkeyPress}
              placeholder={city}
            />
          </div>
        </section>
      </div>
    );
  }
}