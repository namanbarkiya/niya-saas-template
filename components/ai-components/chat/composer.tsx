"use client";

import React, { useRef } from "react";
import { Paperclip, Send } from "lucide-react";
import { useChat } from "./chat-provider";

export const Composer: React.FC = () => {
  const { useStore, sendMessage } = useChat();
  const state = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSend = async () => {
    const text = state.input.trim();
    if (!text && state.attachments.length === 0) return;
    await sendMessage({ content: text, attachments: state.attachments });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const onPickFiles = () => fileInputRef.current?.click();
  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((f) =>
      state.addAttachment({
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2),
        name: f.name,
        size: f.size,
        type: f.type,
      })
    );
    // reset input to allow reselect same file
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="rounded-xl border bg-card p-2">
      <textarea
        className="w-full resize-none bg-transparent p-3 text-sm outline-none"
        rows={3}
        placeholder="Type here to see magic…"
        value={state.input}
        onChange={(e) => state.setInput(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
            onClick={onPickFiles}
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={onFilesSelected}
          />
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:opacity-90"
          onClick={onSend}
        >
          <Send className="h-3.5 w-3.5" /> Send
        </button>
      </div>
    </div>
  );
};
