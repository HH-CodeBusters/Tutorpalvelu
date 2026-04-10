import { useState } from "react";
import { Typography, Button, Box, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router";

import { createUser } from "../services/user";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmitRegister(event: any) {
    event.preventDefault();
    setError(undefined);
    setSuccess(undefined);

    // Validation
    if (!email || !password || !passwordCheck) {
      setError("Email and password fields are required");
      return;
    }

    if (password !== passwordCheck) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 7) {
      setError("Password must be at least 7 characters long");
      return;
    }

    setLoading(true);

    createUser({
      email,
      password,
      passwordCheck,
      firstname,
      lastname,
      phonenumber,
    })
      .then(() => {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error: any) => {
        // Try to get error message from different possible locations
        let errorMessage = "Registration failed. Please try again.";
        
        if (error.response?.data?.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.statusText) {
          errorMessage = `Error: ${error.response.statusText}`;
        } else if (error.message) {
          errorMessage = error.message;
        }
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Rekisteröidy
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
      {success && (
        <Alert
          severity="success"
          sx={{ marginBottom: 2 }}
          onClose={() => setSuccess(undefined)}
        >
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmitRegister}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Sähköposti"
            type="email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Etunimi"
            variant="outlined"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Sukunimi"
            variant="outlined"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Puhelinnumero"
            type="tel"
            variant="outlined"
            value={phonenumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Salasana (min 7 merkkiä)"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <TextField
            label="Vahvista salasana"
            type="password"
            variant="outlined"
            value={passwordCheck}
            onChange={(event) => setPasswordCheck(event.target.value)}
            required
            fullWidth
          />
        </Box>

        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ marginRight: 1 }}
          >
            {loading ? "Rekisteröidään..." : "Rekisteröidy"}
          </Button>
          <Button component={Link} to="/login">
            Takaisin kirjautumiseen
          </Button>
        </Box>
      </form>
    </>
  );
}
