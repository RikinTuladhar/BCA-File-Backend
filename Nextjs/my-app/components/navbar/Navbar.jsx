import { logout } from "@/app/lib/session";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-2xl font-bold text-white">
          KBC-Notes
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <Link href="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link href="/show" className="text-white hover:text-gray-200">
            Show
          </Link>
          <Link href="/edit" className="text-white hover:text-gray-200">
            Services
          </Link>
          <button onClick={()=>logout()} className="text-white hover:text-gray-200">
            Log Out
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"} mt-4`}>
        <a href="/" className="block py-2 text-white hover:text-gray-200">
          Home
        </a>
        <a href="/about" className="block py-2 text-white hover:text-gray-200">
          About
        </a>
        <a
          href="/services"
          className="block py-2 text-white hover:text-gray-200"
        >
          Services
        </a>
        <a
          href="/contact"
          className="block py-2 text-white hover:text-gray-200"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;