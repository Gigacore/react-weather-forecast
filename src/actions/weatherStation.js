import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../constants/ActionTypes";
import axios from "axios";

export const fetchData = (region) => (dispatch) => {
  
  const { latitude, longitude } = region || {};

  const getDataByCity = `https://api.openweathermap.org/data/2.5/forecast?q=${region}&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  const getDataByCoords = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

  let location = typeof(region) === "object" ? getDataByCoords : getDataByCity;

  return axios.get(location)
    .then((response) => {
      dispatch({type: FETCH_DATA_FULFILLED, payload: response.data});
    })
    .catch((err) => {
      dispatch({type: FETCH_DATA_REJECTED, payload: err}); // Error handling
    });
};