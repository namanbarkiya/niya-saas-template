"use client";

import React from "react";
import Link from "next/link";
import { ChatThread } from "@/components/ai-components";
import type {
  ChatAdapter,
  ChatAdapterHelpers,
  SendMessageInput,
} from "@/components/ai-components/chat/types";
import { Button } from "@/components/ui/button";

export default function ChatDemoPage() {
  // Example: a richer adapter showcasing streaming, tool-calls, and error handling
  const demoAdapter: ChatAdapter = {
    async send(input: SendMessageInput, helpers: ChatAdapterHelpers) {
      // 1) Start a streaming assistant message
      const msgId = helpers.appendAssistant("", {
        isStreaming: true,
        meta: { model: "gpt-4o-mini" },
      });

      // 2) Fake function/tool call
      await new Promise((r) => setTimeout(r, 800));
      helpers.addToolCall(msgId, {
        id: "tool-1",
        name: "search_knowledge_base",
        args: { query: input.content, topK: 2 },
        result: [
          { id: "doc-1", title: "Getting Started", score: 0.92 },
          { id: "doc-2", title: "Advanced Tips", score: 0.89 },
        ],
      });

      // Another sample tool call (no result yet)
      helpers.addToolCall(msgId, {
        id: "tool-2",
        name: "fetch_user_context",
        args: { userId: "demo-user-123" },
      });

      // 3) Simulate token streaming
      const chunks = [
        "Here are some insights based on your question. ",
        "I searched the knowledge base and found relevant docs. ",
        "You can explore more details in the linked resources. ",
        "Let me know if you'd like code examples or a summary.",
      ];
      for (const c of chunks) {
        await new Promise((r) => setTimeout(r, 500));
        helpers.streamAssistant(msgId, c);
      }

      // 4) Finish the message (collapse thinking panel and show final output)
      await new Promise((r) => setTimeout(r, 600));
      helpers.finishAssistant(msgId, {
        meta: { citations: ["doc-1", "doc-2"], runId: "run_demo_123" },
      });
    },
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Chat Thread</h1>
        <p className="text-muted-foreground">
          Conversational chat with attachments, streaming, tool-calls, and an
          adapter-based API.
        </p>
        <div className="mt-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/docs/chat">View Documentation</Link>
          </Button>
        </div>
      </div>
      <div className="max-w-3xl">
        <ChatThread threadId="demo" adapter={demoAdapter} />
      </div>
    </div>
  );
}
