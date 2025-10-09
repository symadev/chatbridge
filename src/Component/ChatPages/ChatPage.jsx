import React, { useEffect } from "react";
import ChatWindow from "../ChatPages/ChatWindow";
import ChatInput from "../ChatPages/ChatInput";
import { useChatStore } from "../../Context/chatStore";

const ChatPage = () => {
  const messages = useChatStore((state) => state.messages);

  useEffect(() => {
    // Optional: fetch previous chat history from backend
    // fetchChatHistory();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-blue-900">
      <header className="bg-blue-950 p-4 shadow-md">
        <h1 className="text-2xl font-bold">Customer Support Chat</h1>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <ChatWindow messages={messages} />
      </main>

      <footer className="p-4 bg-blue-700 shadow-inner">
        <ChatInput />
      </footer>
    </div>
  );
};

export default ChatPage;
