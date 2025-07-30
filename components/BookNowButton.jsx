'use client';
import React from 'react';

const BookNowButton = ({ orderId, amount }) => {
  const handleBooking = () => {
    // Replace this URL with your actual Google Form link
    const googleFormUrl = "https://forms.google.com/your-form-id";
    window.open(googleFormUrl, '_blank');
  };

  return (
    <button
      className="bg-[#3e51df] text-white px-4 py-2 rounded hover:bg-[#3240b5] transition"
      onClick={handleBooking}
    >
      Book Your Order
    </button>
  );
};

export default BookNowButton; 