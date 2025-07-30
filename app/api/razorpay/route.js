import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: false, message: "Razorpay disabled." });
}

export async function PUT() {
  return NextResponse.json({ success: false, message: "Razorpay disabled." });
}
