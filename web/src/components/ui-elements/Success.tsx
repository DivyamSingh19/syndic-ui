"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface PaymentSuccessProps {
  amount?: string;
  currency?: string;
  recipient?: string;
  onComplete?: () => void;
}

const PaymentSuccess = ({
  amount = "1,250",
  currency = "₹",
  recipient = "Coffee Shop",
  onComplete,
}: PaymentSuccessProps) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/animations/GpaySuccess.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    loadAnimation();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="mb-8">
        {animationData && (
          <Lottie
            animationData={animationData}
            style={{ height: 200, width: 200 }}
            loop={false}
            autoplay={true}
          />
        )}
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">
        Payment Successful!
      </h1>
      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-green-600 mb-1">
          {currency}
          {amount}
        </p>
        <p className="text-gray-600">
          paid to <span className="font-medium">{recipient}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
