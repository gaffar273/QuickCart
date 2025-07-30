import { useAppContext } from "@/context/AppContext";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const BookNowButton = ({ selectedAddress, cartItems, getCartAmount }) => {
  const { user, getToken, setCartItems, router } = useAppContext();

  const handleBooking = async () => {
    if (!user || !user._id) {
      toast.error('Please log in to book your order');
      // Optionally, redirect to login page
      // router.push('/login');
      return;
    }

    if (!selectedAddress) {
      return toast.error('Please select an address');
    }

    let cartItemsArray = Object.keys(cartItems).map((key) => ({
      product: key,
      quantity: cartItems[key],
    }));
    cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0);

    if (cartItemsArray.length === 0) {
      return toast.error('Your cart is empty');
    }

    try {
      const token = await getToken();
      const amount = getCartAmount();

      const orderData = {
        userId: user._id,
        address: selectedAddress._id,
        items: cartItemsArray,
        amount,
        paymentType: "Google Form",
      };

      console.log("Order data being sent:", orderData); // Log the data

      const { data } = await axios.post(
        '/api/order/manual-add',
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCartItems({}); // Clear cart after successful order
        // Redirect to Google Form after successful order creation in backend
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdz4A3nJ1B8G7l7wVw1Xq0o5o91g5h0z9z5m0w/viewform?usp=sf_link", "_blank");
        router.push('/order-placed');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Order booking failed:", error); // Log the error
      toast.error(error.message);
    }
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