import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, address, items, amount, paymentType } = await request.json();

        if (!userId || !address || !items || amount === undefined || !paymentType) {
            return NextResponse.json({ success: false, message: "Invalid data provided" }, { status: 400 });
        }

        // Check if paymentType is "Google Form"
        if (paymentType !== "Google Form") {
            return NextResponse.json({ success: false, message: "Only Google Form payment type is allowed" }, { status: 400 });
        }

        const newOrder = await Order.create({
            userId,
            address,
            items,
            amount,
            date: Date.now(),
            paymentType: "Google Form", // Hardcoded to Google Form as per requirement
            isPaid: false, // Initially set as not paid
            status: 'Booked' // Set the initial status to Booked
        });

        return NextResponse.json({ success: true, message: "Order added successfully", order: newOrder });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}