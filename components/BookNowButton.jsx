import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const BookNowButton = ({ orderId, amount }) => {
  const { getToken } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setIsLoading(true);
      
      // First, open the Google Form in a new tab
      const googleFormUrl = "https://docs.google.com/forms/d/1BnM2WhwP4lV2CdZazEn9z6uDhUiKBQddAwBvyoaVlVs/viewform";
      const formWithParams = `${googleFormUrl}?usp=pp_url&entry.12345=${orderId}&entry.67890=${amount}`;
      window.open(formWithParams, '_blank');
      
      // Then update the payment status to paid
      const token = await getToken();
      const { data } = await axios.post('/api/order/update-payment', 
        { orderId, isPaid: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (data.success) {
        toast.success("Payment status updated successfully!");
        // Reload the page to show updated payment status
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to update payment status");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={isLoading}
      className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'} text-white py-3 mt-5`}
    >
      {isLoading ? "Processing..." : "Book Your Order"}
    </button>
  );
};

export default BookNowButton;