import { useAppContext } from "@/context/AppContext";
import React from "react";
import toast from "react-hot-toast";

const BookNowButton = () => {
  const { setCartItems, router } = useAppContext();

  const handleBooking = () => {
    // Redirect to Google Form
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdz4A3nJ1B8G7l7wVw1Xq0o5o91g5h0z9z5m0w/viewform?usp=sf_link", "_blank");
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