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
      handler: async function (response) {
        try {
          const verifyRes = await fetch("/api/razorpay", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId, // your internal order MongoDB ID
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("✅ Payment verified and order marked as paid!");
            window.location.reload();
          } else {
            alert("❌ Payment verification failed: " + verifyData.message);
          }
        } catch (err) {
          alert("❌ Error verifying payment: " + err.message);
        }
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
