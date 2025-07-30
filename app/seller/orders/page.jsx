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

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/order/seller-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
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
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">Payment Status:</label>
                      <div className="flex items-center gap-2 mt-1">
                        <select 
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          value={order.isPaid ? "true" : "false"}
                          onChange={async (e) => {
                            try {
                              setLoading(true);
                              const token = await getToken();
                              const isPaid = e.target.value === "true";
                              const { data } = await axios.post('/api/order/update-payment', 
                                { orderId: order._id, isPaid },
                                { headers: { Authorization: `Bearer ${token}` } }
                              );
                              if (data.success) {
                                toast.success("Payment status updated successfully");
                                // Update the order in the local state immediately
                                setOrders(prevOrders =>
                                  prevOrders.map(o =>
                                    o._id === order._id ? { ...o, isPaid } : o
                                  )
                                );
                                // Then refresh all orders to ensure consistency
                                fetchSellerOrders();
                              } else {
                                toast.error(data.message);
                              }
                            } catch (error) {
                              console.error("Payment update error:", error);
                              toast.error(error.response?.data?.message || "Failed to update payment status");
                            } finally {
                              setLoading(false);
                            }
                          }}
                        >
                          <option value="true">Paid</option>
                          <option value="false">Pending</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">Order Status:</label>
                      <select 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={order.status || "Verification Pending"}
                        onChange={async (e) => {
                          try {
                            setLoading(true);
                            const token = await getToken();
                            const newStatus = e.target.value;
                            const { data } = await axios.put(`/api/order/update-status/${order._id}`, 
                              { status: newStatus },
                              { headers: { Authorization: `Bearer ${token}` } }
                            );
                            if (data.success) {
                              toast.success("Status updated successfully");
                              // Update the order in the local state immediately
                              setOrders(prevOrders =>
                                prevOrders.map(o =>
                                  o._id === order._id ? { ...o, status: newStatus } : o
                                )
                              );
                              // Then refresh all orders to ensure consistency
                              fetchSellerOrders();
                            } else {
                              toast.error(data.message);
                            }
                          } catch (error) {
                            console.error("Status update error:", error);
                            toast.error(error.response?.data?.message || "Failed to update status");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        <option value="Verification Pending">Verification Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </p>
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
