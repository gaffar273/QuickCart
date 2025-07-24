import Address from "@/models/address";  // ✅ keep this
import Order from "@/models/order";
import Product from "@/models/product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        await connectDB();

        // ✅ Force models to be registered
        Address; // 👈 just referencing them ensures they get registered
        Product;

        const orders = await Order.find({ userId }).populate('address items.product');

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error("ORDER FETCH ERROR:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}
