"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Layout, Palette, Type } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CodeExampleProps {
  title: string;
  description: string;
  code: string;
  language?: string;
  children?: React.ReactNode;
}

function CodeExample({
  title,
  description,
  code,
  language = "typescript",
  children,
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={copyToClipboard}>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {children && (
          <div className="mb-4 p-4 border rounded-lg bg-muted/50">
            {children}
          </div>
        )}
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}

export default function ComponentsDocsPage() {
  const [inputValue, setInputValue] = useState("");

  const buttonExamples = [
    {
      title: "Button Variants",
      description: "Different button styles and variants",
      code: `import { Button } from "@/components/ui/button";

// Default button
<Button>Default</Button>

// Secondary variant
<Button variant="secondary">Secondary</Button>

// Outline variant
<Button variant="outline">Outline</Button>

// Destructive variant
<Button variant="destructive">Delete</Button>

// Ghost variant
<Button variant="ghost">Ghost</Button>

// Link variant
<Button variant="link">Link</Button>`,
      children: (
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
    },
    {
      title: "Button Sizes",
      description: "Different button sizes for various use cases",
      code: `import { Button } from "@/components/ui/button";

// Default size
<Button>Default</Button>

// Small size
<Button size="sm">Small</Button>

// Large size
<Button size="lg">Large</Button>

// Icon button
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>`,
      children: (
        <div className="flex items-center gap-2">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const cardExamples = [
    {
      title: "Card Component",
      description: "Flexible card component for content containers",
      code: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`,
      children: (
        <Card>
          <CardHeader>
            <CardTitle>Example Card</CardTitle>
            <CardDescription>This is an example card component</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content area where you can put any content.</p>
          </CardContent>
        </Card>
      ),
    },
  ];

  const badgeExamples = [
    {
      title: "Badge Variants",
      description: "Badge component for status indicators and labels",
      code: `import { Badge } from "@/components/ui/badge";

// Default badge
<Badge>Default</Badge>

// Secondary variant
<Badge variant="secondary">Secondary</Badge>

// Destructive variant
<Badge variant="destructive">Error</Badge>

// Outline variant
<Badge variant="outline">Outline</Badge>`,
      children: (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      ),
    },
  ];

  const inputExamples = [
    {
      title: "Input Component",
      description: "Form input component with various types",
      code: `import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
</div>`,
      children: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-email">Email</Label>
            <Input
              id="demo-email"
              type="email"
              placeholder="Enter your email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-password">Password</Label>
            <Input
              id="demo-password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
      ),
    },
  ];

  const avatarExamples = [
    {
      title: "Avatar Component",
      description: "Avatar component for user profiles and images",
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// With image
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// With fallback only
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
      children: (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">UI Components</h1>
        <p className="text-muted-foreground">
          Reusable UI components built with Radix UI primitives and Tailwind CSS
        </p>
      </div>

      {/* Credits Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Component Credits
          </CardTitle>
          <CardDescription>
            This template uses components from these excellent libraries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">shadcn/ui</span>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Beautiful and accessible components built with Radix UI and
                Tailwind CSS. Used for core UI components like Button, Card,
                Input, etc.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Magic UI</span>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href="https://magicui.design"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced animated components and micro-interactions. Used for
                animated beams, lists, and interactive elements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {/* Button Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Buttons</h2>
            <Badge variant="secondary">Button</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Flexible button component with multiple variants and sizes.
          </p>

          <div className="space-y-6">
            {buttonExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Card Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Cards</h2>
            <Badge variant="secondary">Card</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Card component for displaying content in a structured layout.
          </p>

          <div className="space-y-6">
            {cardExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Badge Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Badges</h2>
            <Badge variant="secondary">Badge</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Badge component for status indicators and labels.
          </p>

          <div className="space-y-6">
            {badgeExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Input Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Form Inputs</h2>
            <Badge variant="secondary">Input</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Form input components with proper labeling and accessibility.
          </p>

          <div className="space-y-6">
            {inputExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Avatar Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Avatars</h2>
            <Badge variant="secondary">Avatar</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Avatar component for user profiles and images with fallback support.
          </p>

          <div className="space-y-6">
            {avatarExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Component Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Available Components</h2>
          <p className="text-muted-foreground mb-6">
            Complete list of available UI components in the template.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Layout Components
                </CardTitle>
                <CardDescription>
                  Components for page structure and layout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Card</span>
                    <Badge variant="outline">Container</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Separator</span>
                    <Badge variant="outline">Divider</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sidebar</span>
                    <Badge variant="outline">Navigation</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Form Components
                </CardTitle>
                <CardDescription>
                  Components for user input and forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Input</span>
                    <Badge variant="outline">Text Input</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Label</span>
                    <Badge variant="outline">Form Label</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Button</span>
                    <Badge variant="outline">Action</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Display Components
                </CardTitle>
                <CardDescription>
                  Components for displaying content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Avatar</span>
                    <Badge variant="outline">Profile</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Badge</span>
                    <Badge variant="outline">Status</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Calendar</span>
                    <Badge variant="outline">Date Picker</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
