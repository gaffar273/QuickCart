import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/address";
import Order from "@/models/order";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request) {
    try{
        const {userId}=getAuth(request)

        const isSeller=await authSeller(userId)
        if(!isSeller){
            return NextResponse.json({success:false,message:'not authorized'})
        }

        await connectDB()

        const orders=await Order.find({}).populate('address items.product')

        return NextResponse.json({success:true,orders})
    }catch(error){
        return NextResponse.json({success:false,message:error.message})
    }
    
}