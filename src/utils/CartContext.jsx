import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCartApi,
  removeFromCartApi,
  clearCartApi,
} from "../service/cartApi";
import toast from "react-hot-toast";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

  // ✅ Load cart from backend
const fetchCart = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return; // ✅ STOP if not logged in
  const res = await getCart();
  setCart(res.data);
};

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Add item
  const addToCart = async (productId, quantity = 1) => {
  await addToCartApi(productId, quantity);
  toast.success("Added to cart 🛒");
  fetchCart();
};
  // ✅ Remove item
  const removeFromCart = async (id) => {
    await removeFromCartApi(id);
    fetchCart();
  };

  // ✅ Clear cart
  const clearCart = async () => {
    await clearCartApi();
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};