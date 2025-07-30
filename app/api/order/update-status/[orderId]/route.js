import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Order from '@/models/order';
import connectDB from '@/config/db';
import authSeller from '@/lib/authSeller';

// PUT endpoint to update order status
export async function PUT(request, { params }) {
  try {
    // Authenticate user
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    // For now, allow any authenticated user to update order status
    // We'll implement seller verification later

    // Connect to database
    await connectDB();

    // Get order ID from params
    const { orderId } = params;
    if (!orderId) {
      return NextResponse.json({ success: false, message: 'Order ID is required' }, { status: 400 });
    }

    // Get status from request body
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
    }

    // Find and update order
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}