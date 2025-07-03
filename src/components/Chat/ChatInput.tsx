import { useState } from "react";
import { Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  onStopGeneration?: () => void;
  disabled?: boolean;
}

export function ChatInput({ 
  onSendMessage, 
  isLoading = false, 
  onStopGeneration,
  disabled = false 
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStop = () => {
    if (onStopGeneration) {
      onStopGeneration();
    }
  };

  return (
    <div className="border-t border-border bg-background">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-end gap-2">
            {/* Message Input */}
            <div className="flex-1 relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message ChatGPT Clone..."
                disabled={disabled}
                className={cn(
                  "min-h-[60px] max-h-[200px] resize-none rounded-xl border-input bg-background pr-12",
                  "focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200",
                  "shadow-soft hover:shadow-medium",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
                rows={1}
              />
              
              {/* Send/Stop Button */}
              <div className="absolute right-2 bottom-2">
                {isLoading ? (
                  <Button
                    type="button"
                    onClick={handleStop}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                  >
                    <Square size={16} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    size="sm"
                    className={cn(
                      "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      message.trim() && !disabled 
                        ? "bg-gradient-primary hover:shadow-medium transform hover:scale-105" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Send size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Helper Text */}
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </div>
        </form>
      </div>
    </div>
  );
}