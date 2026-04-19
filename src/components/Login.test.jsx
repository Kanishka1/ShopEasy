import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login";
import { MemoryRouter } from "react-router-dom";
import { loginUser } from "../service/apiAuth";
import { useAuth } from "../utils/AuthContext";
import { useTheme } from "../utils/ThemeContext";
import toast from "react-hot-toast";
import { describe, test, expect, beforeEach, vi } from "vitest";

// 🔥 Mock API
vi.mock("../service/apiAuth", () => ({
	loginUser: vi.fn(),
}));

// 🔥 Mock AuthContext (ONLY ONCE ✅)
vi.mock("../utils/AuthContext", () => ({
	useAuth: vi.fn(),
}));

// 🔥 Mock CartContext
vi.mock("../utils/CartContext", () => ({
	useCart: vi.fn(),
}));

// 🔥 Mock SearchContext
vi.mock("../utils/SearchContext", () => ({
	useSearch: vi.fn(),
}));

// 🔥 Mock toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// 🔥 Mock Theme Context
vi.mock("../utils/ThemeContext", () => ({
	useTheme: vi.fn(),
}));

// 🔥 Mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");

	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

// 🔥 Import mocked hooks AFTER mocking
import { useCart } from "../utils/CartContext";
import { useSearch } from "../utils/SearchContext";

// 🔥 Helper render
const renderComponent = () => {
	return render(
		<MemoryRouter>
			<Login />
		</MemoryRouter>,
	);
};

describe("Login Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		// ✅ Setup mocks properly
		useAuth.mockReturnValue({
			login: vi.fn(),
			token: null,
			logout: vi.fn(),
		});

		useCart.mockReturnValue({
			cart: [],
			addToCart: vi.fn(),
			removeFromCart: vi.fn(),
		});

		useSearch.mockReturnValue({
			setSearch: vi.fn(),
		});
		useTheme.mockReturnValue({
			isDark: false,
			toggleTheme: vi.fn(),
		});
	});

	// ✅ 1. Render
	test("renders login form", () => {
		renderComponent();
		expect(screen.getByTestId("welcome")).toBeInTheDocument();
		expect(screen.getByTestId("email-input")).toBeInTheDocument();
		expect(screen.getByTestId("password-input")).toBeInTheDocument();
		expect(screen.getByTestId("login-btn")).toBeInTheDocument();
	});

	// ✅ 2. Input typing
	test("user can type email and password", () => {
		renderComponent();

		const emailInput = screen.getByTestId("email-input");
		const passwordInput = screen.getByTestId("password-input");

		fireEvent.change(emailInput, {
			target: { value: "test@mail.com" },
		});

		fireEvent.change(passwordInput, {
			target: { value: "123456" },
		});

		expect(emailInput.value).toBe("test@mail.com");
		expect(passwordInput.value).toBe("123456");
	});

	// ✅ 3. Button disabled initially
	test("login button disabled when fields are empty", () => {
		renderComponent();

		const button = screen.getByTestId("login-btn");
		expect(button).toBeDisabled();
	});

	// ✅ 4. Successful login (USER)
	test("logs in successfully and navigates to dashboard", async () => {
		const mockLogin = vi.fn();

		useAuth.mockReturnValue({
			login: mockLogin,
			token: null,
			logout: vi.fn(),
		});

		loginUser.mockResolvedValue({
			data: {
				token: "123",
				role: "ROLE_USER",
				userId: "u1",
			},
		});

		renderComponent();

		fireEvent.change(screen.getByPlaceholderText("Email"), {
			target: { value: "test@mail.com" },
		});

		fireEvent.change(screen.getByPlaceholderText("Password"), {
			target: { value: "123456" },
		});

		fireEvent.click(screen.getByTestId("login-btn"));

		await waitFor(() => {
			expect(loginUser).toHaveBeenCalled();
			expect(mockLogin).toHaveBeenCalled();
			expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
		});
	});

	// ✅ 5. Admin navigation
	test("navigates to admin dashboard for admin role", async () => {
		loginUser.mockResolvedValue({
			data: {
				token: "123",
				role: "ROLE_ADMIN",
				userId: "u1",
			},
		});

		renderComponent();

		fireEvent.change(screen.getByPlaceholderText("Email"), {
			target: { value: "admin@mail.com" },
		});

		fireEvent.change(screen.getByPlaceholderText("Password"), {
			target: { value: "admin123" },
		});

		fireEvent.click(screen.getByTestId("login-btn"));

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith("/admin-dashboard");
		});
	});

	// ✅ 6. Error case
	test("shows error toast on login failure", async () => {
		loginUser.mockRejectedValue(new Error("Invalid"));

		renderComponent();

		fireEvent.change(screen.getByTestId("email-input"), {
			target: { value: "wrong@mail.com" },
		});

		fireEvent.change(screen.getByTestId("password-input"), {
			target: { value: "wrongpass" },
		});

		fireEvent.click(screen.getByTestId("login-btn"));


		await waitFor(() => {
			expect(toast.error).toHaveBeenCalled();
		});
    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
	});

  
});
