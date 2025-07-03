import { useState } from "react";
import { Plus, MessageSquare, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  currentChatId: string;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
}

export function ChatSidebar({ 
  currentChatId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  onRenameChat 
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Mock data - in a real app this would come from props or state management
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "ChatGPT Clone Discussion",
      lastMessage: "How can I help you today?",
      timestamp: new Date()
    },
    {
      id: "2", 
      title: "React Development",
      lastMessage: "Let's explore React patterns...",
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: "3",
      title: "UI Design Tips",
      lastMessage: "Creating beautiful interfaces...",
      timestamp: new Date(Date.now() - 172800000)
    }
  ]);

  const handleStartEdit = (chatId: string, currentTitle: string) => {
    setEditingId(chatId);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim()) {
      onRenameChat(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditTitle("");
    }
  };

  return (
    <div className="w-64 h-full bg-secondary border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button 
          onClick={onNewChat}
          variant="outline"
          className="w-full justify-start gap-2 hover:bg-chat-hover transition-all duration-200"
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chatSessions.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "group relative p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-chat-hover",
                currentChatId === chat.id && "bg-chat-hover ring-1 ring-primary/20"
              )}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <MessageSquare size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    {editingId === chat.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyDown={handleKeyPress}
                        className="w-full bg-transparent border-none outline-none text-sm font-medium"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <h3 className="text-sm font-medium truncate">{chat.title}</h3>
                    )}
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
                
                {/* Action buttons - only show on hover */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-accent"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(chat.id, chat.title);
                    }}
                  >
                    <Edit3 size={12} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          ChatGPT Clone
        </div>
      </div>
    </div>
  );
}