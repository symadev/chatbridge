import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Context/useAuthStore";
import Login from "../Section/Login";
import Signup from "../Section/Signup";

const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    //  modal states
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignupOpen, setSignupOpen] = useState(false);

    //  modal control functions
    const openLoginModal = () => setLoginOpen(true);
    const closeLoginModal = () => setLoginOpen(false);

    const openSignupModal = () => setSignupOpen(true);
    const closeSignupModal = () => setSignupOpen(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate("/chat");
        } else {
            openLoginModal();
        }
    };

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#010629] via-[#0a0e3d] to-[#010629] min-h-screen flex items-center">
            {/*  Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
                    style={{
                        top: `${mousePosition.y * 0.5}%`,
                        left: `${mousePosition.x * 0.5}%`,
                        transform: "translate(-50%, -50%)",
                        transition: "all 0.3s ease-out",
                    }}
                />
                <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/*  Grid Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />

            {/*  Content Section */}
            <div className="relative z-10 container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Text Content */}
                    <div
                        className={`flex-1 text-left max-w-2xl ml-4 transform transition-all duration-1000 ${isVisible
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-10 opacity-0"
                            }`}
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 animate-pulse">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>Powered by GPT-4o</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-2xl">
                                ChatBridge
                            </span>
                            <div className="flex items-center gap-3 mt-3">
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent font-black">
                                        AI Assistant
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent blur-lg opacity-50 animate-pulse">
                                        AI Assistant
                                    </span>
                                </span>
                                <div className="relative">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                                </div>
                            </div>
                        </h1>

                        <div className="mb-10 space-y-3">
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                                Transform the way you work with
                            </p>
                            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                AI-powered conversations
                            </p>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl">
                                Experience next-generation intelligence that understands context,
                                learns from interactions, and delivers instant, accurate responses.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                onClick={handleClick}
                                className="group relative inline-flex items-center justify-center rounded-xl overflow-hidden text-white font-bold px-10 py-4 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
                            >
                                <span
                                    className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 animate-gradient"
                                    style={{ backgroundSize: "200% 200%" }}
                                />
                                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started Free
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Image Section with Enhanced Animations */}
                    <div className={`flex-1 flex justify-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        }`}>
                        <div className="relative flex items-center justify-center">
                            {/* Multiple Circular Animations Background */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                                {/* Circle 1 - Largest with Glow */}
                                <div className="absolute">
                                    <svg
                                        width="600"
                                        height="600"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <circle cx="300" cy="300" r="280" fill="none" stroke="url(#gradient1)" strokeWidth="3" opacity="0.6" />
                                        <defs>
                                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ec4899" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div
                                        className="absolute top-1/2 left-1/2 animate-spin"
                                        style={{ animationDuration: "8s" }}
                                    >
                                        <div
                                            className="absolute w-6 h-6 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full shadow-2xl shadow-pink-500/80"
                                            style={{
                                                transform: "translate(-50%, -280px)",
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-75" />
                                        </div>
                                    </div>
                                </div>

                                {/* Circle 2 - Medium */}
                                <div className="absolute">
                                    <svg
                                        width="500"
                                        height="500"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <circle cx="250" cy="250" r="230" fill="none" stroke="url(#gradient2)" strokeWidth="3" opacity="0.5" />
                                        <defs>
                                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div
                                        className="absolute top-1/2 left-1/2 animate-spin"
                                        style={{ animationDuration: "6s", animationDirection: "reverse" }}
                                    >
                                        <div
                                            className="absolute w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-2xl shadow-blue-500/80"
                                            style={{
                                                transform: "translate(-50%, -230px)",
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
                                        </div>
                                    </div>
                                </div>

                                {/* Circle 3 - Small */}
                                <div className="absolute">
                                    <svg
                                        width="400"
                                        height="400"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <circle cx="200" cy="200" r="180" fill="none" stroke="url(#gradient3)" strokeWidth="3" opacity="0.4" />
                                        <defs>
                                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#8b5cf6" />
                                                <stop offset="100%" stopColor="#ec4899" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div
                                        className="absolute top-1/2 left-1/2 animate-spin"
                                        style={{ animationDuration: "5s" }}
                                    >
                                        <div
                                            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-2xl shadow-purple-500/80"
                                            style={{
                                                transform: "translate(-50%, -180px)",
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75" />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Main image with enhanced effects */}
                            <div className="relative z-10 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
                                <img
                                    src="/assets/chatbot.png"
                                    alt="bot"
                                    className="relative w-full h-auto max-w-md object-cover group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                                    style={{
                                        filter: 'drop-shadow(0 0 40px rgba(236, 72, 153, 0.3))'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render modals here */}
            <Login
                isOpen={isLoginOpen}
                onRequestClose={closeLoginModal}
                openSignup={openSignupModal}
            />
            <Signup
                isOpen={isSignupOpen}
                onRequestClose={closeSignupModal}
                openLogin={openLoginModal}
            />

            <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
