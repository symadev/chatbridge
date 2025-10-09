import React, { useState } from "react";
import { useChatStore } from "./../../Context/chatStore";
import axios from "axios";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1️⃣ User message add
    addMessage({ sender: "user", text: input });

    // 2️⃣ Send to backend (no JWT, no headers)
    try {
      const response = await axios.post(
        "http://localhost:8000/chat", // আপনার backend URL
        { text: input }
      );

      addMessage({ sender: "bot", text: response.data.reply });
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      });
    }

    setInput("");
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
