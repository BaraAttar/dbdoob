import axios from "axios";
import { getCookie } from "cookies-next";
import { create } from "zustand";

export const useCategoriesStore = create((set) => ({
  categories: null,
  status: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  addStatus: "idle",
  deleteStatus: "idle",
  deletingId: null,
  error: null,
  response : null,

  fetchCategories: async () => {
    set({ status: "pending", error: null });
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    try {
      const response = await axios.get(`${apiUrl}/category`);

      set({
        categories: response.data,
        status: "fulfilled",
      });

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
          status: categoryStatus,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      console.log(response.data);
      set({ response:"New Category Added Successfully", addStatus: "fulfilled", error: null });
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

  deleteCategory: async (id) => {
    const token = getCookie("token");

    set({ deletingId: id, deleteStatus: "pending", error: null });
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
      set({ response:"A Category Removed Successfully", deletingId: null, deleteStatus: "fulfilled", error: null });
    } catch (error) {
      console.error(
        "Error adding new category:",
        error.response?.data?.message || error.message
      );
      set({
        error: error.response?.data?.message || "Error deleting category",
        deleteStatus: "rejected",
        deletingId: null,
      });
      return null;
    }
  },

  cleaner: () => {
    set({
      status: "idle",
      addStatus: "idle",
      deleteStatus: "idle",
      deletingId: null,
      error: null,
      response : null,
    });
  },
}));
