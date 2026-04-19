import { useState } from "react";
import { loginUser } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Header from "./Header";
import toast from "react-hot-toast";

function Login() {
	const [form, setForm] = useState({ email: "", password: "" });
	const navigate = useNavigate();
	const { login } = useAuth();

	const isInvalid = !form.email || !form.password;

	const handleGoogleLogin = () => {
		window.location.href = "http://localhost:8080/oauth2/authorization/google";
	};
	const handleLogin = async () => {
		try {
			const res = await loginUser(form);

			login(res.data);

			if (res.data.role === "ROLE_ADMIN") {
				navigate("/admin-dashboard");
			} else {
				navigate("/dashboard");
			}
		} catch (err) {
			toast.error("Invalid credentials");
		}
	};

	return (
		<>
			<Header />

			{/* 🔥 Background FIX */}
			<div
				className="min-h-screen flex items-center justify-center px-4 
        bg-gray-100 dark:bg-gray-900 transition"
			>
				{/* 🔥 Card */}
				<div
					className="w-full max-w-md rounded-2xl p-8 shadow-xl 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          backdrop-blur-md"
				>
					{/* Logo / Icon */}
					<div className="flex justify-center mb-4">
						<div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl shadow-md">
							🛍️
						</div>
					</div>

					{/* Heading */}
					<h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
						Welcome Back 👋
					</h2>
					<p className="text-gray-500 dark:text-gray-400 text-center mb-6">
						Login to continue shopping
					</p>

					{/* Inputs */}
					<div className="flex flex-col gap-4">
						<input
							type="email"
							placeholder="Email"
							className="input focus:ring-2 focus:ring-blue-500"
							onChange={(e) => setForm({ ...form, email: e.target.value })}
						/>

						<input
							type="password"
							placeholder="Password"
							className="input focus:ring-2 focus:ring-blue-500"
							onChange={(e) => setForm({ ...form, password: e.target.value })}
						/>
					</div>

					{/* Button */}
					<button
						onClick={handleLogin}
						disabled={isInvalid}
						className={`w-full mt-6 py-2.5 rounded-lg font-medium transition
              ${
								isInvalid
									? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
							}`}
					>
						Login
					</button>
					{/* Divider */}
					<div className="flex items-center my-6">
						<div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
						<span className="mx-3 text-sm text-gray-400">OR</span>
						<div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
					</div>

					{/* Google Button */}
					<button
						onClick={handleGoogleLogin}
						className="w-full flex items-center justify-center gap-3 
    py-2.5 rounded-lg border 
    border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-700
    hover:bg-gray-50 dark:hover:bg-gray-600
    transition shadow-sm hover:shadow-md active:scale-[0.98]"
					>
						<img
							src="https://developers.google.com/identity/images/g-logo.png"
							alt="google"
							className="w-5 h-5"
						/>

						<span className="text-gray-700 dark:text-white font-medium">
							Continue with Google
						</span>
					</button>

					{/* Footer */}
					<p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-5">
						Don’t have an account?{" "}
						<span
							className="text-blue-600 cursor-pointer hover:underline"
							onClick={() => navigate("/register")}
						>
							Sign up
						</span>
					</p>
				</div>
			</div>
		</>
	);
}

export default Login;
