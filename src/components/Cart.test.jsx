import { render, screen } from "@testing-library/react";
import Cart from "../components/Cart";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";

// 🔥 Mock contexts
vi.mock("../utils/CartContext", () => ({
	useCart: vi.fn(),
}));

vi.mock("../utils/AuthContext", () => ({
	useAuth: vi.fn(),
}));

vi.mock("../utils/SearchContext", () => ({
	useSearch: vi.fn(),
}));

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

// 🔥 Import mocked hooks
import { useCart } from "../utils/CartContext";
import { useAuth } from "../utils/AuthContext";
import { useSearch } from "../utils/SearchContext";
import { useTheme } from "../utils/ThemeContext";

// 🔥 Helper render
const renderComponent = () => {
	return render(
		<MemoryRouter>
			<Cart />
		</MemoryRouter>,
	);
};

describe("Cart Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		useCart.mockReturnValue({
			cart: [
				{
					productId: "1",
					quantity: 2,
					product: {
						name: "Book",
						price: 500,
						imageId: "img1",
					},
				},
				{
					productId: "2",
					quantity: 1,
					product: {
						name: "Pen",
						price: 100,
						imageId: "img2",
					},
				},
			],
			addToCart: vi.fn(),
			removeFromCart: vi.fn(),
		});

		useAuth.mockReturnValue({
			token: "123",
			logout: vi.fn(),
		});

		useSearch.mockReturnValue({
			search: "",
			setSearch: vi.fn(),
		});

		useTheme.mockReturnValue({
			isDark: false,
			toggleTheme: vi.fn(),
		});
	});

	// ✅ 1. Renders cart items
	test("renders cart items correctly", () => {
		renderComponent();

		expect(screen.getByTestId("product-name-1")).toHaveTextContent("Book");
		expect(screen.getByTestId("product-name-2")).toHaveTextContent("Pen");
	});

	// ✅ 2. Total calculation
	test("calculates total correctly", () => {
		renderComponent();

		// Book → 500 * 2 = 1000
		// Pen → 100 * 1 = 100
		// Total = 1100

		expect(screen.getByTestId("cart-total")).toHaveTextContent("₹1100");
	});

	// ✅ 3. Quantity rendering
	test("shows correct quantities", () => {
		renderComponent();

		expect(screen.getByTestId("qty-1")).toBeInTheDocument();
		expect(screen.getByTestId("qty-2")).toBeInTheDocument();
	});

	// ✅ 4. Empty cart state
	test("shows empty cart message", () => {
		useCart.mockReturnValue({
			cart: [],
			addToCart: vi.fn(),
			removeFromCart: vi.fn(),
		});

		renderComponent();

		expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
	});

	// ✅ 5. Quantity Increase
	test("increase quantity calls addToCart", () => {
		const mockAddToCart = vi.fn();

		useCart.mockReturnValue({
			cart: [
				{
					productId: "1",
					quantity: 2,
					product: { name: "Book", price: 500 },
				},
			],
			addToCart: mockAddToCart,
			removeFromCart: vi.fn(),
		});

		renderComponent();

		const plusBtn = screen.getByTestId("increase-1")

		plusBtn.click();

		expect(mockAddToCart).toHaveBeenCalledWith("1", 1);
	});

	// ✅ 6. Quantity Decrease

	test("decrease quantity calls addToCart with -1", () => {
		const mockAddToCart = vi.fn();

		useCart.mockReturnValue({
			cart: [
				{
					productId: "1",
					quantity: 2,
					product: { name: "Book", price: 500 },
				},
			],
			addToCart: mockAddToCart,
			removeFromCart: vi.fn(),
		});

		renderComponent();

		const minusBtn = screen.getByTestId("decrease-1")

		minusBtn.click();

		expect(mockAddToCart).toHaveBeenCalledWith("1", -1);
	});

	// ✅ 6. Remove from cart
	test("remove button calls removeFromCart", () => {
		const mockRemove = vi.fn();

		useCart.mockReturnValue({
			cart: [
				{
					productId: "1",
					quantity: 2,
					product: { name: "Book", price: 500 },
				},
			],
			addToCart: vi.fn(),
			removeFromCart: mockRemove,
		});

		renderComponent();

		const removeBtn = screen.getByTestId("remove-1")

		removeBtn.click();

		expect(mockRemove).toHaveBeenCalledWith("1");
	});
});
