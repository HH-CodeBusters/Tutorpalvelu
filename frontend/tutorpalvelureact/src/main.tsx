<<<<<<< HEAD
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
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import App from './App.tsx'
import Tutors from './components/tutors.tsx'
import Calendar from './components/calendar.tsx';
import Home from './components/home.tsx';
import Profile from './components/profile.tsx';
import Register from './components/register.tsx';
import Login from './components/login.tsx';
>>>>>>> 086be5359f225a30166a607c300068a515211a48
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
<<<<<<< HEAD
    ],
  },
=======
      { 
        path: "login",
        element: <Login />,
      },
    ]
  }

>>>>>>> 086be5359f225a30166a607c300068a515211a48
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
