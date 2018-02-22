import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../constants/ActionTypes";

export default function reducer(state = {
  data: null,
  status: null
}, action) {
  switch (action.type) {
    case FETCH_DATA_FULFILLED: {
      return {
        ...state,
        data: action.payload,
        status: "success"
      };
      break;
    }
    case FETCH_DATA_REJECTED: {
      return {
        ...state,
        status: "failed"
      };

      console.error(`Could not fetch the data from webservice. ${action.payload}.`); // eslint-disable-line
      break;
    }
  }

  return state;
}