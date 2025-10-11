import React, { useEffect, useState } from "react";
import ChatWindow from "../ChatPages/ChatWindow";
import ChatInput from "../ChatPages/ChatInput";
import { useChatStore } from "../../Context/chatStore";
import { useAuthStore } from "../../Context/useAuthStore";
import axios from "axios";

const ChatPage = () => {
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const clearMessages = useChatStore((state) => state.clearMessages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuthStore();

  useEffect(() => {
    //  Load chat history from backend
    const fetchChatHistory = async () => {
      try {
        const authToken = token || localStorage.getItem("token");
        
        if (!authToken) {
          console.log("No token found, redirecting to login");
          window.location.href = "/login";
          return;
        }

        console.log("📥 Loading chat history...");

        const response = await axios.get(
          "https://chatbridge-backend-fvgh.onrender.com/chat/history",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log(" History loaded:", response.data);

        // Backend data: [{ id, message, response, timestamp }, ...]
        // Convert to chat format
        const history = response.data.flatMap((msg) => [
          {
            sender: "user",
            text: msg.message,
            timestamp: msg.timestamp,
          },
          {
            sender: "bot",
            text: msg.response,
            timestamp: msg.timestamp,
          },
        ]);

        // Reverse to show oldest first
        history.reverse();

        setMessages(history);
        console.log(" Loaded", history.length, "messages");
      } catch (error) {
        console.error(" Error loading history:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [token]);

  const handleLogout = () => {
    clearMessages();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      clearMessages();
    }
  };

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
                {loading ? "Loading..." : "Online • Ready to help"}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleClearChat}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              title="Clear chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-4 top-20 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Chat Area */}
      <main className="relative z-10 flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <svg
                  className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-gray-400">Loading your conversation...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-xl text-white mb-2">No messages yet</p>
                <p className="text-sm text-gray-400">
                  Start a conversation to see your chat history!
                </p>
              </div>
            </div>
          ) : (
            <ChatWindow messages={messages} />
          )}
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