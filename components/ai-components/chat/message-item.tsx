"use client";

import React from "react";
import { Copy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThinkingPanel } from "./thinking-panel";
import { ToolCallView } from "./tool-call";
import type { ChatMessage } from "./types";

interface MessageItemProps {
  message: ChatMessage;
  onRegenerate?: (message: ChatMessage) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onRegenerate,
}) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "group relative flex w-full gap-3 rounded-lg p-3",
        isUser ? "bg-muted/40" : "bg-card"
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="text-xs text-muted-foreground">
          {isUser ? "You" : "Assistant"} •{" "}
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
        {message.isStreaming ? (
          <ThinkingPanel isStreaming toolCalls={message.toolCalls} />
        ) : (
          <>
            {!!message.toolCalls?.length && (
              <details className="group">
                <summary className="cursor-pointer select-none text-xs text-muted-foreground hover:underline">
                  Show reasoning and tool calls
                </summary>
                <div className="mt-2 space-y-2">
                  {message.toolCalls.map((c) => (
                    <ToolCallView key={c.id} call={c} />
                  ))}
                </div>
              </details>
            )}
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-sm">
              {message.content}
            </div>
          </>
        )}
        {!!message.error && (
          <div className="text-xs text-red-500">{message.error}</div>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
        <button
          className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
          onClick={() => navigator.clipboard.writeText(message.content)}
        >
          <Copy className="h-3 w-3" />
        </button>
        {!isUser && onRegenerate && (
          <button
            className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
            onClick={() => onRegenerate(message)}
            title="Regenerate"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};
