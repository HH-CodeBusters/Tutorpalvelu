export function getAppUsers() {
	return fetch('http://localhost:8080/api/tutors')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
}

export interface RegistrationData {
	email: string;
	password: string;
	passwordCheck: string;
	firstname: string;
	lastname: string;
	phonenumber: string;
	role: string;
}

export function registerUser(data: RegistrationData) {
	return fetch('http://localhost:8080/api/register', {
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

export interface LoginCredentials {
	email: string;
	password: string;
}

export function loginUser(email: string, password: string) {
	const credentials: LoginCredentials = {
		email,
		password
	};

	return fetch('http://localhost:8080/api/login', {
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