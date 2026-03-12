//import { useState } from 'react'
import "./App.css";
import { Link, Outlet } from "react-router";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#57884d",
            boxShadow: 2,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Logo / Nimi */}
              <Typography
                fontFamily="tahoma"
                variant="h6"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                TutorPalvelu
              </Typography>

              {/* Navigaatio */}
              <nav>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{
                    mx: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#6f8f69",
                      color: "#fff",
                    },
                  }}
                >
                  Home
                </Button>

                <Button
                  color="inherit"
                  component={Link}
                  to="/tutors"
                  sx={{
                    mx: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#6f8f69",
                      color: "#fff",
                    },
                  }}
                >
                  Tuutorit
                </Button>

                <Button
                  color="inherit"
                  component={Link}
                  to="/calendar"
                  sx={{
                    mx: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#6f8f69",
                      color: "#fff",
                    },
                  }}
                >
                  Kalenteri
                </Button>

                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={{
                    mx: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#6f8f69",
                      color: "#fff",
                    },
                  }}
                >
                  Oma profiili
                </Button>
              </nav>
            </Toolbar>
          </Container>
        </AppBar>

        {/* offset koska fixed header */}
        <Toolbar />

        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default App;
