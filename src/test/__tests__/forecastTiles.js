import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render } from "enzyme";

import configureStore from "redux-mock-store";
const mockStore = configureStore();

import data from "./data/forecast.json";
const { list } = data.weatherStation.data;

import ForecastTiles from "../../components/ForecastTiles";

describe("<ForecastTiles />", () => {
  it("renders an forecast-tiles container div", () => {
    const wrapper = render(<ForecastTiles store={mockStore()} forecasts={list}/>);
    expect(wrapper.hasClass("forecast-tiles")).toBe(true);
  });

  it("renders five forecast tiles", () => {
    const wrapper = render(<ForecastTiles store={mockStore()} forecasts={list}/>);
    expect(wrapper.children().length).toBe(5);
  });
});