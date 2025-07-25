import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image
            className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 object-contain"
            src={assets.logo_v2}
            alt="logo"
          />
          <p className="mt-6 text-sm">
            Built for students, by students — Kartza understands your academic needs.
            Quick orders, smooth service, and trusted quality.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="hover:underline transition" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/about">About us</Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/contact">Contact us</Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>

          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p><FontAwesomeIcon icon={faPhone} className="text-gray-700 text-lg mr-2" />+91 7001656191</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="text-gray-700 text-lg mr-2" />kartzaforyou@gmail.com</p>
              <a href="https://www.instagram.com/kartzaforyou/profilecard/?igsh=NWNjcGFnb2Y0MmFi"><FontAwesomeIcon icon={faInstagram} className="text-pink-600 text-xl hover:text-pink-800" /> Follow Our Instagram page
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © KARTZA.STORE All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;