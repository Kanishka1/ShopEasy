import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-300">
        
        <div className="card max-w-md w-full text-center">
          
          {/* ✅ Success Icon */}
          <div className="flex justify-center mb-5">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
              <span className="text-green-600 dark:text-green-400 text-4xl">
                ✔️
              </span>
            </div>
          </div>

          {/* ✅ Heading */}
          <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Thank you for your purchase 🎉 <br />
            Your items will be delivered soon.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

          {/* Order Info */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-1">
            <p>📦 Estimated Delivery: 3-5 days</p>
            <p>💳 Payment: Successful</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-primary w-full"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/order-history")}
              className="btn btn-secondary w-full"
            >
              View My Orders
            </button>

          </div>
        </div>
      </div>
    </>
  );
}