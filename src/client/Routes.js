// Used to define all our React routes used by both Express app(through renderer.js) & React app(client.js)
import React from "react";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";

export default [
  {
    path: "/",
    ...HomePage,
    exact: true,
  },
  {
    path: "/users",
    ...UsersListPage
  },
];
