"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChatThreadDocsPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Chat Thread</h1>
        <p className="text-muted-foreground max-w-2xl">
          Reusable conversational UI with streaming, tool-calls, and a simple
          adapter API. Bring your own LLM/backend.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick start</CardTitle>
          <CardDescription>
            Drop-in usage with a unique thread id
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            {`import { ChatThread } from "@/components/ai-components";

export default function Page() {
  return <ChatThread threadId="support" />;
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adapter integration</CardTitle>
          <CardDescription>
            Wire to your LLM/chat API (REST/SSE/WS)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Implement an adapter to control how messages are generated. Use
            helpers to append, stream, finish, report errors, and add tool
            calls.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            {`import type { ChatAdapter, ChatAdapterHelpers, SendMessageInput } from "@/components/ai-components/chat/types";

const adapter: ChatAdapter = {
  async send(input: SendMessageInput, helpers: ChatAdapterHelpers) {
    const msgId = helpers.appendAssistant("", { isStreaming: true, meta: { model: "gpt-4o-mini" } });

    // Optional: tool call before/while streaming
    helpers.addToolCall(msgId, {
      id: "search-1",
      name: "search_knowledge_base",
      args: { query: input.content, topK: 3 },
    });

    // Example: REST + SSE stream
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input.content, attachments: input.attachments }),
    });

    if (!res.body) {
      helpers.setError(msgId, "No response body");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        helpers.streamAssistant(msgId, decoder.decode(value));
      }
      helpers.finishAssistant(msgId, { meta: { runId: "run_abc" } });
    } catch (e) {
      helpers.setError(msgId, e instanceof Error ? e.message : "Stream error");
    }
  },
};

// Usage
// <ChatThread threadId="support" adapter={adapter} />`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API reference</CardTitle>
          <CardDescription>Key props and adapter helpers</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>
              <strong>ChatThread props</strong>:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>
                  <code>threadId?: string</code> - unique identifier for the
                  thread (enables multiple instances)
                </li>
                <li>
                  <code>adapter?: ChatAdapter</code> - your integration for
                  generating replies
                </li>
                <li>
                  <code>initialMessages?: ChatMessage[]</code> - seed messages
                  if needed
                </li>
              </ul>
            </li>
            <li>
              <strong>Adapter helpers</strong>:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>
                  <code>appendAssistant(content, extras?)</code> - create an
                  assistant message, returns messageId
                </li>
                <li>
                  <code>streamAssistant(messageId, chunk)</code> - append
                  streamed text
                </li>
                <li>
                  <code>finishAssistant(messageId, finalize?)</code> - finalize
                  the message (collapses thinking UI)
                </li>
                <li>
                  <code>setError(messageId, error)</code> - mark message as
                  errored
                </li>
                <li>
                  <code>addToolCall(messageId, call)</code> - attach tool-call
                  args/results
                </li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips</CardTitle>
          <CardDescription>Best practices</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>
              Use <code>threadId</code> to isolate multiple chat instances
              (e.g., tabs or routes).
            </li>
            <li>
              Emit tool-calls as soon as tools are invoked; update results when
              available.
            </li>
            <li>Prefer SSE/WebSockets for smooth token streaming.</li>
            <li>
              On network or model errors, call <code>setError</code> and
              optionally retry with context.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
