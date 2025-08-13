export type ChatRole = "user" | "assistant" | "system" | "tool";

export interface FileAttachment {
  id: string;
  name: string;
  size?: number;
  type?: string;
  url?: string; // optional preview/download URL
}

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
  result?: unknown;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  attachments?: FileAttachment[];
  toolCalls?: ToolCall[];
  isStreaming?: boolean;
  error?: string;
  meta?: Record<string, unknown>;
}

export interface SendMessageInput {
  content: string;
  attachments?: FileAttachment[];
  meta?: Record<string, unknown>;
}

export interface ChatAdapterHelpers {
  appendAssistant: (
    content: string,
    extras?: Partial<Omit<ChatMessage, "id" | "role" | "content" | "createdAt">>
  ) => string; // returns assistant message id
  streamAssistant: (messageId: string, chunk: string) => void;
  finishAssistant: (messageId: string, finalize?: Partial<ChatMessage>) => void;
  setError: (messageId: string, error: string) => void;
  addToolCall: (messageId: string, call: ToolCall) => void;
}

export interface ChatAdapter {
  send: (input: SendMessageInput, helpers: ChatAdapterHelpers) => Promise<void>;
  // optional: load history, delete, etc.
}
