'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlaced = () => {

  const { router } = useAppContext()

  useEffect(() => {
    // Keep the redirection to my-orders after a delay
    const redirectTimer = setTimeout(() => {
      router.push('/my-orders')
    }, 5000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [router])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5" src={assets.checkmark} alt='' />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold">Order Placed Successfully</div>
      <div className="text-center text-md text-gray-600 max-w-md px-4">
        <p>Thank You for Your Order!</p>
        <p>Our team will contact you shortly after verifying your order details.</p>
        <p>You can view your order in the My Orders section.</p>
      </div>
    </div>
  )
}

export default OrderPlaced