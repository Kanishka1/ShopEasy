import { useState } from "react";
import Header from "./Header";
import AddressForm from "./AddressForm";
import Payment from "./Payment";
import Review from "./Review";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState("COD");

  const steps = ["Address", "Payment", "Review"];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Stepper */}
        <div className="flex justify-between mb-6">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${
                  step === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="card">
          {step === 1 && (
            <AddressForm
              onNext={(data) => {
                setAddress(data);
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <Payment
              onNext={(method) => {
                setPayment(method);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Review
              address={address}
              payment={payment}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>
    </div>
  );
}