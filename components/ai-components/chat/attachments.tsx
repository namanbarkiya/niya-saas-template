"use client";

import React from "react";
import { X } from "lucide-react";
import type { FileAttachment } from "./types";

interface AttachmentsProps {
  files: FileAttachment[];
  onRemove: (id: string) => void;
}

export const Attachments: React.FC<AttachmentsProps> = ({
  files,
  onRemove,
}) => {
  if (!files.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {files.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
        >
          <span className="truncate max-w-[200px]" title={f.name}>
            {f.name}
          </span>
          <button
            className="rounded hover:bg-accent p-1"
            onClick={() => onRemove(f.id)}
            aria-label={`Remove ${f.name}`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
