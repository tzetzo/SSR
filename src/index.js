import "babel-polyfill"; // needed for all async/await in our action creators to work
import express from "express"; //const express = require("express");
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

// Tell Express to treat the following folder as publicly accessible
app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();

  // Logic to initialize and load data into the store
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    //returns array of all Routes for the given path
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req.path, store));
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
