"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, Copy, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// Enhanced User Message Component
const UserMessage = React.memo(function UserMessage({
  content,
  timestamp,
}: {
  content: string;
  timestamp: Date;
}) {
  const formattedTime = useMemo(
    () =>
      timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [timestamp]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex w-full justify-end mb-6"
    >
      <div className="flex w-fit max-w-[300px] md:max-w-[360px] lg:max-w-[550px] xl:max-w-fit items-start gap-3 flex-row-reverse">
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 ring-2 ring-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2 min-w-0 flex-1">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
            <p className="text-sm font-medium leading-relaxed break-words overflow-wrap-anywhere">
              {content}
            </p>
          </div>
          <div className="text-xs text-muted-foreground text-right px-2">
            {formattedTime}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Enhanced AI Message Component with full markdown support
const AIMessage = React.memo(function AIMessage({
  content,
  timestamp,
  isStreaming = false,
}: {
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [content]);

  const formattedTime = useMemo(
    () =>
      timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [timestamp]
  );

  const markdownComponents = useMemo(
    () => ({
      // Enhanced headings with proper hierarchy
      h1: ({ children }: any) => (
        <h1 className="text-2xl font-bold text-foreground mb-4 mt-6 first:mt-0 pb-2 border-b border-border">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-xl font-bold text-foreground mb-3 mt-5 first:mt-0">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-lg font-semibold text-foreground mb-3 mt-4 first:mt-0">
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-base font-semibold text-foreground mb-2 mt-3 first:mt-0">
          {children}
        </h4>
      ),
      h5: ({ children }: any) => (
        <h5 className="text-sm font-semibold text-foreground mb-2 mt-3 first:mt-0">
          {children}
        </h5>
      ),
      h6: ({ children }: any) => (
        <h6 className="text-sm font-medium text-muted-foreground mb-2 mt-2 first:mt-0">
          {children}
        </h6>
      ),
      // Enhanced paragraphs with better text wrapping
      p: ({ children }: any) => (
        <p className="mb-3 last:mb-0 text-foreground text-base leading-7 break-words overflow-wrap-anywhere whitespace-normal">
          {children}
        </p>
      ),
      // Enhanced code blocks with syntax highlighting
      code: ({ children, className, ...props }: any) => {
        const isInline = !className;
        return isInline ? (
          <code className="bg-muted text-foreground px-2 py-1 rounded-md text-sm font-mono font-medium border border-border">
            {children}
          </code>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
      pre: ({ children, ...props }: any) => (
        <pre
          className="bg-muted border border-border p-4 rounded-lg text-sm font-mono max-w-full my-3 break-words"
          {...props}
        >
          {children}
        </pre>
      ),
      // Enhanced lists
      ul: ({ children }: any) => (
        <ul className="list-disc list-outside ml-6 mb-3 space-y-1 text-foreground">
          {children}
        </ul>
      ),
      ol: ({ children }: any) => (
        <ol className="list-decimal list-outside ml-6 mb-3 space-y-1 text-foreground">
          {children}
        </ol>
      ),
      li: ({ children }: any) => (
        <li className="text-base leading-6 pl-1">{children}</li>
      ),
      // Enhanced text formatting
      strong: ({ children }: any) => (
        <strong className="font-bold text-foreground">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-foreground font-medium">{children}</em>
      ),
      // Enhanced tables with better mobile responsiveness
      table: ({ children }: any) => (
        <div className="overflow-x-auto max-w-full my-4">
          <table className="w-full border-collapse border border-border rounded-lg overflow-hidden shadow-sm">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }: any) => (
        <thead className="bg-muted">{children}</thead>
      ),
      tbody: ({ children }: any) => (
        <tbody className="bg-background">{children}</tbody>
      ),
      tr: ({ children }: any) => (
        <tr className="border-b border-border hover:bg-muted/50 transition-colors">
          {children}
        </tr>
      ),
      td: ({ children }: any) => (
        <td className="border border-border px-4 py-3 text-sm break-words text-foreground">
          {children}
        </td>
      ),
      th: ({ children }: any) => (
        <th className="border border-border px-4 py-3 text-sm font-bold bg-muted break-words text-foreground">
          {children}
        </th>
      ),
      // Enhanced blockquotes
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary bg-muted/50 pl-6 py-4 my-4 rounded-r-lg">
          <div className="text-foreground italic text-base leading-6">
            {children}
          </div>
        </blockquote>
      ),
      // Enhanced links
      a: ({ children, href }: any) => (
        <a
          href={href}
          className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/50 transition-colors font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      // Horizontal rule
      hr: () => <hr className="border-t-2 border-border my-6" />,
    }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex w-full justify-start mb-4"
    >
      <div className="flex w-[300px] md:w-[380px] lg:w-[600px] xl:w-full items-start gap-3">
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 ring-2 ring-muted">
            <AvatarImage src="" />
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2 flex-1 min-w-0 max-w-full">
          <div className="px-0 py-2 max-w-full text-foreground overflow-hidden">
            {isStreaming && content.length === 0 ? (
              <div className="flex items-center gap-3">
                <div className="flex space-x-1 opacity-50 animate-bounce-slow">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  AI is thinking...
                </span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div>
                  <ReactMarkdown
                    remarkPlugins={[
                      remarkGfm,
                      remarkMath,
                      remarkBreaks,
                      remarkEmoji,
                    ]}
                    rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeSlug]}
                    components={markdownComponents}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formattedTime}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-6 px-2 text-xs hover:bg-muted"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Centered Input Component for Empty State
const CenteredInput = React.memo(function CenteredInput({
  input,
  onInputChange,
  onKeyDown,
  onSend,
  isLoading,
  inputRef,
}: {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-8"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3"
          >
            Start chatting with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground"
          >
            Ask me anything and I&apos;ll help you get the best answers
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-sm text-muted-foreground mt-2"
          >
            💡 Try asking for a table example or code snippet to see the
            markdown rendering
          </motion.p>
        </motion.div>

        {/* Centered Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="relative"
        >
          <div className="flex items-center w-full">
            <Input
              ref={inputRef}
              value={input}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              placeholder="Ask me anything..."
              className="pr-12 h-12 text-base border-2 border-transparent focus:border-primary focus:ring-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 bg-background/90 backdrop-blur"
              disabled={isLoading}
              style={{ minHeight: "48px" }}
            />
            <Button
              onClick={onSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-muted shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              tabIndex={-1}
              type="button"
            >
              <motion.svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </motion.svg>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      // Simulate AI response based on message count
      setTimeout(() => {
        const messageCount = messages.length + 1;
        let aiContent = "";

        if (messageCount === 1) {
          // First response: Table example
          aiContent = `Here's a comprehensive table example with various data types:

| Name | Age | City | Occupation | Salary | Experience | Skills | Rating | Status |
|------|-----|------|------------|--------|------------|--------|--------|--------|
| John Doe | 28 | New York | Software Engineer | $85,000 | 5 years | JavaScript, React, Node.js | 4.8/5 | Active |
| Jane Smith | 32 | San Francisco | Product Manager | $120,000 | 8 years | Agile, Scrum, UX Design | 4.9/5 | Active |
| Mike Johnson | 25 | Austin | Data Scientist | $95,000 | 3 years | Python, SQL, Machine Learning | 4.7/5 | Active |
| Sarah Wilson | 29 | Seattle | UX Designer | $90,000 | 6 years | Figma, Adobe Creative Suite | 4.6/5 | Active |
| David Brown | 35 | Boston | DevOps Engineer | $110,000 | 10 years | Docker, Kubernetes, AWS | 4.9/5 | Active |
| Lisa Davis | 27 | Denver | Frontend Developer | $80,000 | 4 years | HTML, CSS, JavaScript | 4.5/5 | Active |
| Tom Anderson | 31 | Chicago | Backend Developer | $100,000 | 7 years | Java, Spring Boot, MySQL | 4.8/5 | Active |
| Emma Taylor | 26 | Portland | Mobile Developer | $85,000 | 3 years | React Native, Swift, Kotlin | 4.7/5 | Active |

This table demonstrates various data types including text, numbers, currency, and status indicators. The table is fully responsive and will scroll horizontally on mobile devices.`;
        } else if (messageCount === 2) {
          // Second response: Code example
          aiContent = `Here's a comprehensive code example with multiple programming concepts:

\`\`\`javascript
// React Component with TypeScript and Hooks
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'assistant';
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Custom hook for API calls
  const useApi = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (url: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }, []);

    return { data, error, loading, fetchData };
  };

  // Memoized expensive calculation
  const messageStats = useMemo(() => {
    const totalMessages = messages.length;
    const userMessages = messages.filter(m => m.sender === 'user').length;
    const assistantMessages = totalMessages - userMessages;
    
    return {
      total: totalMessages,
      user: userMessages,
      assistant: assistantMessages,
      ratio: totalMessages > 0 ? (userMessages / totalMessages) * 100 : 0
    };
  }, [messages]);

  // Effect for auto-scroll
  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      timestamp: new Date(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: \`Echo: \${input.trim()}\`,
        timestamp: new Date(),
        sender: 'assistant'
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <motion.div 
        className="flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollArea className="h-full p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Message component here */}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default ChatComponent;
\`\`\`

This code example demonstrates:
- **TypeScript interfaces** for type safety
- **React hooks** (useState, useEffect, useCallback, useMemo)
- **Custom hooks** for reusable logic
- **Framer Motion** for animations
- **Error handling** and loading states
- **Responsive design** with Tailwind CSS
- **Performance optimization** with memoization`;
        } else {
          // Default response with comprehensive markdown example
          const jsCode = `import React, { useState, useEffect } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div className="chat-container">
      {messages.map(msg => (
        <div key={msg.id} className="message">
          {msg.content}
        </div>
      ))}
    </div>
  );
};`;

          const pythonCode = `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

class DataProcessor:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.model = None
    
    def preprocess_data(self):
        # Handle missing values
        self.data = self.data.fillna(self.data.mean())
        
        # Feature engineering
        self.data['feature_1'] = self.data['col_1'] * 2
        self.data['feature_2'] = np.log(self.data['col_2'])
        
        return self.data
    
    def train_model(self, target_col):
        X = self.data.drop(target_col, axis=1)
        y = self.data[target_col]
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train your model here
        return X_train, X_test, y_train, y_test

# Usage
processor = DataProcessor('data.csv')
processed_data = processor.preprocess_data()
X_train, X_test, y_train, y_test = processor.train_model('target')`;

          const cssCode = `.chat-message {
  animation: slideIn 0.3s ease-out;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.chat-message:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .chat-message {
    padding: 12px;
    margin: 4px 0;
  }
}`;

          aiContent = `Here's a comprehensive markdown example showcasing various features:

## 📝 **Markdown Elements**

### **Text Formatting**
- **Bold text** and *italic text*
- ~~Strikethrough text~~ and \`inline code\`
- [Link to example](https://example.com)

### **Lists**
1. **Ordered list item 1**
2. **Ordered list item 2**
   - Nested unordered item
   - Another nested item
3. **Ordered list item 3**

### **Unordered Lists**
- 🚀 **Feature 1**: Advanced syntax highlighting
- 📊 **Feature 2**: Responsive tables
- 🎨 **Feature 3**: Beautiful UI components
- ⚡ **Feature 4**: Fast performance

### **Code Examples**

**JavaScript with React:**
\`\`\`javascript
${jsCode}
\`\`\`

**Python with Data Processing:**
\`\`\`python
${pythonCode}
\`\`\`

**CSS with Animations:**
\`\`\`css
${cssCode}
\`\`\`

### **Math Equations**

Inline math: $E = mc^2$

Block math:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

Complex equation:
$$
\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}
$$

### **Blockquotes**

> **Important Note**: This markdown renderer supports all standard markdown features including tables, code blocks, math equations, and more.

> *"The best way to predict the future is to invent it."* - Alan Kay

### **Task Lists**

- [x] ✅ Implement markdown rendering
- [x] ✅ Add syntax highlighting
- [x] ✅ Support math equations
- [x] ✅ Create responsive tables
- [ ] 🔄 Add real-time collaboration
- [ ] 🔄 Implement file uploads

### **Tables**

| Feature | Status | Priority | Complexity |
|---------|--------|----------|------------|
| Markdown Rendering | ✅ Complete | High | Medium |
| Syntax Highlighting | ✅ Complete | High | Low |
| Math Equations | ✅ Complete | Medium | High |
| Responsive Design | ✅ Complete | High | Medium |
| Real-time Updates | 🔄 In Progress | Medium | High |

### **Your Message**
You said: *"${input.trim()}"*

This demonstrates the full power of markdown rendering with syntax highlighting, math equations, tables, and more! 🎉`;
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiContent,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    },
    [input, isLoading, messages.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as any);
      }
    },
    [handleSubmit]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full">
      <AnimatePresence mode="wait">
        {!hasMessages ? (
          // Centered Input for Empty State
          <CenteredInput
            input={input}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSend={() => handleSubmit({ preventDefault: () => {} } as any)}
            isLoading={isLoading}
            inputRef={inputRef}
          />
        ) : (
          // Normal Chat Layout with Messages
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Messages Area - Fixed Height with Scroll */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="px-4 py-6">
                  <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="popLayout">
                      {messages.map((message) => (
                        <div key={message.id}>
                          {message.role === "user" ? (
                            <UserMessage
                              content={message.content}
                              timestamp={message.timestamp}
                            />
                          ) : (
                            <AIMessage
                              content={message.content}
                              timestamp={message.timestamp}
                              isStreaming={message.isStreaming}
                            />
                          )}
                        </div>
                      ))}
                    </AnimatePresence>

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex w-full justify-start mb-4"
                      >
                        <div className="flex w-[300px] md:w-[380px] lg:w-[600px] xl:w-full items-start gap-3">
                          <div className="flex-shrink-0">
                            <Avatar className="h-8 w-8 ring-2 ring-muted">
                              <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="px-0 py-2 max-w-full">
                              <div className="flex items-center gap-3">
                                <div className="flex space-x-1 opacity-50 animate-bounce-slow">
                                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
                                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-100"></div>
                                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-200"></div>
                                </div>
                                <span className="text-sm text-muted-foreground font-medium">
                                  AI is thinking...
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Input Area - Fixed at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-4"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center relative">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="h-14 pr-14 text-base border-2 border-transparent focus:border-primary focus:ring-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 bg-background/90 backdrop-blur"
                    disabled={isLoading}
                    style={{ minHeight: "48px" }}
                  />
                  <Button
                    onClick={() =>
                      handleSubmit({ preventDefault: () => {} } as any)
                    }
                    disabled={!input.trim() || isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-muted shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                    type="button"
                    tabIndex={-1}
                  >
                    <motion.svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </motion.svg>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
