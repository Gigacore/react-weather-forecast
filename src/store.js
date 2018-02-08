import { compose, applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk, createLogger());

let store = compose(createStore)(reducer, middleware);

export default store;