import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signup`, { email, password, name });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: { ...response.data.user },
				error: null,
				isLoading: false,
			});
			return response.data.user;
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
	
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			console.error("CheckAuth error: ", error);
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
	
	deleteUser: async () => {
		set({ isLoading: true, error: null });
		try {
			const { user } = get();
			const response = await axios.delete(`${API_URL}/delete/${user._id}`);
			set({ user: null, isAuthenticated: false, isLoading: false });
			alert(response.data.message);
		} catch (error) {
			set({ error: error.response.data.message || "Error deleting account", isLoading: false });
			throw error;
		}
	},

	updateUser: async ({ name, email }) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.put(`${API_URL}/update`, { name, email });
			set({ user: response.data.user, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error updating user", isLoading: false });
			throw error;
		}
	},

	changePassword: async (currentPassword, newPassword) => {
		set({ isLoading: true, error: null });
		try {
		  const response = await axios.put(`${API_URL}/change-password`, { currentPassword, newPassword });
		  set({ message: response.data.message, isLoading: false });
		} catch (error) {
		  set({ error: error.response.data.message || "Error changing password", isLoading: false });
		  throw error;
		}
	  },
	
}));