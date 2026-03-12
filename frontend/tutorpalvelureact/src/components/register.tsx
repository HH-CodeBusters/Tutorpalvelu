import { useState } from "react"
import { registerUser } from "../appUserApi"

export default function Register() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordCheck, setPasswordCheck] = useState("")
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [phonenumber, setPhonenumber] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		// Validation
		if (!email || !password || !passwordCheck) {
			setError("Email and password fields are required")
			return
		}

		if (password !== passwordCheck) {
			setError("Passwords do not match")
			return
		}

		if (password.length < 7) {
			setError("Password must be at least 7 characters long")
			return
		}

		if (email.length < 4) {
			setError("Email must be at least 4 characters long")
			return
		}

		setLoading(true)
		try {
			await registerUser({
				email,
				password,
				passwordCheck,
				firstname,
				lastname,
				phonenumber,
				role: "USER"
			})
			setSuccess("Registration successful! You can now log in.")
			// Reset form
			setEmail("")
			setPassword("")
			setPasswordCheck("")
			setFirstname("")
			setLastname("")
			setPhonenumber("")
		} catch (err) {
			setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={{ maxWidth: "400px", minWidth: "250px", margin: "20px auto", padding: "10px" }}>
			<h2>Register</h2>

			{error && (
				<div style={{ color: "red", marginBottom: "15px", padding: "10px", border: "1px solid red", borderRadius: "4px" }}>
					{error}
				</div>
			)}

			{success && (
				<div style={{ color: "green", marginBottom: "15px", padding: "10px", border: "1px solid green", borderRadius: "4px" }}>
					{success}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "15px" }}>
					<label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
						required
					/>
				</div>

				<div style={{ marginBottom: "15px" }}>
					<label htmlFor="firstname" style={{ display: "block", marginBottom: "5px" }}>First Name</label>
					<input
						type="text"
						id="firstname"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						placeholder="Enter your first name"
						style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
					/>
				</div>

				<div style={{ marginBottom: "15px" }}>
					<label htmlFor="lastname" style={{ display: "block", marginBottom: "5px" }}>Last Name</label>
					<input
						type="text"
						id="lastname"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						placeholder="Enter your last name"
						style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
					/>
				</div>

				<div style={{ marginBottom: "15px" }}>
					<label htmlFor="phonenumber" style={{ display: "block", marginBottom: "5px" }}>Phone Number</label>
					<input
						type="tel"
						id="phonenumber"
						value={phonenumber}
						onChange={(e) => setPhonenumber(e.target.value)}
						placeholder="Enter your phone number"
						style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
					/>
				</div>

				<div style={{ marginBottom: "15px" }}>
					<label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password (min 7 characters)</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
						required
					/>
				</div>

				<div style={{ marginBottom: "15px" }}>
					<label htmlFor="passwordCheck" style={{ display: "block", marginBottom: "5px" }}>Confirm Password</label>
					<input
						type="password"
						id="passwordCheck"
						value={passwordCheck}
						onChange={(e) => setPasswordCheck(e.target.value)}
						placeholder="Confirm your password"
						style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
						required
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					style={{
						width: "100%",
						padding: "10px",
						backgroundColor: loading ? "#ccc" : "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: loading ? "not-allowed" : "pointer",
						fontSize: "16px"
					}}
				>
					{loading ? "Registering..." : "Register"}
				</button>
			</form>
		</div>
	)
}