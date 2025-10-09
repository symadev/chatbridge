import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
