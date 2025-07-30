import { useAppContext } from "@/context/AppContext";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const BookNowButton = ({ selectedAddress, cartItems, getCartAmount }) => {
  const { user, getToken, setCartItems, router } = useAppContext();

  const handleBooking = async () => {
    if (!user || !user._id) {
      toast.error('Please log in to book your order');
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
        paymentType: "Google Form", // Still using Google Form as payment type in backend
      };

      console.log("Order data being sent to backend:", orderData); // Log the data

      const { data } = await axios.post(
        '/api/order/manual-add',
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCartItems({}); // Clear cart after successful order creation
        router.push('/order-placed'); // Navigate to order placed page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Order creation failed:", error); // Log the error
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