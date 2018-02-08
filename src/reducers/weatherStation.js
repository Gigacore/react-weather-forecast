import { FETCH_DATA, FETCH_DATA_FULFILLED } from "../constants/ActionTypes";

export default function reducer(state = {
  data: null
}, action) {
  switch (action.type) {
    case FETCH_DATA: {
      return {
        ...state
      };
    }
    case FETCH_DATA_FULFILLED: {
      if(state.data === null ) {
        return {
          ...state,
          data: action.payload
        };
      }
      break;
    }
  }

  return state;
}