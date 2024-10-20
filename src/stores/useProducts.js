import axios from "axios";
import { create } from "zustand";

export const useProductsStore = create((set) => ({
  products: null,
  status: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
  error: null,

  fetchProducts: async ({category , page}) => {
    console.log("category:",category)
    console.log("page:",page)
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
    set({ status: "pending" });

    try {
      const response = await axios.get(`${apiUrl}/products`, {
        params: { category , page },
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
}));
