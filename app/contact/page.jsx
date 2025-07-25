import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const ContactUs = () => {
  return (
    <>
    <Navbar/>
    <section className="w-full bg-[#f5f7ff] py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3e51df] mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700 mb-10">
          We're here to help! Feel free to reach out to any of us directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#d3d7ff]">
            <h3 className="text-xl font-semibold text-[#3e51df] mb-1">Kartza Support</h3>
            <p className="text-gray-700">📞 7001656191</p>
            <p className="text-gray-700">✉️ kartzaforyou@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#d3d7ff]">
            <h3 className="text-xl font-semibold text-[#3e51df] mb-1">Abdul Gaffar</h3>
            <p className="text-gray-700">📞 7319541047</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#d3d7ff]">
            <h3 className="text-xl font-semibold text-[#3e51df] mb-1">Shariq</h3>
            <p className="text-gray-700">📞 8250289611</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-[#d3d7ff]">
            <h3 className="text-xl font-semibold text-[#3e51df] mb-1">Shifa</h3>
            <p className="text-gray-700">📞 8590942451</p>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default ContactUs;
