import { FETCH_DATA, FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../constants/ActionTypes";
import axios from "axios";

export function getData() {
  return function(dispatch) {
    dispatch({ type: FETCH_DATA });
    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=Bengaluru,in&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29")
      .then((response) => {
        dispatch({type: FETCH_DATA_FULFILLED, payload: response.data});
      })
      .catch((err) => {
        dispatch({type: FETCH_DATA_REJECTED, payload: err}); // Error handling
      });
  }
}