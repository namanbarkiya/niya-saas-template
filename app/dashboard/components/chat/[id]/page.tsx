"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ChatThread } from "@/components/ai-components";
import type {
  ChatAdapter,
  ChatAdapterHelpers,
  SendMessageInput,
} from "@/components/ai-components/chat/types";

export default function ChatThreadByIdPage() {
  const params = useParams();
  const id = (params?.id as string) || "local";
  const demoAdapter: ChatAdapter = {
    async send(input: SendMessageInput, helpers: ChatAdapterHelpers) {
      const msgId = helpers.appendAssistant("", { isStreaming: true });
      helpers.addToolCall(msgId, {
        id: "tool-ctx",
        name: "load_thread_context",
        args: { threadId: id },
        result: { lastMessages: 3 },
      });
      for (const c of [
        "Loading context… ",
        "Thinking… ",
        `Replying to ${id}: `,
      ]) {
        await new Promise((r) => setTimeout(r, 600));
        helpers.streamAssistant(msgId, c);
      }
      await new Promise((r) => setTimeout(r, 600));
      helpers.finishAssistant(msgId, {
        content: `Echo(${id}): ${input.content}`,
      });
    },
  };
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Chat Thread: {id}</h1>
        <p className="text-muted-foreground">
          This demo renders a thread based on the route id.
        </p>
      </div>
      <div className="max-w-3xl">
        <ChatThread threadId={id} adapter={demoAdapter} />
      </div>
    </div>
  );
}
