import { api, setAccessToken, removeAccessToken } from "./api";

export function login(credentials: any) {
	return api.post("/api/auth/login", credentials).then((response: any) => {
		if (response.data.accessToken) {
			setAccessToken(response.data.accessToken);
		}
		return response.data;
	});
}

export function logout() {
	removeAccessToken();
}

export function createUser(user: any) {
	console.log(user)
	return api.post("/api/users", user).then((response: any) => response.data);
}

export function getAuthenticatedUser() {
	return api
		.get("/api/users/current")
		.then((response: any) => response.data)
		.catch((error: any) => {
			const status = error.response?.status;
			if (status === 403 || status === 401) {
				return null;
			}
			throw error;
		});
}

export function updateUser(user: any) {
	return api
		.put("/api/users/current", user)
		.then((response: any) => response.data);
}

export function getAllSubjects() {
	return api
		.get("/api/subjects")
		.then((response: any) => response.data);
}