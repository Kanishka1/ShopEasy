import { useNavigate } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import { useTheme } from "../utils/ThemeContext";
import { useSearch } from "../utils/SearchContext";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
const Header = () => {
	const navigate = useNavigate();
	const { token, logout } = useAuth();
	const { cart } = useCart();
	const { setSearch } = useSearch();
	const [input, setInput] = useState("");
	const { isDark, toggleTheme } = useTheme();

	const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0);
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearch(input);
		}, 300);

		return () => clearTimeout(timer);
	}, [input]);

	return (
		<div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
			{/* Logo */}
			<div className="flex flex-row items-center">
				
				<img
				src="/login-logo.png"
				alt="logo"
				className="w-12 h-12 cursor-pointer"
				onClick={() => navigate("/dashboard")}
			/>
			<h1 className="font-bold">Shop Easy</h1>
			</div>
			

			{/* Search */}
			{token && (
				<div className="flex-1 mx-6">
					<input
						placeholder="Search products..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="input w-20"
					/>
				</div>
			)}

			{/* Right */}
			<div className="flex items-center gap-3">
				{token ? (
					<>
						{/* 🌙 Theme (icon style) */}
						<button
							onClick={toggleTheme}
							className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
						>
							{isDark ? "☀️" : "🌙"}
						</button>

						{/* 🛒 Cart (bigger + clearer) */}
						<div
							className="relative cursor-pointer text-2xl hover:scale-110 transition"
							onClick={() => navigate("/cart")}
						>
							🛒
							{totalItems > 0 && <span className="badge">{totalItems}</span>}
						</div>

						{/* 🚪 Logout (subtle, not primary) */}
						<button
							onClick={logout}
							className="px-3 py-1 text-sm border rounded-lg border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition"
						>
							Logout
						</button>

						{/* Order History */}

						<button
							onClick={() => navigate("/order-history")}
							className="btn-secondary px-3 py-1 text-sm border rounded-lg border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition"
						>
							Orders
						</button>
					</>
				) : (
					<>
						{/* Login (secondary) */}
						<button
							onClick={() => navigate("/")}
							className="px-4 py-2 text-sm border rounded-lg border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition"
						>
							Login
						</button>

						{/* Sign Up (primary CTA) */}
						<button
							onClick={() => navigate("/register")}
							className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
						>
							Sign Up
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
