import React from "react";

import * as actions from "../../actions/weatherStation";
import reducer from "../../reducers";

import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../../constants/ActionTypes";

import mockData from "./data/forecast.json";

describe("data reducer", () => {
  
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({"weatherStation": {"data": null, "status": null}});
  });

  it("should handle FETCH_DATA_FULFILLED", () => {
    const startFetch = {
      type: FETCH_DATA_FULFILLED,
      payload: mockData.weatherStation.data
    };

    expect(reducer({}, startFetch)).toEqual(mockData);
  });

  it("should handle FETCH_DATA_REJECTED", () => {
    const startFetch = {
      type: FETCH_DATA_REJECTED,
      payload: {}
    };

    expect(reducer({}, startFetch)).toEqual({"weatherStation": {"data": null, "status": "failed"}});
  });
});

