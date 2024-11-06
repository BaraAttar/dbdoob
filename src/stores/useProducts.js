import axios from "axios";
import { getCookie } from "cookies-next";
import { create } from "zustand";

const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
const token = getCookie("token");


export const useProductsStore = create((set) => ({
  products: null,
  fetchStatus: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  addStatus: "idle",
  deleteStatus: "idle",
  deletingId: null,
  response: null,
  error: null,

  fetchProducts: async ({ category, page , sort }) => {
    set({ fetchStatus: "pending" });

    console.log(category, page , sort)
    try {
      const response = await axios.get(`${apiUrl}/products`, {
        params: { category, page , sort },
      });

      set({
        products: response.data,
        fetchStatus: "fulfilled",
        error: null,
      });

      // console.log(response.data);
    } catch (error) {
      set({
        fetchStatus: "rejected",
        error: error.message,
      });
      console.log(error);
    }
  },

  addProduct: async (data) => {
    set({ addStatus: "pending", error: null });

    try {
      const response = await axios.post(`${apiUrl}/products`, data, {
        headers: {
          "x-auth-token":token ,
        },
      });

      set({
        addStatus: "fulfilled",
        error: null,
        response: response.data.message,
      });

    } catch (error) {
      set({
        addStatus: "rejected",
        error: error.response?.data || "An error occurred",
      });
      console.error(error);
    }
  },

  deleteProduct: async (id) => {
    console.log("deleting product with id:", id);
    set({
      deletingId: id,
      deleteStatus: "pending",
      error: null,
      response: null,
    });
    const token = getCookie("token");
    try {
      await axios.delete(`${apiUrl}/products`, {
        headers: {
          "x-auth-token":token ,
        },
        params: {
          id,
        },
      });

      set({
        deletingId: null,
        deleteStatus: "fulfilled",
        response: "Product deleted successfully.",
      });
    } catch (error) {
      set({
        deleteStatus: "rejected",
        error: error.response.data.message,
      });
    }
  },

  cleaner: () => {
    set({
      fetchStatus: "idle",
      addStatus: "idle",
      deleteStatus: "idle",
      deletingId: null,
      response: null,
      error: null,
    });
  },
}));
