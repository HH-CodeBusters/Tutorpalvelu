import { useState } from "react";
import { Typography, Button, Box, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router";

import { login } from "../services/user";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmitLogin(event: any) {
    event.preventDefault();

    login({ email, password })
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch((error: any) => {
        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError("Kirjautuminen epäonnistui. Yritä uudelleen.");
        }
      });
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Kirjaudu
      </Typography>
      {error && (
        <Alert
          severity="error"
          sx={{ marginBottom: 2 }}
          onClose={() => setError(undefined)}
        >
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmitLogin}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Sähköposti"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Salasana"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
          />
        </Box>

        <Box>
          <Button type="submit" variant="contained" sx={{ marginRight: 1 }}>
            Kirjaudu
          </Button>
          <Button component={Link} to="/">
            Peruuta
          </Button>
        </Box>

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body2">
            Ei vielä tiliä?{" "}
            <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
              Rekisteröidy
            </Link>
          </Typography>
        </Box>
      </form>
    </>
  );
}