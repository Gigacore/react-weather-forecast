import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";

import configureStore from "redux-mock-store";
const mockStore = configureStore();

import WeatherForecast from "../../components/WeatherForecast";
import ForecastTiles from "../../components/ForecastTiles";

import data from "./data/forecast.json";

describe("<WeatherForecast />", () => {
  it("should render a div with `.weather-forecast-wrapper` class", () => {
    const wrapper = shallow(<WeatherForecast data={data} />);
    expect(wrapper.hasClass("weather-forecast-wrapper")).toBe(true);
  });
});