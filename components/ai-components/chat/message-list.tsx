"use client";

import React, { useEffect, useRef } from "react";
import { MessageItem } from "./message-item";
import type { ChatMessage } from "./types";

interface MessageListProps {
  messages: ChatMessage[];
  onRegenerate?: (message: ChatMessage) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onRegenerate,
}) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} onRegenerate={onRegenerate} />
      ))}
      <div ref={endRef} />
    </div>
  );
};
