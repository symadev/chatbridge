import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault(); // prevent default navigation if needed

        console.log("Button clicked!");
        // You can do anything here, e.g., analytics, API call

        // Navigate programmatically
        navigate("/chat");
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative overflow-hidden bg-[#010629] min-h-screen flex items-center">

            <div className="relative z-10 container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

                    {/* Text Section */}
                    <div
                        className={`flex-1 text-left max-w-2xl ml-4 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-shadow">
                            <span>Powered by GPT-4o</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-pink-900 via-blue-800 to-gray-600 bg-clip-text text-transparent">
                                ChatBridge
                            </span>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                                    AI Assistant
                                </span>
                            </div>
                        </h1>
                        
                        {/* Description */}
                        <p className="text-lg md:text-xl mb-8 text-white leading-relaxed font-light">
                            <span className="text-white font-semibold">Transform the way you work with AI-powered conversations</span>
                        </p>

                        <div>
                            <Link
                                to="/chat"
                                onClick={handleClick}
                                className="relative inline-flex items-center justify-center rounded-md overflow-hidden text-white font-semibold px-8 py-3 group"
                            >
                                {/* Base background (pink, stays fixed) */}
                                <span className="absolute inset-0 bg-[#d60780]"></span>

                                {/* Blue half (slides left → right on hover) */}
                                <span className="absolute top-0 left-0 w-1/2 h-full bg-[#1c0379] transform group-hover:translate-x-full transition-transform duration-500 ease-in-out z-0"></span>

                                {/* Centered Text */}
                                <span className="relative z-10">Get The Support</span>
                            </Link>
                        </div>
                    </div>

                    {/* Image Section with Multiple Circular Animations */}
                    <div className={`flex-1 flex justify-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="relative flex items-center justify-center">
                            {/* Multiple Circular Animations Background */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                                {/* Circle 1 - Largest */}
                                <div className="absolute">
                                    <svg
                                        width="600"
                                        height="600"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <circle cx="300" cy="300" r="280" fill="none" stroke="#621b44" strokeWidth="2" />
                                    </svg>
                                    <div
                                        className="absolute top-1/2 left-1/2 animate-spin"
                                        style={{ animationDuration: "8s" }}
                                    >
                                        <div
                                            className="absolute w-4 h-4 bg-pink-500 rounded-full shadow-lg shadow-pink-600/50"
                                            style={{
                                                transform: "translate(-50%, -280px)",
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Circle 2 - Medium */}
                                <div className="absolute">
                                    <svg
                                        width="500"
                                        height="500"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <circle cx="250" cy="250" r="230" fill="none" stroke="#2d1d69" strokeWidth="2" />
                                    </svg>
                                    <div
                                        className="absolute top-1/2 left-1/2 animate-spin"
                                        style={{ animationDuration: "6s", animationDirection: "reverse" }}
                                    >
                                        <div
                                            className="absolute w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-400/50"
                                            style={{
                                                transform: "translate(-50%, -230px)",
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Circle 3 - Small */}
                                <div className="absolute">
                                    <svg
                                        width="400"
                                        height="400"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <circle cx="200" cy="200" r="180" fill="none" stroke="#0d2df7" strokeWidth="2" />
                                    </svg>
                                    <div
                                        className="absolute top-1/2 left-1/2 animate-spin"
                                        style={{ animationDuration: "5s" }}
                                    >
                                        <div
                                            className="absolute w-3 h-3 bg-pink-500 rounded-full shadow-lg shadow-pink-600/50"
                                            style={{
                                                transform: "translate(-50%, -180px)",
                                            }}
                                        ></div>
                                    </div>
                                </div>

                            </div>

                            {/* Main image */}
                            <img
                                src="/assets/chatbot.png"
                                alt="bot"
                                className="relative z-10 w-full h-auto max-w-md object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default LandingPage;