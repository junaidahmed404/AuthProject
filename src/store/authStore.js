import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
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

      console.log("Signup API Response:", response.data);

      if (!response.data.user) {
        console.error("Signup failed: No user data returned");
        set({ error: "Signup failed. Please try again.", isLoading: false });
        return false;
      }

      set({ isLoading: false });

      await useAuthStore.getState().checkAuth(); // ✅ Refresh user state

      return true;
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
      return false;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      console.log("Login API Response:", response.data);

      if (!response.data.user) {
        console.error("Login failed: No user data returned");
        set({ error: "Login failed. Please try again.", isLoading: false });
        return false;
      }

      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
        const response = await axios.post(`${API_URL}/varify-email`, { code });

        console.log("Email Verification Response:", response.data);

        // ✅ Wait for checkAuth to complete before proceeding
        await useAuthStore.getState().checkAuth();

        set({ isLoading: false });

        return response.data;
    } catch (error) {
        console.error("Email Verification Error:", error.response?.data || error);
        set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
        throw error;
    }
},



resetPassword: async (token, newPassword) => {
  set({ isLoading: true, error: null, message: null });

  try {
    console.log("Resetting password with token:", token); // Debugging log
    const response = await axios.post(`${API_URL}/reset-password/${token}`, { password: newPassword });

    console.log("Reset Password Response:", response.data); // Debug log

    set({ message: response.data.message, isLoading: false });
    return true;
  } catch (error) {
    console.error("Reset Password Error:", error.response?.data || error);
    set({
      isLoading: false,
      error: error.response?.data?.message || "Error resetting password",
    });
    return false;
  }
},




forgotPassword: async (email) => {
  set({ isLoading: true, error: null, message: null });

  try {
      console.log("Sending forgot password request..."); // Debug log
      const response = await axios.post(
          `${API_URL}/forgot-password`,
          { email },
          { withCredentials: true }
      );

      console.log("Forgot password response:", response.data); // Debug log

      set({ message: response.data.message, isLoading: false });
      return true;
  } catch (error) {
      console.error("Forgot Password Error:", error.response?.data || error);
      set({
          isLoading: false,
          error: error.response?.data?.message || "Error sending reset password email",
      });
      return false;
  }
},



  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/check-auth`);

      set({
        user: response.data.user || null,
        isAuthenticated: !!response.data.user,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },
}));
