'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import BookNowButton from "@/components/BookNowButton";


const MyOrders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken()

            const { data } = await axios.get('/api/order/list', { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setOrders(data.orders.reverse())
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (user) {
            fetchOrders();
        }

    }, [user]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base">
                                            {order.items.map((item) => (item.product?.name || "Unnamed Product") + ` x ${item.quantity}`).join(", ")}

                                        </span>
                                        <span>Items : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">{order.address.fullName}</span>
                                        <br />
                                        <span>{order.address.hallOfResidence}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-medium my-auto">{currency}{order.amount}</p>
                                <div className="flex flex-col gap-1">
                                    <span>Method : {order.paymentType}</span>
                                    <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                    <span>Payment : {order.isPaid ? "✅ Paid" : "❌ Pending"}</span>
                                    <span>Status: <span className="text-orange-600">{order.status || "Verification Pending"}</span></span>
                                    <div className="text-xs text-gray-500 mt-1">Our team will contact you shortly</div>
                                    {!order.isPaid && (
                                        <BookNowButton orderId={order._id} amount={order.amount} />
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;