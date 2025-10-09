import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative">
      {/* Empty state */}
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-20">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Start a Conversation</h3>
          <p className="text-gray-400 text-center max-w-md">
            Ask me anything! I'm here to help you with your questions.
          </p>
          
          {/* Suggested prompts */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center max-w-2xl">
            {['How can you help me?', 'Tell me about your features', 'What can you do?'].map((prompt, idx) => (
              <button
                key={idx}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition-all duration-200 hover:scale-105 border border-white/20"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
