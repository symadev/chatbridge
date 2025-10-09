import React from "react";

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";
  
  return (
    <div 
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
      style={{
        animation: 'fadeSlideIn 0.4s ease-out'
      }}
    >
      <div className={`flex items-end gap-2 max-w-xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-lg ${
          isUser 
            ? 'bg-gradient-to-br from-pink-500 to-purple-600' 
            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
        }`}>
          {isUser ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          )}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-1">
          <div
            className={`relative p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
              isUser 
                ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 text-white rounded-br-sm' 
                : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
            }`}
          >
            {/* Message Text */}
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
              {message.text}
            </p>
            
            {/* Decorative gradient overlay for user messages */}
            {isUser && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl rounded-br-sm pointer-events-none" />
            )}
          </div>
          
          {/* Timestamp */}
          <span className={`text-xs text-gray-500 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;