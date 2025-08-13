"use client";

import React from "react";
import type { ToolCall } from "./types";

interface ToolCallProps {
  call: ToolCall;
}

export const ToolCallView: React.FC<ToolCallProps> = ({ call }) => {
  return (
    <div className="rounded-md border bg-muted/40 p-3 text-xs">
      <div className="mb-2 font-medium">Tool: {call.name}</div>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="space-y-1">
          <div className="text-muted-foreground">Args</div>
          <pre className="max-h-48 overflow-auto rounded bg-background p-2">
            {JSON.stringify(call.args, null, 2)}
          </pre>
        </div>
        {typeof call.result !== "undefined" && (
          <div className="space-y-1">
            <div className="text-muted-foreground">Result</div>
            <pre className="max-h-48 overflow-auto rounded bg-background p-2">
              {JSON.stringify(call.result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
