import { useAppContext } from "@/context/AppContext";
import React from "react";
import toast from "react-hot-toast";

const BookNowButton = () => {
  const { setCartItems, router } = useAppContext();

  const handleBooking = () => {
    // Redirect to the updated Google Form link
    window.open("https://docs.google.com/forms/d/1BnM2WhwP4lV2CdZazEn9z6uDhUiKBQddAwBvyoaVlVs/viewform?edit_requested=true", "_blank");
    // Optionally, clear cart and navigate to order placed page after redirect
    setCartItems({}); // Clear cart
    router.push('/order-placed'); // Navigate to order placed page
  };

  return (
    <button
      onClick={handleBooking}
      className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
    >
      Book Your Order
    </button>
  );
};

export default BookNowButton;