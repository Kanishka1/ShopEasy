export default function DeleteModal({ product, onConfirm, onClose }) {
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

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
            <span className="text-red-600 dark:text-red-400 text-3xl">
              🗑️
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          Delete Product
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            {product?.name}
          </span>
          ?
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          
          <button
            onClick={onClose}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(product.id)}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}