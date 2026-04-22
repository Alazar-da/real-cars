// components/chatbot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { ChatMessage } from "@/types";
import toast from "react-hot-toast";

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "👋 Welcome to LuxAuto! I'm your virtual assistant. Looking for a specific luxury car? I can help you find the perfect match!",
    timestamp: new Date(),
  },
];

const suggestedReplies = ["Show me luxury SUVs", "Best electric cars", "Cars under $100k", "Schedule a test drive"];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("suv")) {
        response = "We have several luxury SUVs available including the Mercedes G-Class and BMW X7. Would you like to see our current inventory?";
      } else if (lowerInput.includes("electric") || lowerInput.includes("ev")) {
        response = "Our electric collection features the Tesla Model S Plaid, Lucid Air, and BMW i7. All offer exceptional range and performance!";
      } else if (lowerInput.includes("test drive")) {
        response = "I'd be happy to help schedule a test drive! Please provide your name and phone number, and our team will contact you within 24 hours.";
      } else if (lowerInput.includes("price") || lowerInput.includes("under")) {
        response = "Our vehicles range from $50,000 to over $200,000. What's your budget range? I can recommend specific models for you.";
      } else {
        response = "Thanks for your interest! Could you tell me more about what you're looking for? I can help with specific models, pricing, or scheduling a test drive.";
      }
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const handleCollectLead = () => {
    toast.success("Our team will reach out shortly!");
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-amber-500 rounded-full shadow-lg hover:scale-110 transition-all duration-300 group"
      >
        <MessageCircle className="w-6 h-6 text-black" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[500px] glass-card rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold">LuxAuto Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-amber-500 text-black rounded-br-sm"
                        : "bg-white/10 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 3 && (
              <div className="px-4 py-2 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {suggestedReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSuggestion(reply)}
                      className="text-xs px-3 py-1.5 bg-white/5 rounded-full hover:bg-white/10 transition"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about our cars..."
                  className="flex-1 px-4 py-2 bg-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-amber-500 rounded-xl hover:bg-amber-400 transition"
                >
                  <Send className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}