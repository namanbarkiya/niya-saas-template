import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ErrorBoundary } from "@/components/error";
import {
  AuthProvider,
  QueryProvider,
  SonnerProvider,
} from "@/components/providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Niya - Modern Next.js Template for Developers & AI Startups",
    template: "%s | Niya - Next.js Template",
  },
  description:
    "Niya is a production-ready Next.js 15 template with Supabase, TypeScript, Tailwind CSS, and modern best practices. Perfect for developers and AI startups building scalable applications with authentication, state management, and beautiful UI components.",
  keywords: [
    "Next.js template",
    "React template",
    "TypeScript template",
    "Supabase template",
    "AI startup template",
    "developer template",
    "modern web app",
    "authentication template",
    "state management",
    "Tailwind CSS",
    "Zustand",
    "React Query",
    "Zod validation",
    "production ready",
    "scalable template",
  ],
  authors: [{ name: "Naman Barkiya", url: "https://github.com/namanbarkiya" }],
  creator: "Naman Barkiya",
  publisher: "Naman Barkiya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://saas.nbarkiya.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saas.nbarkiya.xyz",
    title: "Niya - Modern Next.js Template for Developers & AI Startups",
    description:
      "Production-ready Next.js 15 template with Supabase, TypeScript, Tailwind CSS, and modern best practices. Perfect for developers and AI startups.",
    siteName: "Niya Template",
    images: [
      {
        url: "https://res.cloudinary.com/dbfvcn3f6/image/upload/v1692357294/assets/naman-logo.png",
        width: 512,
        height: 512,
        alt: "Niya Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Niya - Modern Next.js Template for Developers & AI Startups",
    description:
      "Production-ready Next.js 15 template with Supabase, TypeScript, Tailwind CSS, and modern best practices.",
    creator: "@namanbarkiya",
    images: [
      "https://res.cloudinary.com/dbfvcn3f6/image/upload/v1692357294/assets/naman-logo.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your actual verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* THEME FIX: Prevent FOUC by setting theme before React loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
                        `,
          }}
        />
        {/* Structured Data for Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Niya",
              description:
                "Modern Next.js template for developers and AI startups with production-ready features including authentication, state management, and beautiful UI components.",
              url: "https://saas.nbarkiya.xyz",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web Browser",
              author: {
                "@type": "Person",
                name: "Naman Barkiya",
                url: "https://github.com/namanbarkiya",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              softwareVersion: "1.0.0",
              datePublished: "2025-01-01",
              downloadUrl: "https://github.com/namanbarkiya/niya-saas-template",
              image:
                "https://res.cloudinary.com/dbfvcn3f6/image/upload/v1692357294/assets/naman-logo.png",
              featureList: [
                "Next.js 15 with App Router",
                "TypeScript support",
                "Supabase integration",
                "Authentication system",
                "State management with Zustand",
                "React Query for data fetching",
                "Tailwind CSS styling",
                "Zod validation",
                "Modern UI components",
                "Production ready",
              ],
            }),
          }}
        />
        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Niya - Modern Next.js Template",
              url: "https://saas.nbarkiya.xyz",
              description:
                "Production-ready Next.js 15 template for developers and AI startups",
              publisher: {
                "@type": "Person",
                name: "Naman Barkiya",
                url: "https://github.com/namanbarkiya",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://saas.nbarkiya.xyz/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        <ErrorBoundary>
          <QueryProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow">{children}</main>
              </div>
              <SonnerProvider />
            </AuthProvider>
          </QueryProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
