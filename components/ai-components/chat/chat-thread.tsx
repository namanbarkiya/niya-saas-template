"use client";

import React from "react";
import { Attachments } from "./attachments";
import { ChatProvider, useChat } from "./chat-provider";
import { Composer } from "./composer";
import { MessageList } from "./message-list";

interface ChatThreadProps {
  threadId?: string;
  adapter?: Parameters<typeof ChatProvider>[0]["adapter"];
  className?: string;
}

const ChatInner: React.FC = () => {
  const { useStore } = useChat();
  const state = useStore();
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex-1 overflow-y-auto rounded-xl border bg-background p-3">
        <MessageList messages={state.messages} />
      </div>
      <Attachments
        files={state.attachments}
        onRemove={state.removeAttachment}
      />
      <Composer />
    </div>
  );
};

export const ChatThread: React.FC<ChatThreadProps> = ({
  threadId,
  adapter,
  className,
}) => {
  return (
    <div className={className}>
      <ChatProvider threadId={threadId} adapter={adapter}>
        <ChatInner />
      </ChatProvider>
    </div>
  );
};
