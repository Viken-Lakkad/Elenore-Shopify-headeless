import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const already = get().items.find((p) => p.handle === product.handle);
        if (!already) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      removeFromWishlist: (handle) => {
        set((state) => ({
          items: state.items.filter((p) => p.handle !== handle),
        }));
      },

      toggleWishlist: (product) => {
        const inList = get().items.find((p) => p.handle === product.handle);
        if (inList) {
          get().removeFromWishlist(product.handle);
        } else {
          get().addToWishlist(product);
        }
      },

      isWishlisted: (handle) => {
        return get().items.some((p) => p.handle === handle);
      },
    }),
    {
      name: "wishlist-storage", // persisted in localStorage under this key
    }
  )
);

export default useWishlistStore;