'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import BookNowButton from '@/components/BookNowButton';


const Orders = () => {
  const { currency, getToken, user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatuses, setOrderStatuses] = useState({}); // State to hold selected statuses

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/order/seller-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setOrders(data.orders);
        // Initialize orderStatuses with current order statuses
        const initialStatuses = {};
        data.orders.forEach(order => {
          initialStatuses[order._id] = order.status || 'Pending'; // Default to Pending if status is not set
        });
        setOrderStatuses(initialStatuses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatuses(prevStatuses => ({
      ...prevStatuses,
      [orderId]: newStatus
    }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const token = await getToken();
      const newStatus = orderStatuses[orderId];
      const { data } = await axios.post('/api/order/update-status', {
        orderId,
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success('Order status updated successfully!');
        // Update the order in the local state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerOrders();
    }
  }, [user]);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orders.map((order) => (
              <div key={order._id} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300">
                {/* Order Items */}
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={assets.box_icon}
                    alt="box_icon"
                  />
                  <p className="flex flex-col gap-3">
                    <span className="font-medium">
                      {order.items.map((item) => `${item.product.name} x ${item.quantity}`).join(", ")}
                    </span>
                    <span>Items: {order.items.length}</span>
                  </p>
                </div>

                {/* Address */}
                <div>
                  <p>
                    <span className="font-medium">{order.address.fullName}</span><br />
                    <span>{order.address.area}</span><br />
                    <span>{`${order.address.city}, ${order.address.state}`}</span><br />
                    <span>{order.address.phoneNumber}</span>
                  </p>
                </div>

                {/* Amount + Pay Now */}
                <div className="flex flex-col justify-between my-auto">
                  <p className="font-medium">{currency}{order.amount}</p>
                  {!order.isPaid && order.paymentType === 'Prepaid' && (
                    <BookNowButton orderId={order._id} amount={order.amount} />
                  )}
                </div>

                {/* Payment Info and Status Update */}
                <div className="flex flex-col justify-between">
                  <p className="flex flex-col">
                    <span>Method: {order.paymentType}</span>
                    <span>Payment: {order.isPaid ? "✅ Paid" : "❌ Pending"}</span>
                    <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <select
                      value={orderStatuses[order._id] || ''}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border rounded p-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => updateOrderStatus(order._id)}
                      className="bg-[#3e51df] text-white px-3 py-1 rounded text-sm"
                    >
                      Update Status
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">Current Status: {order.status || 'Pending'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
