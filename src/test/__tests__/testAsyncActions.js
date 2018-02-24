import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, render } from "enzyme";
import configureStore from "redux-mock-store";

import { FETCH_DATA_FULFILLED } from "../../constants/ActionTypes";

import thunk from "redux-thunk";
require("es6-promise").polyfill();
require("isomorphic-fetch");

import { fetchData } from "../../actions/weatherStation";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it("should execute fetchData and return the required action type", () => {
  const store = mockStore({});
  return store.dispatch(fetchData("london"))
    .then(() => {
      const actions = store.getActions();

      // Expected action type from the action creator
      expect(actions[0].type).toEqual(FETCH_DATA_FULFILLED);
    });
});