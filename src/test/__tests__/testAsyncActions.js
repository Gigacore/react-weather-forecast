import configureStore from "redux-mock-store";

import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../../constants/ActionTypes";

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

it("should reject the request if no city is being passed", () => {
  const store = mockStore({});
  return store.dispatch(fetchData(null))
    .then(() => {
      const actions = store.getActions();

      // Expected action type from the action creator
      expect(actions[0].type).toEqual(FETCH_DATA_REJECTED);
    });
});