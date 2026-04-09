import { useState } from "react";
import { loginUser } from "../appUserApi";
import "../styles.css";
export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmitLogin(event: any) {
    event.preventDefault();

    try {
      const response = await loginUser(email, password);
      // Handle successful login
      console.log("Login successful:", response);
      // TODO: Store token when authentication is implemented
      // TODO: Redirect to dashboard or home page
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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
      </form>
    </>
  );
}