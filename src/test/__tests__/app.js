import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, render } from "enzyme";
import configureStore from "redux-mock-store";
import App from "../../App";
import thunk from "redux-thunk";
require("es6-promise").polyfill();
require("isomorphic-fetch");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const success = () => {
  return {
    type: "FETCH_DATA_FULFILLED"
  };
};

const fetchData = () => {
  return dispatch => {
    return fetch("https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef2")
      .then(() => dispatch(success()));
  };
};

it("should execute fetch data", () => {
  const store = mockStore({});
  return store.dispatch(fetchData())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(success());
    });
});
