import { createContext, useContext, useState, useEffect } from "react";
import { toNumber } from "../api/normalize";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const normalizeCartItem = (item) => {
    if (!item || typeof item !== "object") return null;
    const quantity = toNumber(item.quantity, 1);
    return {
      ...item,
      price: toNumber(item.price, 0),
      quantity: quantity > 0 ? quantity : 1,
    };
  };

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeCartItem).filter(Boolean);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // ignore write errors
    }
  }, [cart]);

  const getItemKey = (itemOrId) => {
    if (itemOrId && typeof itemOrId === "object") {
      return itemOrId.uid || itemOrId.id;
    }
    return itemOrId;
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const normalizedProduct = normalizeCartItem(product) || product;
      const productKey = getItemKey(product);
      const existing = prev.find((item) => getItemKey(item) === productKey);
      if (existing) {
        return prev.map((item) =>
          getItemKey(item) === productKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...normalizedProduct, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const targetKey = getItemKey(productId);
    setCart((prev) => prev.filter((item) => getItemKey(item) !== targetKey));
  };

  const updateQuantity = (productId, quantity) => {
    const nextQuantity = toNumber(quantity, 0);
    if (nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const targetKey = getItemKey(productId);
    setCart((prev) =>
      prev.map((item) =>
        getItemKey(item) === targetKey
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = toNumber(item.price, 0);
      const qty = toNumber(item.quantity, 0);
      return sum + price * qty;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
