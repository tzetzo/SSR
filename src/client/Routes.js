// Used to define all our React routes used by both Express app(through renderer.js) & React app(client.js)
import React from "react";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import AdminsListPage from "./pages/AdminsListPage";
import NotFoundPage from "./pages/NotFoundPage";
import App from "./App";

export default [
  {
    ...App,
    routes: [
      {
        path: "/",
        ...HomePage,
        exact: true,
      },
      {
        path: "/users",
        ...UsersListPage,
      },
      {
        path: "/admins",
        ...AdminsListPage,
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
