import { useState } from "react";
import { registerUser } from "../appUserApi";
import "../styles.css";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

    if (email.length < 4) {
      setError("Email must be at least 4 characters long");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        email,
        password,
        passwordCheck,
        firstname,
        lastname,
        phonenumber,
        role: "USER",
      });
      setSuccess("Registration successful! You can now log in.");
      // Reset form
      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setFirstname("");
      setLastname("");
      setPhonenumber("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>

      {error && <div className="register-error">{error}</div>}

      {success && <div className="register-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label htmlFor="email" className="register-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="register-form-input"
            required
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="firstname" className="register-form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter your first name"
            className="register-form-input"
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="lastname" className="register-form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter your last name"
            className="register-form-input"
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="phonenumber" className="register-form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="Enter your phone number"
            className="register-form-input"
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="password" className="register-form-label">
            Password (min 7 characters)
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="register-form-input"
            required
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="passwordCheck" className="register-form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            placeholder="Confirm your password"
            className="register-form-input"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="register-button">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
