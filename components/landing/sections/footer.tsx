"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={cn(
        "w-full border-t border-white/20 dark:border-white/10 pt-12 pb-8 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm backdrop-saturate-150",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Niya Template
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Production-ready Next.js 15 template for developers and AI
              startups. Built with modern best practices and beautiful UI
              components.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/namanbarkiya/niya-saas-template"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Template
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/namanbarkiya/niya-saas-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Download Template
                </a>
              </li>
              <li>
                <a
                  href="https://saas.nbarkiya.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Live Demo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/namanbarkiya/niya-saas-template/blob/main/project-details/technical-description.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Next.js Docs
                </a>
              </li>
              <li>
                <a
                  href="https://supabase.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Supabase Docs
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Niya Template. Built by{" "}
            <a
              href="https://github.com/namanbarkiya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Naman Barkiya
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm transition-colors"
              aria-label="Back to top"
            >
              <ArrowUpIcon className="w-4 h-4" />
              <span>Back to top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
