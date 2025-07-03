import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
  };
  isLatest?: boolean;
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div 
      className={cn(
        "w-full transition-all duration-300 animate-fade-in",
        isUser ? "bg-background" : "bg-chat-assistant"
      )}
    >
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div 
            className={cn(
              "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full text-white shadow-soft",
              isUser 
                ? "bg-gradient-primary" 
                : "bg-foreground text-background"
            )}
          >
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>

          {/* Message Content */}
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="text-sm font-medium text-foreground">
              {isUser ? "You" : "Assistant"}
            </div>
            
            <div 
              className={cn(
                "prose prose-sm max-w-none text-foreground",
                "prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-pre:border-border",
                "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
              )}
            >
              {/* Simple text rendering - in a real app you might want markdown support */}
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-muted-foreground mt-2">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}