import React from "react";
import { render, mount, shallow } from "enzyme";

import configureStore from "redux-mock-store";
const mockStore = configureStore();

import Dashboard from "../../components/Dashboard";
const STATUS = "success";

describe("<Dashboard />", () => {
  it("renders an `.weather-dashboard`", () => {
    const wrapper = render(<Dashboard store={mockStore({ weatherStation: {status: STATUS}})} />);
    expect(wrapper.hasClass("weather-dashboard")).toBe(true);
  });

  it("should contain a input field", () => {
    const wrapper = render(<Dashboard store={mockStore({ weatherStation: {status: STATUS}})} />);
    expect(wrapper.find(".city-input")).toHaveLength(1);
  });

  it("should contain a change city button", () => {
    const wrapper = render(<Dashboard store={mockStore({ weatherStation: {status: STATUS}})} />);
    expect(wrapper.find("#change-city-btn")).toHaveLength(1);
  });

  it("should contain app heading", () => {
    const wrapper = mount(<Dashboard store={mockStore({ weatherStation: {status: STATUS}})} />);
    const heading = <h1 className="heading">5-Day Weather Forecast</h1>;
    expect(wrapper.contains(heading)).toEqual(true);
  });

  it("should receive city prop", () => {
    const wrapper = shallow(<Dashboard city="london" store={mockStore({ weatherStation: {status: STATUS}})} />);
    expect(wrapper.prop("city")).toBeDefined();
  });
});