import { useState } from "react";
import { ChatSidebar } from "@/components/Chat/ChatSidebar";
import { ChatContainer } from "@/components/Chat/ChatContainer";

export default function Chat() {
  const [currentChatId, setCurrentChatId] = useState("1");

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setCurrentChatId(newChatId);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
    // In a real app, you'd remove from state/database
    console.log("Delete chat:", chatId);
    // If deleting current chat, switch to a different one
    if (chatId === currentChatId) {
      handleNewChat();
    }
  };

  const handleRenameChat = (chatId: string, newTitle: string) => {
    // In a real app, you'd update the chat title in state/database
    console.log("Rename chat:", chatId, "to:", newTitle);
  };

  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatContainer chatId={currentChatId} />
      </div>
    </div>
  );
}