import axios from "axios";
import { getCookie } from "cookies-next";
import { create } from "zustand";

export const useProductsStore = create((set) => ({
  products: null,
  status: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  deleteStatus: "idle",
  deletingId: null,
  response: null,
  error: null,

  fetchProducts: async ({ category, page }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
    set({ status: "pending" });

    try {
      const response = await axios.get(`${apiUrl}/products`, {
        params: { category, page },
      });

      set({
        products: response.data,
        status: "fulfilled",
        error: null,
      });

      // console.log(response.data);
    } catch (error) {
      set({
        status: "rejected",
        error: error.message,
      });
      console.log(error);
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
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
    const token = getCookie("token");
    try {
      await axios.delete(`${apiUrl}/products`, {
        headers: {
          "x-auth-token": token,
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
      status: "idle",
      deleteStatus: "idle",
      deletingId: null,
      response: null,
      error: null,
    });
  },
}));
