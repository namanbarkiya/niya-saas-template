# 🚀 Niya - Modern Next.js Template for Developers & AI Startups

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> **Niya** is a production-ready Next.js 15 template designed for developers and AI startups. Built with modern best practices, it includes authentication, state management, beautiful UI components, and everything you need to build scalable applications.

## ✨ Features

### 🛠️ **Modern Tech Stack**

-   **Next.js 15** with App Router and TypeScript
-   **Supabase** for authentication, database, and real-time features
-   **Tailwind CSS 4** for rapid UI development
-   **Zustand** for lightweight state management
-   **React Query** for server state management
-   **Zod** for runtime type validation

### 🔐 **Authentication & Security**

-   Complete authentication system with Supabase Auth
-   Protected routes and middleware
-   Role-based access control
-   Email confirmation flow
-   Password reset functionality

### 🎨 **Beautiful UI Components**

-   **Magic UI** components for stunning animations
-   **Radix UI** primitives for accessibility
-   **Framer Motion** for smooth animations
-   Dark mode support
-   Responsive design

### 📱 **Developer Experience**

-   Zero-config setup
-   Hot reload with Turbopack
-   ESLint and Prettier configuration
-   TypeScript strict mode
-   Comprehensive error handling

### 🚀 **Production Ready**

-   Optimized for performance
-   SEO-friendly with metadata
-   Image optimization
-   Error boundaries
-   Loading states

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/namanbarkiya/niya-saas-template.git
cd niya-saas-template
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

```bash
cp env-example.env .env.local
```

4. **Configure Supabase**

-   Create a new project at [supabase.com](https://supabase.com)
-   Copy your project URL and anon key
-   Update `.env.local` with your credentials

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
niya-saas-template/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/            # Authentication pages
│   └── signup/           # Registration pages
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── forms/            # Form components
│   ├── landing/          # Landing page components
│   ├── providers/        # Context providers
│   └── ui/               # Base UI components
├── lib/                  # Utility libraries
│   ├── hooks/            # Custom React hooks
│   ├── query/            # React Query configuration
│   ├── store/            # State management
│   ├── supabase/         # Supabase client
│   ├── utils/            # Utility functions
│   └── validations/      # Zod schemas
└── public/               # Static assets
```

## 🎯 Use Cases

### For Developers

-   **Rapid Prototyping**: Get started quickly with a production-ready foundation
-   **Learning**: Study modern React and Next.js patterns
-   **Portfolio Projects**: Showcase your skills with a professional template
-   **Side Projects**: Build MVPs and side projects efficiently

### For AI Startups

-   **AI Application Frontend**: Perfect foundation for AI-powered applications
-   **Dashboard Applications**: Built-in dashboard with authentication
-   **Real-time Features**: Supabase integration for real-time data
-   **Scalable Architecture**: Designed to grow with your business

### For Teams

-   **Consistent Codebase**: Standardized patterns and practices
-   **Type Safety**: Full TypeScript support for better development experience
-   **Testing Ready**: Structured for easy testing implementation
-   **Deployment Ready**: Optimized for Vercel and other platforms

## 🛠️ Customization

### Styling

The template uses Tailwind CSS for styling. You can customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
    theme: {
        extend: {
            colors: {
                // Your custom colors
            },
            fontFamily: {
                // Your custom fonts
            },
        },
    },
};
```

### Components

All components are modular and customizable. Check the `components/` directory for examples.

### Authentication

The authentication system is built with Supabase Auth. You can customize the auth flow in `lib/supabase/`.

## 📚 Documentation

### Technical Details

For detailed technical information, see [Technical Description](./project-details/technical-description.md).

### Architecture

-   **State Management**: Zustand for client state, React Query for server state
-   **Form Handling**: React Hook Form with Zod validation
-   **Error Handling**: Comprehensive error boundaries and toast notifications
-   **Performance**: Optimized with Next.js 15 features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   [Next.js](https://nextjs.org/) - The React framework
-   [Supabase](https://supabase.com/) - The open source Firebase alternative
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
-   [Magic UI](https://magicui.design/) - Beautiful UI components
-   [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI primitives

## 📞 Support

-   **GitHub Issues**: [Report bugs or request features](https://github.com/namanbarkiya/niya-saas-template/issues)
-   **Discussions**: [Join the community](https://github.com/namanbarkiya/niya-saas-template/discussions)
-   **Author**: [Naman Barkiya](https://github.com/namanbarkiya)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=namanbarkiya/niya-saas-template&type=Date)](https://star-history.com/#namanbarkiya/niya-saas-template&Date)

---

**Built with ❤️ by [Naman Barkiya](https://github.com/namanbarkiya)**
