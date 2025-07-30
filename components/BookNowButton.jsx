'use client';
import React from 'react';

const BookNowButton = ({ orderId, amount }) => {
  const handleBooking = () => {
    // Replace this URL with your actual Google Form link
    const googleFormUrl = "https://docs.google.com/forms/d/1BnM2WhwP4lV2CdZazEn9z6uDhUiKBQddAwBvyoaVlVs/edit?usp=drivesdk";
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