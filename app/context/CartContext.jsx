import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = async (variantId, quantity = 1) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId,
          quantity,
          cartId: cart?.id || null,
        }),
      });

      const data = await res.json();

      if (data.error) {
        console.error("Add to cart error:", data.error);
        return;
      }

      if (data.cart) {
        setCart(data.cart);
        setIsCartOpen(true);
      }
    } catch (err) {
      console.error("addToCart failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,        // full Shopify cart object — drawer reads cart.lines.edges, cart.cost, etc.
        isCartOpen,
        setIsCartOpen,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);