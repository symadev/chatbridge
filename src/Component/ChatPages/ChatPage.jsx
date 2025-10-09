import React, { useEffect, useState } from "react";
import ChatWindow from "../ChatPages/ChatWindow";
import ChatInput from "../ChatPages/ChatInput";
import { useChatStore } from "../../Context/chatStore";

const ChatPage = () => {
  const messages = useChatStore((state) => state.messages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Optional: fetch previous chat history from backend
    // fetchChatHistory();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#010629] via-[#0a0e3d] to-[#010629] relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-xl">
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Customer Support
              </h1>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online • Ready to help
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="relative z-10 flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <ChatWindow messages={messages} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="relative z-10 p-4 md:p-6 bg-white/5 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <ChatInput />
        </div>
      </footer>

      {/* Global styles for animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatPage;