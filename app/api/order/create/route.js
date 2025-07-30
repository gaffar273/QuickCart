import { inngest } from "@/config/inngest";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST (request){
    try{
        const auth = getAuth(request);
        console.log("getAuth result:", auth);
        const {userId} = auth;
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
        }
        const {address,items, amount: clientAmount} = await request.json()

        if(!address || items.length===0){
            return NextResponse.json({success:false,message:"Invalid data"})
        }

        //calculate amount 
        const amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product)
            return await acc+product.offerPrice*item.quantity
        },0)

        if (amount !== clientAmount) {
            return NextResponse.json({success:false,message:"Amount mismatch"})
        }

        await Order.create({
                userId,
                address,
                items,
                amount,
                date:Date.now(),
                paymentType:'Booking',
                isPaid: false
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