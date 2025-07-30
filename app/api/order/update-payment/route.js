import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Order from '@/models/order';
import connectDB from '@/config/db';

export async function POST(request) {
    try {
        // Authenticate user
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        
        // Connect to database
        await connectDB();

        // Get order ID and isPaid status from request body
        const { orderId, isPaid } = await request.json();
        
        if (!orderId) {
            return NextResponse.json({ success: false, message: 'Order ID is required' }, { status: 400 });
        }

        if (isPaid === undefined) {
            return NextResponse.json({ success: false, message: 'Payment status is required' }, { status: 400 });
        }

        // Find and update order
        const order = await Order.findByIdAndUpdate(
            orderId,
            { isPaid },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: isPaid ? 'Payment marked as completed' : 'Payment marked as pending', 
            order 
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}