import { useEffect, useState } from "react";
import Header from "./Header";
import { getOrdersApi, cancelOrderApi } from "../service/orderApi";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

export default function OrderHistory() {
	const [orders, setOrders] = useState([]);
	const [cancelOrderData, setCancelOrderData] = useState(null);
	const [loadingOrderId, setLoadingOrderId] = useState(null);

	const fetchOrders = async () => {
		const res = await getOrdersApi();
		setOrders(res.data);
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const handleCancel = async (orderId) => {
		try {
			setLoadingOrderId(orderId);

			await cancelOrderApi(orderId);

			toast.success("Order cancelled successfully");

			await fetchOrders(); // refresh orders
		} catch (err) {
			console.error(err);
			toast.error("Cannot cancel order");
		} finally {
			setLoadingOrderId(null);
			setCancelOrderData(null); // close modal
		}
	};

	return (
		<div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition">
			<Header />

			<div className="container py-6">
				<h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
					Your Orders 📦
				</h2>

				{orders.length === 0 ? (
					<div className="text-center text-gray-500 dark:text-gray-400">
						No orders yet 😕
					</div>
				) : (
					<div className="space-y-6">
						{orders.map((order) => (
							<div key={order.id} className="card p-6 space-y-6">
								{/* 🔹 HEADER */}
								<div className="flex flex-wrap justify-between items-start gap-3">
									<div>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Order ID
										</p>
										<p className="font-semibold text-gray-800 dark:text-white">
											{order.id}
										</p>

										<p className="text-xs text-gray-500 mt-1">
											{new Date(order.createdAt).toLocaleString()}
										</p>
									</div>

									<div className="flex items-center gap-3">
										{/* Status */}
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												order.status === "PLACED"
													? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
													: order.status === "DELIVERED"
														? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
														: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
											}`}
										>
											{order.status}
										</span>

										{/* Cancel Button */}
										{order.status === "PLACED" && (
											<button
												onClick={() => setCancelOrderData(order)}
												className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition"
											>
												Cancel
											</button>
										)}
									</div>
								</div>

								{/* 🔹 ADDRESS */}
								{order.address && <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
									<p className="text-xs uppercase text-gray-400 mb-1">
										Shipping Address
									</p>

									<p className="font-medium text-gray-800 dark:text-white">
										{order.address?.fullName}
									</p>

									<p className="text-sm text-gray-600 dark:text-gray-400">
										{order.address?.street}, {order.address?.city}
									</p>

									<p className="text-sm text-gray-600 dark:text-gray-400">
										{order.address?.state} - {order.address?.pincode}
									</p>

									<p className="text-sm text-gray-600 dark:text-gray-400">
										📞 {order.address?.phone}
									</p>
								</div>}

								{/* 🔹 ITEMS */}
								<div className="divide-y divide-gray-200 dark:divide-gray-700">
									{order.items.map((item, i) => (
										<div key={i} className="flex items-center py-4 gap-4">
											<img
												src={`http://localhost:8080/api/images/${item.product?.imageId}`}
												className="w-14 h-14 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg p-1"
											/>

											<div className="flex-1">
												<p className="font-medium text-gray-800 dark:text-white">
													{item.product?.name}
												</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">
													Qty: {item.quantity}
												</p>
											</div>

											<p className="font-semibold text-gray-800 dark:text-white">
												₹{item.product?.price * item.quantity}
											</p>
										</div>
									))}
								</div>

								{/* 🔹 FOOTER */}
								<div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{order.items.length} item(s)
									</p>

									<p className="text-xl font-bold text-gray-900 dark:text-white">
										₹{order.totalAmount}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* ✅ GLOBAL MODAL (IMPORTANT: outside map) */}
			{cancelOrderData && (
				<ConfirmModal
					title="Cancel Order"
					message="Are you sure you want to cancel this order? This action cannot be undone."
					confirmText="Cancel Order"
					danger={true}
					onConfirm={() => handleCancel(cancelOrderData.id)}
					onClose={() => setCancelOrderData(null)}
				/>
			)}
		</div>
	);
}
