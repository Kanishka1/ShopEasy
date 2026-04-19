import { placeOrderApi } from "../service/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Review({ address, payment, onBack }) {
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const id = toast.loading("Placing order...");

    try {
      await placeOrderApi({
        address,
        paymentMethod: payment,
      });

      toast.success("Order placed 🎉", { id });
      navigate("/order-success");
    } catch {
      toast.error("Failed to place order", { id });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review Order</h2>

      {/* Address */}
      <div className="border rounded-lg p-4 mb-4">
        <p className="font-semibold">{address.fullName}</p>
        <p className="text-gray-600 dark:text-gray-400">
          {address.street}, {address.city}
        </p>
      </div>

      {/* Payment */}
      <div className="border rounded-lg p-4 mb-4">
        <p className="font-medium">Payment: {payment}</p>
      </div>

      <div className="flex gap-3">
        <button className="btn-secondary flex-1" onClick={onBack}>
          ← Back
        </button>

        <button
          className="btn-primary flex-1"
          onClick={handlePlaceOrder}
        >
          Place Order 🚀
        </button>
      </div>
    </div>
  );
}