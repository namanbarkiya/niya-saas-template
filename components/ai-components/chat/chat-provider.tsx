"use client";

import React, { createContext, useContext, useMemo } from "react";
import { createChatThreadStore } from "./store";
import type {
  ChatAdapter,
  ChatAdapterHelpers,
  ChatMessage,
  SendMessageInput,
  ToolCall,
} from "./types";

interface ChatProviderProps {
  threadId?: string;
  adapter?: ChatAdapter;
  initialMessages?: ChatMessage[];
  children: React.ReactNode;
}

interface ChatContextValue {
  useStore: ReturnType<typeof createChatThreadStore>;
  sendMessage: (input: SendMessageInput) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({
  threadId = "local",
  adapter,
  initialMessages = [],
  children,
}) => {
  const useStore = useMemo(() => {
    const s = createChatThreadStore(threadId);
    if (initialMessages.length) {
      initialMessages.forEach((m) => s.getState().appendMessage(m));
    }
    return s;
  }, [threadId, initialMessages]);

  const sendMessage = async (input: SendMessageInput) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    const userMessage: ChatMessage = {
      id,
      role: "user",
      content: input.content,
      createdAt: new Date().toISOString(),
      attachments: input.attachments,
    };
    useStore.getState().appendMessage(userMessage);
    useStore.getState().setInput("");
    useStore.getState().clearAttachments();

    const helpers: ChatAdapterHelpers = {
      appendAssistant: (content, extras) => {
        const assistantId =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2);
        useStore.getState().appendMessage({
          id: assistantId,
          role: "assistant",
          content,
          createdAt: new Date().toISOString(),
          ...extras,
        } as ChatMessage);
        return assistantId;
      },
      streamAssistant: (messageId, chunk) => {
        useStore.getState().updateMessage(messageId, (m) => ({
          ...m,
          content: (m.content || "") + chunk,
          isStreaming: true,
        }));
      },
      finishAssistant: (messageId, finalize) => {
        useStore.getState().updateMessage(messageId, (m) => ({
          ...m,
          isStreaming: false,
          ...(finalize || {}),
        }));
      },
      setError: (messageId, error) => {
        useStore.getState().updateMessage(messageId, (m) => ({ ...m, error }));
      },
      addToolCall: (messageId, call: ToolCall) => {
        useStore.getState().updateMessage(messageId, (m) => ({
          ...m,
          toolCalls: [...(m.toolCalls || []), call],
        }));
      },
    };

    if (adapter && adapter.send) {
      await adapter.send(input, helpers);
      return;
    }

    // Demo fallback: echo response
    const assistantId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    const assistantMessageId = helpers.appendAssistant("", {
      isStreaming: true,
    });
    const words = `Echo: ${input.content}`.split(" ");
    for (const w of words) {
      await new Promise((r) => setTimeout(r, 50));
      helpers.streamAssistant(assistantMessageId, w + " ");
    }
    helpers.finishAssistant(assistantMessageId);
  };

  const value = useMemo(() => ({ useStore, sendMessage }), [useStore]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
