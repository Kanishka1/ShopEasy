import Login from "./Login";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import OrderSuccess from "./OrderSuccess";
import ProtectedRoute from "./ProtectedRoute";
import { CartProvider } from "../utils/CartContext";
import AdminDashBoard from "./AdminDashBoard";
import Cart from "./Cart";
import { ThemeProvider } from "../utils/ThemeContext";
import { SearchProvider } from "../utils/searchContext";
import { AuthProvider } from "../utils/AuthContext";
import { Toaster } from "react-hot-toast";
import OrderHistory from "./OrderHistory";
import Checkout from "./Checkout";

const Body = () => {
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/register",
			element: <SignUp />,
		},
		{
			path: "/error",
			element: <Error />,
		},
		{
			path: "/dashboard",
			element: (
				<ProtectedRoute>
					<Dashboard />
				</ProtectedRoute>
			),
		},
		{
			path: "/admin-dashboard",
			element: (
				<ProtectedRoute role="ROLE_ADMIN">
					<AdminDashBoard />
				</ProtectedRoute>
			),
		},
		{
			path: "/order-success",
			element: (
				<ProtectedRoute>
					<OrderSuccess />
				</ProtectedRoute>
			),
		},
		{
			path: "/order-history",
			element: (
				<ProtectedRoute>
					<OrderHistory/>
				</ProtectedRoute>
			),
		},
		{
			path: "/checkout",
			element: (
				<ProtectedRoute>
					<Checkout />
				</ProtectedRoute>
			),
		},
		{
			path: "/cart",
			element: (
				<ProtectedRoute role="ROLE_USER">
					<Cart />
				</ProtectedRoute>
			),
		},
	]);
	return (
		<div>
			<AuthProvider>
				<ThemeProvider>
					<CartProvider>
						<SearchProvider>
							<RouterProvider router={appRouter} />
							<Toaster position="bottom-right" />
						</SearchProvider>
					</CartProvider>
				</ThemeProvider>
			</AuthProvider>
		</div>
	);
};

//

export default Body;
