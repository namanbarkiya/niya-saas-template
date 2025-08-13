import { create } from "zustand";
import type { ChatMessage, FileAttachment } from "./types";

export interface ChatThreadState {
  id: string;
  messages: ChatMessage[];
  isStreaming: boolean;
  input: string;
  attachments: FileAttachment[];
}

export interface ChatThreadStore extends ChatThreadState {
  setInput: (value: string) => void;
  addAttachment: (file: FileAttachment) => void;
  removeAttachment: (id: string) => void;
  clearAttachments: () => void;
  appendMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updater: (m: ChatMessage) => ChatMessage) => void;
  setStreaming: (streaming: boolean) => void;
  reset: () => void;
}

const initialState: ChatThreadState = {
  id: "local",
  messages: [],
  isStreaming: false,
  input: "",
  attachments: [],
};

export const createChatThreadStore = (id = "local") =>
  create<ChatThreadStore>()((set) => ({
    ...initialState,
    id,
    setInput: (value) => set({ input: value }),
    addAttachment: (file) =>
      set((s) => ({ attachments: [...s.attachments, file] })),
    removeAttachment: (fileId) =>
      set((s) => ({
        attachments: s.attachments.filter((f) => f.id !== fileId),
      })),
    clearAttachments: () => set({ attachments: [] }),
    appendMessage: (message) =>
      set((s) => ({ messages: [...s.messages, message] })),
    updateMessage: (id, updater) =>
      set((s) => ({
        messages: s.messages.map((m) => (m.id === id ? updater(m) : m)),
      })),
    setStreaming: (isStreaming) => set({ isStreaming }),
    reset: () => set({ ...initialState, id }),
  }));
