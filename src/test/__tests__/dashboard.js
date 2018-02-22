import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, mount } from "enzyme";

import configureStore from "redux-mock-store";
const mockStore = configureStore();

import Dashboard from "../../components/Dashboard";

describe("<Dashboard />", () => {
  it("renders an `.weather-dashboard`", () => {
    const wrapper = render(<Dashboard store={mockStore({})}/>);
    expect(wrapper.hasClass("weather-dashboard")).toBe(true);
  });

  it("should contain a input field", () => {
    const wrapper = render(<Dashboard store={mockStore({})}/>);
    expect(wrapper.find(".city-input")).toHaveLength(1);
  });

  it("should contain a change city button", () => {
    const wrapper = render(<Dashboard store={mockStore({})}/>);
    expect(wrapper.find("#change-city-btn")).toHaveLength(1);
  });

  it("should contain app heading", () => {
    const wrapper = mount(<Dashboard store={mockStore({})}/>);
    const heading = <h1 className="heading">5-Day Weather Forecast</h1>;
    expect(wrapper.contains(heading)).toEqual(true);
  });
});