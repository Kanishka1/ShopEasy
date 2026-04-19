import API from "../api";

export const placeOrderApi = (data) => {
  const userId = localStorage.getItem("userId");

  return API.post("/orders/place", {
    userId,
    address: data.address,
    paymentMethod: data.paymentMethod,
  });
};

export const getOrdersApi = () => {
  const userId = localStorage.getItem("userId");
  return API.get(`/orders/${userId}`);
};

export const cancelOrderApi = (orderId) => {
  return API.put(`/orders/cancel/${orderId}`);
};