import { useEffect, useState } from "react";
import Header from "./Header";
import {
  getAllProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../service/productApi";
import ProductForm from "./ProductForm";
import DeleteModal from "./DeleteModal";

export default function AdminDashBoard() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [deleteProductData, setDeleteProductData] = useState(null);

  const fetchData = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    await addProduct(data);
    setShowModal(false);
    fetchData();
  };

  const handleUpdate = async (data) => {
    await updateProduct(editProductData.id, data);
    setEditProductData(null);
    setShowModal(false);
    fetchData();
  };

  const handleDeleteConfirm = async (id) => {
    await deleteProduct(id);
    setDeleteProductData(null);
    fetchData();
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />

      <div className="container py-6">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Admin Panel ⚙️
          </h1>

          <button
            onClick={() => {
              setEditProductData(null);
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            + Add Product
          </button>
        </div>

        {/* Modals */}
        {showModal && (
          <ProductForm
            initialData={editProductData}
            onClose={() => {
              setShowModal(false);
              setEditProductData(null);
            }}
            onSubmit={editProductData ? handleUpdate : handleAdd}
          />
        )}

        {deleteProductData && (
          <DeleteModal
            product={deleteProductData}
            onConfirm={handleDeleteConfirm}
            onClose={() => setDeleteProductData(null)}
          />
        )}

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No products found 😕
          </div>
        ) : (
          <div className="product-grid">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="card-hover flex flex-col group"
              >
                {/* Image */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3 flex items-center justify-center">
                  <img
                    src={`http://localhost:8080/api/images/${prod.imageId}`}
                    alt={prod.name}
                    className="h-40 object-contain group-hover:scale-105 transition"
                  />
                </div>

                {/* Info */}
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {prod.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  ₹{prod.price}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-4">
                  
                  <button
                    onClick={() => {
                      setEditProductData(prod);
                      setShowModal(true);
                    }}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteProductData(prod)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}