import { useCart } from "../utils/CartContext";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { placeOrderApi } from "../service/orderApi";
import toast from "react-hot-toast";
import { useSearch } from "../utils/searchContext";

export default function Cart() {
	const { search } = useSearch();
	const { cart = [], addToCart, removeFromCart } = useCart();
	const navigate = useNavigate();
	const filteredProducts = cart.filter((p) =>
		p.product.name.toLowerCase().includes(search.toLowerCase()),
	);

	const decreaseQty = (item) => {
		if (item.quantity === 1) {
			removeFromCart(item.productId);
		} else {
			addToCart(item.productId, -1);
		}
	};

	const increaseQty = (item) => {
		addToCart(item.productId, 1);
	};

	const handleCheckout = async () => {
		try {
			await placeOrderApi();
			navigate("/order-success");
		} catch (err) {
			console.error(err);
			//   alert("Checkout failed. Some items may be out of stock.");
			toast.error("Checkout failed. Some items may be out of stock.");
		}
	};

	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

	const total = cart.reduce(
		(sum, item) => sum + (item.product?.price || 0) * item.quantity,
		0,
	);

	return (
		<>
			<Header />

			<div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-6 px-4">
				<div className="container flex flex-col lg:flex-row gap-6">
					{/* LEFT */}
					<div className="flex-1 card">
						<h1 className="text-2xl font-bold mb-6 dark:text-white">
							Your Cart 🛒
						</h1>

						{cart.length === 0 ? (
							<p className="text-gray-500 dark:text-gray-400 text-center py-10">
								Your cart is empty
							</p>
						) : (
							<div className="space-y-6">
								{filteredProducts.map((item) => (
									<div
										key={item.productId}
										className="flex gap-4 border-b pb-5 border-gray-200 dark:border-gray-700"
									>
										{/* Image */}
										<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 flex items-center justify-center">
											<img
												src={`http://localhost:8080/api/images/${item.product?.imageId}`}
												alt={item.product?.name}
												className="w-24 h-24 object-contain"
											/>
										</div>

										{/* Details */}
										<div className="flex flex-col flex-1">
											<h3 className="font-semibold text-gray-800 dark:text-white">
												{item.product?.name}
											</h3>

											<p className="text-lg font-bold mt-1 text-gray-900 dark:text-gray-100">
												₹{item.product?.price}
											</p>

											{/* Quantity */}
											<div className="flex items-center gap-3 mt-3">
												<button
													onClick={() => decreaseQty(item)}
													className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex items-center justify-center"
												>
													-
												</button>

												<span className="font-medium dark:text-white">
													{item.quantity}
												</span>

												<button
													onClick={() => increaseQty(item)}
													className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex items-center justify-center"
												>
													+
												</button>
											</div>

											{/* Remove */}
											<button
												onClick={() => removeFromCart(item.productId)}
												className="text-red-500 text-sm mt-2 hover:underline w-fit"
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* RIGHT */}
					<div className="w-full lg:w-80 card h-fit sticky top-20">
						<h2 className="text-lg font-bold mb-4 dark:text-white">
							Order Summary
						</h2>

						<div className="flex justify-between text-gray-600 dark:text-gray-300">
							<span>Total Items</span>
							<span>{totalItems}</span>
						</div>

						<div className="flex justify-between text-xl font-semibold mt-4 dark:text-white">
							<span>Total</span>
							<span>₹{total}</span>
						</div>

						<button
							onClick={() => navigate("/checkout")}
							className="btn w-full mt-5 bg-green-600 text-white"
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
