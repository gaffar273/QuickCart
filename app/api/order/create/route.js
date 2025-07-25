import { inngest } from "@/config/inngest";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import crypto from "crypto";


export async function POST (request){
    try{
        const auth = getAuth(request);
        console.log("getAuth result:", auth);
        const {userId} = auth;
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
        }
        const {address,items, razorpay_order_id, razorpay_payment_id, razorpay_signature, amount: clientAmount} = await request.json()

        if(!address || items.length===0 || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return NextResponse.json({success:false,message:"Invalid data or missing payment details"})
        }

        //calculate amount 
        const amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product)
            return await acc+product.offerPrice*item.quantity
        },0)

        if (amount !== clientAmount) {
            return NextResponse.json({success:false,message:"Amount mismatch"})
        }

        // Verify payment signature
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({success:false,message:"Payment verification failed"})
        }

        await Order.create({
                userId,
                address,
                items,
                amount,
                date:Date.now(),
                paymentType:'PrePaid',
                isPaid: true
        })

        //clr user cart
        const user=await User.findById(userId)
        user.cartItems={}
        await user.save()

        return NextResponse.json({success:true,message:'order placed'})
    }
    catch(error){
        return NextResponse.json({success:false,message:error.message})
    }
}