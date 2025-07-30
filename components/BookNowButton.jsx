'use client';
import React from 'react';

const BookNowButton = ({ orderId, amount }) => {
  const handleBooking = () => {
    // Replace this URL with your actual Google Form link
    // Adding order details as URL parameters for pre-filling the form
    const googleFormUrl = "https://docs.google.com/forms/d/1BnM2WhwP4lV2CdZazEn9z6uDhUiKBQddAwBvyoaVlVs/viewform";
    
    // Add order details as URL parameters
    const formWithParams = `${googleFormUrl}?usp=pp_url&entry.12345=${orderId}&entry.67890=${amount}`;
    
    // Open the form in a new tab
    window.open(formWithParams, '_blank');
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