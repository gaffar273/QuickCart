import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const AboutUs = () => {
  return (
    <>
    <Navbar/>
     <section className="w-full bg-gradient-to-b from-white to-[#e8ebff] py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3e51df] mb-6">
          About Us
        </h2>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
          <span className="font-semibold text-[#3e51df]">Kartza</span> is a student-powered startup by 2nd year undergraduates at <strong>IIT Kharagpur</strong>.
          We’re here to make academic shopping seamless — fast, simple, and student-first.
        </p>

        <div className="bg-white rounded-2xl shadow-xl px-8 py-10 md:px-16 md:py-12 border border-[#d3d7ff]">
          <h3 className="text-2xl md:text-3xl font-bold text-[#3e51df] mb-4">Our Core Team</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Shariq, Abdul Gaffar, Shifa</strong>, and <strong>Okkay</strong>
          </p>
          <p className="text-base text-gray-500 italic">
            Smart minds. Strong teamwork. And yes… good looks too 😎
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default AboutUs;
