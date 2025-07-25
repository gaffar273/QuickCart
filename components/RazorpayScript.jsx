'use client';
import Script from 'next/script';
import React from 'react';

const RazorpayScript = () => {
  return (
    <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="beforeInteractive"
    />
  );
};

export default RazorpayScript;
