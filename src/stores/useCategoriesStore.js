import axios from "axios";
import { create } from "zustand";

export const useCategoriesStore = create((set) => ({
  categories: null,
  status: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  error: null,

  fetchCategories: async () => {
    set({ status: "pending", error: null });
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    try {
      const response = await axios.get(`${apiUrl}/category`);
      console.log(response.data);
      
      set({
        categories: response.data,
        status: "fulfilled",
      });

      sessionStorage.setItem("categories", JSON.stringify(response.data));
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data?.message || error.message
      );
      set({
        error: error.response?.data?.message || "Error fetching categories",
        status: "rejected",
      });
      return null;
    }
  },
}));
