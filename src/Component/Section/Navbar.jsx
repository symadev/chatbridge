import { Link } from "react-router-dom";

import { useState } from "react";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative">
      {/* Gradient background with glass effect */}
      <div className="navbar sticky  bg-[#010629] backdrop-blur-md bg-opacity-95 text-black px-6 py-3  top-0 z-50 shadow-2xl border-b border-white/10">


     
  
          {/* Download Button (Blue slides left → right on hover) */}
          <div>
            <button className="relative flex items-center justify-center rounded-md overflow-hidden text-white font-semibold px-8 py-3 group">
              {/* Base background (pink, stays fixed) */}
              <span className="absolute inset-0 bg-[#f3048f]"></span>

              {/* Blue half (slides left → right on hover) */}
              <span className="absolute top-0 left-0 w-1/2 h-full bg-[#030586] transform group-hover:translate-x-full transition-transform duration-500 ease-in-out"></span>

              {/* Centered Text */}
              <span className="relative z-10">Login</span>
            </button>
          </div>


      

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
        >
          <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

     
      
     
    </nav>
  );
};

export default Navbar;