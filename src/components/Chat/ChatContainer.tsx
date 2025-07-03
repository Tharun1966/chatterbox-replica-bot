import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatContainerProps {
  chatId: string;
}

export function ChatContainer({ chatId }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm a ChatGPT clone built with React and TypeScript. How can I help you today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset messages when chat changes
  useEffect(() => {
    // In a real app, you'd load messages for the specific chat
    if (chatId === "new") {
      setMessages([
        {
          id: "welcome",
          content: "Hello! I'm a ChatGPT clone built with React and TypeScript. How can I help you today?",
          role: "assistant",
          timestamp: new Date()
        }
      ]);
    }
  }, [chatId]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with typing delay
    setTimeout(() => {
      const responses = [
        "I understand you're interested in that topic. While I'm a demo version, I can help explain concepts, answer questions, and have conversations on a wide range of subjects.",
        "That's a great question! In a real implementation, I would connect to an AI API like OpenAI's GPT models to provide intelligent responses.",
        "I'm designed to be a helpful assistant. Feel free to ask me about programming, general knowledge, creative tasks, or anything else you'd like to discuss!",
        "Thanks for trying out this ChatGPT clone! The interface is built with React, TypeScript, and Tailwind CSS to match the original's clean design.",
        "I notice you're testing the chat functionality. This demo shows how you could build a conversational AI interface with modern web technologies."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleStopGeneration = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="space-y-0">
            {messages.map((message, index) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isLatest={index === messages.length - 1}
              />
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="bg-chat-assistant">
                <div className="max-w-4xl mx-auto px-4 py-6">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-foreground text-background">
                      <Loader2 size={16} className="animate-spin" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-sm font-medium text-foreground">Assistant</div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onStopGeneration={handleStopGeneration}
      />
    </div>
  );
}