import { create } from "zustand";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export const useUserStore = create((set) => ({
  user: null,
  status: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  error: null,
  // setUser: (newUser) => set({ user: newUser }),
  // clearUser: () => set({ user: null }),

  login: async (userName, password) => {
    set({ status: "pending", error: null });
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiUrl) {
      set({ error: "API URL is not defined", status: "rejected" });
      return null;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        userName,
        password,
      });

      set({
        user: response.data.userInfo,
        status: "fulfilled",
      });

      const { token } = response.data;
      setCookie("token", token, { maxAge: 60 * 60 * 24 });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data?.message || error.message
      );
      set({
        error: error.response?.data?.message || "An error occurred",
        status: "rejected",
      });
      return null;
    }
  },

  restoreUser: async () => {
    const token = getCookie("token");

    if (!token) {
      set({ status: "idle", user: null });
      return;
    }

    set({ status: "pending", error: null });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
      const response = await axios.get(`${apiUrl}/user/me`, {
        headers: {
          "x-auth-token": token,
        },
      });

      set({
        user: response.data,
        status: "fulfilled",
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to restore session",
        status: "rejected",
        user: null,
      });
      setCookie("token", "", { maxAge: -1 }); // Clear invalid token
    }
  },

  signup: async (
    firstName,
    lastName,
    userName,
    phoneNumber,
    email,
    password,
    
  ) => {
    set({ status: "pending", error: null });
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiUrl) {
      set({ error: "API URL is not defined", status: "rejected" });
      return null;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        firstName,
        lastName,
        userName,
        phoneNumber,
        email,
        password,
      });

      set({
        user: response.data.user,
        status: "fulfilled",
      });

      console.log(response.data)

      const { token } = response.data;
      setCookie("token", token, { maxAge: 60 * 60 * 24 });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data?.message || error.message
      );
      set({
        error: error.response?.data?.message || "An error occurred",
        status: "rejected",
      });
      return null;
    }
  },
}));
