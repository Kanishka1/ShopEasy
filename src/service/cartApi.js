import API from "../api";

export const getCart = () => {
  const userId = localStorage.getItem("userId");
  return API.get(`/cart/${userId}`);
};

export const addToCartApi = (productId, quantity = 1) => {
  const userId = localStorage.getItem("userId");

  return API.post(`/cart/${userId}/add`, {
    productId,
    quantity,
  });
};

export const removeFromCartApi = (productId) => {
  const userId = localStorage.getItem("userId");
  return API.delete(`/cart/${userId}/remove/${productId}`);
};

export const clearCartApi = () => {
  const userId = localStorage.getItem("userId");
  return API.delete(`/cart/${userId}/clear`);
};