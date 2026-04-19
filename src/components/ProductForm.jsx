import { useState, useEffect } from "react";

export default function ProductForm({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        price: initialData.price,
      });
      setPreview(
        `http://localhost:8080/api/images/${initialData.imageId}`
      );
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);

    if (file) {
      formData.append("file", file);
    }

    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-md relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>

        {/* Name */}
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="input mb-3"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="input mb-4"
        />

        {/* Upload */}
        <label className="block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition mb-4">
          <p className="text-gray-500 dark:text-gray-400">
            📁 Click to upload image
          </p>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Preview */}
        {preview && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4 flex justify-center">
            <img
              src={preview}
              alt="preview"
              className="h-40 object-contain"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}