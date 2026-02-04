//import { useState } from 'react'
import './App.css'
import { Link, Outlet } from "react-router";
import { AppBar, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="lg">
          <AppBar position="fixed">
            <Toolbar>
              <Typography>Tutorpalvelu</Typography>
              <nav>
                <Button color="inherit" component={Link} to={"/"} sx={{ "&:hover": { backgroundColor: "transparent", color: "inherit" }, textTransform: "none" }}>Home</Button>
                <Button color="inherit" component={Link} to={"/tutors"} sx={{ "&:hover": { backgroundColor: "transparent", color: "inherit" }, textTransform: "none" }}>Tuutorit</Button>
                <Button color="inherit" component={Link} to={"/calendar"} sx={{ "&:hover": { backgroundColor: "transparent", color: "inherit" }, textTransform: "none" }}>Kalenteri</Button>
              </nav>
            </Toolbar>
          </AppBar>
          <CssBaseline />
        </Container>
        <Outlet />
      </LocalizationProvider>
    </>
  )
}

export default App
