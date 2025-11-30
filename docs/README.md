# Atron.js Documentation Site

A minimal, static documentation site for Atron.js built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📱 Responsive design with mobile-friendly navigation
- 🌓 Dark/light theme toggle with localStorage persistence
- 📚 Complete API reference and examples
- ⚡ Built with Next.js 15 App Router
- 🎨 Styled with Tailwind CSS
- 🚀 Static Site Generation (SSG) - fully exportable

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Setup

Install dependencies:

```bash
cd docs
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

The development server supports:
- Hot reload for instant updates
- Fast Refresh for React components
- TypeScript type checking

### Build

Create a static export for production:

```bash
npm run build
```

This command:
- Compiles TypeScript to JavaScript
- Optimizes and minifies all assets
- Generates fully static HTML/CSS/JS pages
- Creates an `out/` folder with the static site ready for deployment

The exported site in `out/` can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, S3, etc.).

### Production Server (Optional)

For local testing of the production build:

```bash
npm start
```

Note: With `output: 'export'`, this serves the static files from the `out/` directory.

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Introduction page
│   ├── installation/       # Installation guide
│   ├── usage/              # Getting started guide
│   ├── api/                # API reference
│   ├── examples/           # Integration examples
│   └── globals.css         # Global styles
├── components/
│   ├── Sidebar.tsx         # Desktop navigation
│   ├── MobileSidebar.tsx   # Mobile navigation
│   ├── ThemeToggle.tsx     # Theme switcher
│   ├── ThemeProvider.tsx   # Theme context
│   └── ClientLayout.tsx    # Client wrapper
└── public/                 # Static assets
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **UI**: React 19
- **Build**: Static Site Generation (SSG)

## Documentation Pages

- **Introduction**: Overview of Atron.js features and requirements
- **Installation**: Package manager installation instructions
- **Getting Started**: Quick start guide and common use cases
- **API Reference**: Complete API documentation with examples
- **Examples**: Real-world integration examples (React, Vue, Express, CLI)

## Theme Toggle

The site supports light and dark themes with:
- Automatic system preference detection
- Manual toggle via floating button
- Persistent preference in localStorage
- Smooth transitions between themes

## License

This documentation site is part of the Atron.js project.
