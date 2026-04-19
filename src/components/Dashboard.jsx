import React, { useEffect, useState } from "react";
import { getAllProducts } from "../service/productApi";
import Header from "./Header";
import { useCart } from "../utils/CartContext";
import { useSearch } from "../utils/SearchContext";

const Product = ({ id, image, name, price, stock }) => {
	const { addToCart } = useCart();

	return (
		<div className="card-hover flex flex-col group">
			{/* Image */}
			<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3 flex items-center justify-center">
				<img
					src={`http://localhost:8080/api/images/${image}`}
					alt={name}
					className="h-40 object-contain group-hover:scale-105 transition duration-300"
				/>
			</div>

			{/* Title */}
			<h4 className="font-medium text-gray-800 dark:text-white line-clamp-2 min-h-[44px]">
				{name}
			</h4>

			{/* Price */}
			<p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-2">
				₹{price}
			</p>

			{/* Stock */}
			<p
				className={`text-sm mt-1 ${
					stock > 0 ? "text-green-600" : "text-red-500"
				}`}
			>
				{stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
			</p>

			{/* CTA */}
			<button
				disabled={stock === 0}
				onClick={() => addToCart(id, 1)}
				className={`btn mt-4 ${
					stock > 0
						? "bg-yellow-500 hover:bg-yellow-600 text-white"
						: "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-white"
				}`}
			>
				Add to Cart
			</button>
		</div>
	);
};

export default function Dashboard() {
	const { search } = useSearch();
	const [products, setProducts] = useState([]);
	const filteredProducts = products.filter((p) =>
		p.name.toLowerCase().includes(search.toLowerCase()),
	);
	useEffect(() => {
		getAllProducts().then((res) => setProducts(res.data));
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
			<Header />

			<div className="container py-6">
				{/* Heading */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
						Explore Products
					</h2>
				</div>

				{/* Grid */}
				{filteredProducts.length > 0 ? (
					<div className="product-grid">
						{filteredProducts.map((p) => (
							<Product
								key={p.id}
								id={p.id}
								image={p.imageId}
								name={p.name}
								price={p.price}
								stock={p.stock}
							/>
						))}
					</div>
				) : (
					<div className="text-center text-gray-500 mt-10">
						No products found 😕
					</div>
				)}
			</div>
		</div>
	);
}
