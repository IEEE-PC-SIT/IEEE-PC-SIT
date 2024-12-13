"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <header className="fixed top-0 z-40 w-full">
      {/* Marquee */}
      <div className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white text-sm py-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <a href="/upcoming-events">
             Welcome to IEEE Photonics and ComSoc! Join us for exciting events
            and activities. Stay tuned! 
          </a>
        </div>
      </div>

      {/* Navbar bg-gradient-to-r from-gray-900 via-black to-gray-800 */}
      <nav className="w-full bg-[rgba(128,128,128,0.3)] text-white rounded-2xl border-[rgba(128,128,128,0.9)] shadow-2xl backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo and Club Name */}
          <div className="flex items-center gap-4">
            <img 
              src="/logo.jpeg" // Replace with your logo path
              alt="Club Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl md:text-2xl lg:text-2xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
              IEEE Photonics & ComSoc Joint Chapter
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            {[
              { label: "Home", path: "/" },
              { label: "Upcoming Events", path: "/upcoming-events" },
              { label: "Timeline", path: "/timeline" },
              { label: "Our Team", path: "/our-team" },
              { label: "Member Login", path: "/member-login" },
            ].map(({ label, path }, idx) => (
              <li key={idx} className="relative group">
                <Link
                  href={path}
                  className="px-2 py-1 text-white hover:text-blue-500"
                >
                  {label}
                </Link>
                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-orange-500 transition-all duration-500 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Hamburger Menu */}
          <button
            onClick={toggleNav}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center"
          >
            {navOpen ? (
              <AiOutlineClose size={24} className="text-white" />
            ) : (
              <AiOutlineMenu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded-3xl overflow-hidden transition-all duration-600 ${
            navOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 py-6">
            {[
              { label: "Home", path: "/" },
              { label: "Upcoming Events", path: "/upcoming-events" },
              { label: "Timeline", path: "/timeline" },
              { label: "Our Team", path: "/our-team" },
              { label: "Member Login", path: "/member-login" },
            ].map(({ label, path }, idx) => (
              <li key={idx}>
                <Link
                  href={path}
                  onClick={toggleNav}
                  className="text-lg font-medium hover:text-blue-500 transition duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
