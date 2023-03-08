import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Profile from "./components/Pages/Profile";
import Messages from "./components/Pages/Messages";
import EditProfile from "./components/Pages/EditProfile";
import { element } from "prop-types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
  {
    path: "/editprofile",
    element: <EditProfile />,
  },
  {
    path: "/messanger",
    element: <Messages />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
