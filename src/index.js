import "babel-polyfill"; // needed for all async/await in our action creators to work
import express from "express"; //const express = require("express");
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

// browser requests to any route starting with "/api" go to "http://react-ssr-api.herokuapp.com"
app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      // this second param is only applicable to this specific API Server; do not use with other API Servers
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);

// Tell Express to treat the following folder as publicly accessible
app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore(req.get("cookie"));

  // Logic to initialize and load data into the store
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      //returns array of all Routes for the given path
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise)
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req.path, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
