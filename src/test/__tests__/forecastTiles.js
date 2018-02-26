import React from "react";
import { render } from "enzyme";

import configureStore from "redux-mock-store";
const mockStore = configureStore();

import data from "./data/forecast.json";
const { list } = data.weatherStation.data;

import ForecastTiles from "../../components/ForecastTiles";

describe("<ForecastTiles />", () => {
  it("should render a forecast-tiles container div", () => {
    const wrapper = render(<ForecastTiles store={mockStore()} forecasts={list}/>);
    expect(wrapper.hasClass("forecast-tiles")).toBe(true);
  });

  it("should render five forecast tiles", () => {
    const wrapper = render(<ForecastTiles store={mockStore()} forecasts={list}/>);
    expect(wrapper.children().length).toBe(5);
  });
});