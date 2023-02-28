import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Profile from "./components/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
