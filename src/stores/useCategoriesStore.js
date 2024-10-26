import axios from "axios";
import { getCookie } from "cookies-next";
import { create } from "zustand";

export const useCategoriesStore = create((set) => ({
  categories: null,
  status: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  addStatus: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  deleteStatus: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  deletingCatId: null,
  error: null,
  deleteError: null,

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

      // sessionStorage.setItem("categories", JSON.stringify(response.data));
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

  submitNewCategory: async ({ categoryName, categoryStatus }) => {
    const token = getCookie("token");

    set({ addStatus: "pending", error: null });
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    try {
      const response = await axios.post(
        `${apiUrl}/category`,
        {
          categoryName,
          status : categoryStatus,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      console.log(response.data);
      set({ addStatus: "fulfilled", error: null });
    } catch (error) {
      console.error(
        "Error adding new category:",
        error.response?.data?.message || error.message
      );
      set({
        error: error.response?.data?.message || "Error adding new category",
        addStatus: "rejected",
      });
      return null;
    }
  },

  submitDeleteCategory: async (id) => {
    const token = getCookie("token");

    set({ deletingCatId: id, deleteStatus: "pending", error: null });
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    try {
      const response = await axios.delete(`${apiUrl}/category`, {
        headers: {
          "x-auth-token": token,
        },
        params: {
          id,
        },
      });

      console.log(response.data);
      set({ eletingCatId: null, deleteStatus: "fulfilled", deleteError: null });
    } catch (error) {
      console.error(
        "Error adding new category:",
        error.response?.data?.message || error.message
      );
      set({
        deleteError: error.response?.data?.message || "Error deleting category",
        deleteStatus: "rejected",
        eletingCatId: null,
      });
      return null;
    }
  },
}));
