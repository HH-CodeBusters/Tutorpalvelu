import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import "./styles.css";
import App from "./App.tsx";
import Tutors from "./components/tutors.tsx";
import Calendar from "./components/calendar.tsx";
import Home from "./components/home.tsx";
import Profile from "./components/profile.tsx";
import Register from "./components/register.tsx";
//import React from 'react';
//import ReactDOM from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "tutors",
        element: <Tutors />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
