import React from "react";
import { shallow } from "enzyme";

import configureStore from "redux-mock-store";
const mockStore = configureStore();

import WeatherForecast from "../../components/WeatherForecast";
import Dashboard from "../../components/Dashboard";

import data from "./data/forecast.json";

describe("<WeatherForecast />", () => {
  it("should render a div with `.weather-forecast-wrapper` class", () => {
    const wrapper = shallow(<WeatherForecast data={data.weatherStation.data} />);
    expect(wrapper.hasClass("weather-forecast-wrapper")).toBe(true);
  });

  it("should contain a dashboard", () => {
    const wrapper = shallow(<WeatherForecast data={data.weatherStation.data} />);
    expect(wrapper.find(Dashboard)).toHaveLength(1);
  });
});