import { useState } from "react";
import { useAuthStore } from "../../Context/useAuthStore";
import Login from "../Section/Login"; 
import SignUp from "../Section/Signup";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative">
      <div className="navbar sticky top-0 z-50 flex items-center justify-between bg-[#010629]/95 backdrop-blur-md text-white px-6 py-3 shadow-2xl">
        
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center justify-center rounded-full overflow-hidden text-white bg-blue-950 hover:bg-pink-700 transition duration-300 p-2"
            >
              <img
                src="/assets/logout.png"
                alt="Logout Icon"
                className="w-8 h-8"
              />
            </button>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center justify-center rounded-full overflow-hidden text-white bg-blue-950 hover:bg-pink-700 transition duration-300 p-2"
            >
              <img
                src="/assets/login.png"
                alt="Login Icon"
                className="w-8 h-8"
              />
            </button>
          )}

          {/* Hamburger menu */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
          >
            <span
              className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <Login
        isOpen={isLoginOpen}
        onRequestClose={() => setIsLoginOpen(false)}
        openSignup={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />

      {/* Optional SignUp Modal */}
      <SignUp
        isOpen={isSignUpOpen}
        onRequestClose={() => setIsSignUpOpen(false)}
        openLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </nav>
  );
};

export default Navbar;
