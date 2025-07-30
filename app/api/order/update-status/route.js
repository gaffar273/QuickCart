import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { orderId, status } = await request.json();

        if (!orderId || !status) {
            return NextResponse.json({ success: false, message: "Invalid data" }, { status: 400 });
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Order status updated", order });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}