import { useState, useEffect } from 'react'
import { getAuthenticatedUser, logout } from './services/user';
import { Link, Outlet } from "react-router";
import { AppBar, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./styles.css";
import type { appUser } from './types';

function App() {
  const [user, setUser] = useState<appUser | null>(null);

  useEffect(() => {
    // Try to load authenticated user on mount
    getAuthenticatedUser()
      .then((userData) => {
        if (userData) {
          setUser(userData);
        }
      })
      .catch(() => {
        setUser(null);
      })
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

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
                  Etusivu
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

                {user ? (
                  <>
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
                        }
                      }}
                    >
                      Profiili
                    </Button>
                    <Button
                      color="inherit"
                      onClick={handleLogout}
                      sx={{
                        mx: 1,
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "#6f8f69",
                          color: "#fff",
                        }
                      }}
                    >
                      Kirjaudu ulos
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/login" sx={{
                      mx: 1,
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "#6f8f69",
                        color: "#fff",
                      }
                    }}>
                      Kirjaudu
                    </Button>
                  </>
                )}
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
