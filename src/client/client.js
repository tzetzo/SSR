// Startup point for the client side of our application
import "babel-polyfill"; // needed for all async/await in our action creators to work
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import reducers from "./reducers";

// window.INITIAL_STATE is set by the initially rendered server-side HTML(renderer.js)
const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
