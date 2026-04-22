import type { RegistrationData, LoginCredentials } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export function getAppUsers() {
	return fetch(`${API_URL}/api/tutors`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network did not respond');
			}
			return response.json();
		})
}

export function registerUser(data: RegistrationData) {
	return fetch(`${API_URL}/api/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Registration failed');
			}
			return response.json();
		})
}

export function loginUser(email: string, password: string) {
	const credentials: LoginCredentials = { email, password };

	return fetch(`${API_URL}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(credentials)
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Invalid email or password');
			}
			return response.json();
		})
}