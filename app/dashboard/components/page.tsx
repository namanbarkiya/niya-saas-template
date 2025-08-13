import React from "react";
import Link from "next/link";

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Components</h1>
      <p className="text-muted-foreground">
        Explore complex, reusable components for this AI SaaS template.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/components/chat"
          className="rounded-xl border p-4 hover:bg-muted/40"
        >
          <div className="text-lg font-medium">Chat Thread</div>
          <div className="text-sm text-muted-foreground">
            Conversational chat with attachments and adapter API.
          </div>
        </Link>
      </div>
    </div>
  );
}
