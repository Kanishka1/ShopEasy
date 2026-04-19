import { useState } from "react";

export default function Payment({ onNext, onBack }) {
  const [method, setMethod] = useState("COD");

  const options = [
    { label: "Cash on Delivery", value: "COD" },
    { label: "UPI / Wallet", value: "UPI" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>

      <div className="space-y-3">
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => setMethod(opt.value)}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              method === opt.value
                ? "border-blue-600 bg-blue-50 dark:bg-blue-900"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{opt.label}</span>
              {method === opt.value && <span>✔️</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button className="btn-secondary flex-1" onClick={onBack}>
          ← Back
        </button>

        <button
          className="btn-primary flex-1"
          onClick={() => onNext(method)}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}