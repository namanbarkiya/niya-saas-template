"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { ToolCallView } from "./tool-call";
import type { ToolCall } from "./types";

interface ThinkingPanelProps {
  isStreaming: boolean;
  toolCalls?: ToolCall[];
}

export const ThinkingPanel: React.FC<ThinkingPanelProps> = ({
  isStreaming,
  toolCalls,
}) => {
  const hasTools = !!toolCalls && toolCalls.length > 0;
  return (
    <div className="rounded-lg border bg-muted/40 p-3 text-xs">
      <div className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
        <Loader2
          className={`h-3.5 w-3.5 ${isStreaming ? "animate-spin" : ""}`}
        />
        {isStreaming ? "Thinking…" : "Reasoning details"}
      </div>
      {hasTools ? (
        <div className="space-y-2">
          {toolCalls!.map((c) => (
            <ToolCallView key={c.id} call={c} />
          ))}
        </div>
      ) : (
        <div className="grid gap-2">
          <div className="h-2 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-2 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-2 w-3/5 animate-pulse rounded bg-muted" />
        </div>
      )}
    </div>
  );
};
