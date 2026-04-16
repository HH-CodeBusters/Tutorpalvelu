import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "https://tutorpalvelu-tutorpalvelu.2.rahtiapp.fi:5432";
const ACCESS_TOKEN_KEY = "MESSENGER_ACCESS_TOKEN";

export function setAccessToken(token: any) {
	localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken() {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use((config: any) => {
	const token = getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});