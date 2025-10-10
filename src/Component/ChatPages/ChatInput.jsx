import React, { useState } from "react";
import { useChatStore } from "./../../Context/chatStore";
import axios from "axios";
import { useAuthStore } from "../../Context/useAuthStore"; // optional if you use auth context

const ChatInput = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const addMessage = useChatStore((state) => state.addMessage);
  const { user, token } = useAuthStore(); // if using auth context

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    addMessage({ sender: "user", text: userMessage });
    setInput("");
    setIsLoading(true);

    try {
      // Get JWT token from auth context or localStorage
      const authToken = token || localStorage.getItem("token");
      if (!authToken) throw new Error("User not authenticated");

      const response = await axios.post(
        "http://localhost:8000/chat/send",
        { message: userMessage },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      addMessage({ sender: "bot", text: response.data.reply });
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {/* Decorative glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-2xl blur-lg opacity-0 transition-opacity duration-300 ${
          isFocused ? "opacity-30" : ""
        }`}
      />

      <div className="relative flex items-end gap-3 bg-white rounded-2xl shadow-xl p-3 border border-gray-200">
        {/* Emoji/Attachment Button */}
        <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows="1"
            className="w-full max-h-32 resize-none bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base py-2"
            placeholder="Type your message..."
            style={{
              minHeight: "40px",
              lineHeight: "1.5",
            }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 shadow-lg ${
            input.trim() && !isLoading
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <svg
              className="animate-spin w-5 h-5"
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
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Character count or hints */}
      {input.length > 0 && (
        <div className="absolute -top-6 right-0 text-xs text-gray-400">
          {input.length} characters
        </div>
      )}
    </div>
  );
};

export default ChatInput;  