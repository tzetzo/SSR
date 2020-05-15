// Used to simply separate the React code from the Express code
import React from "react"; //const React = require("react");
import { renderToString } from "react-dom/server"; //const renderToString = require("react-dom/server").renderToString;
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from 'serialize-javascript';
import Routes from "../client/Routes";

module.exports = (path, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
