'use client';
import React from 'react';

const PayNowButton = ({ orderId, amount }) => {

  const handlePayment = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, orderId }), // backend will create Razorpay order
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // ✅ from .env.local
      amount: data.amount,
      currency: "INR",
      name: "Kartza",
      description: "Order Payment",
      order_id: data.orderId,
      handler: function (response) {
        alert("✅ Payment successful!");
        // Optionally, you can send this response to your backend to mark order paid
      },
      prefill: {
        name: "IITian", // Optional
        email: "iitkgp@kartza.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3e51df",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <button
      className="bg-[#3e51df] text-white px-4 py-2 rounded hover:bg-[#3240b5] transition"
      onClick={handlePayment}
    >
      Pay Now
    </button>
  );
};

export default PayNowButton;
