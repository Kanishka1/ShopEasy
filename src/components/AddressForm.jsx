import { useState } from "react";

export default function AddressForm({ onNext }) {
  const [form, setForm] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <input className="input" placeholder="Full Name"
          onChange={(e)=>handleChange("fullName", e.target.value)} />

        <input className="input" placeholder="Phone"
          onChange={(e)=>handleChange("phone", e.target.value)} />

        <input className="input md:col-span-2" placeholder="Street Address"
          onChange={(e)=>handleChange("street", e.target.value)} />

        <input className="input" placeholder="City"
          onChange={(e)=>handleChange("city", e.target.value)} />

        <input className="input" placeholder="State"
          onChange={(e)=>handleChange("state", e.target.value)} />

        <input className="input" placeholder="Pincode"
          onChange={(e)=>handleChange("pincode", e.target.value)} />
      </div>

      <button
        className="btn-primary w-full mt-5 py-2 rounded-lg"
        onClick={() => onNext(form)}
      >
        Continue to Payment →
      </button>
    </div>
  );
}