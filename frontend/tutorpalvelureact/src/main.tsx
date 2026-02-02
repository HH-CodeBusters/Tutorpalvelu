/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import App from './App.tsx'
import Tutors from './components/tutors.tsx'
import Calendar from './components/calendar.tsx';
import Home from './components/home.tsx';



 const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <Home />,
          index: true
        },
        {
          path: "tutors",
          element: <Tutors />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
      ]
    }

  ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);