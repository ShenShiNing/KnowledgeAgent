# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KnowledgeAgent is a full-stack monorepo project with a React frontend and Express backend, managed using Bun workspaces.

## Technology Stack

### Backend (packages/server)
- **Runtime**: Bun v1.3.6+
- **Framework**: Express 5.2.1
- **Language**: TypeScript 5+
- **Environment**: dotenv for configuration

### Frontend (packages/client)
- **Framework**: React 19.2.0 with Vite 7.2.4
- **Language**: TypeScript 5.9.3
- **UI Components**: shadcn/ui (New York style)
- **Styling**: Tailwind CSS 4.1.18 with CSS variables
- **Component Library**: Radix UI primitives
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge

### Monorepo
- **Package Manager**: Bun workspaces
- **Module System**: ESNext with bundler resolution

## Development Commands

### Installation
```bash
bun install
```

### Running the Server
```bash
cd packages/server
bun run dev          # Development with hot reload
bun run start        # Production mode
```
Server runs on `http://localhost:3000` by default (configurable via PORT env var).

### Running the Client
```bash
cd packages/client
bun run dev          # Development server with HMR
bun run build        # Type check + production build
bun run preview      # Preview production build
bun run lint         # Run ESLint
```

### Workspace Commands
```bash
bun pm ls                           # List all workspaces
bun run --workspaces <script>       # Run script in all workspaces
bun run --filter client dev         # Run script in specific workspace
```

## Project Structure

### Monorepo Architecture
```
packages/
├── server/          # Express backend (Bun runtime)
│   └── index.ts     # Main server entry with /api/hello endpoint
└── client/          # React frontend (Vite)
    └── src/
        ├── components/ui/    # shadcn/ui components
        ├── lib/             # Utilities (e.g., cn() helper)
        ├── App.tsx          # Main application component
        └── main.tsx         # React entry point
```

### Backend Structure
- Single-file Express server in `packages/server/index.ts`
- API endpoints:
  - `GET /` - Basic health check
  - `GET /api/hello` - JSON API example
- Uses dotenv for environment configuration

### Frontend Structure
- Vite-based React app with TypeScript
- shadcn/ui configured with:
  - Style: New York
  - Base color: Slate
  - Path aliases: `@/components`, `@/lib`, `@/hooks`, etc.
  - Icon library: Lucide
- Tailwind CSS with Vite plugin integration

## TypeScript Configuration

### Root tsconfig.json
- `strict: true` - All strict type checking enabled
- `noUncheckedIndexedAccess: true` - Safer array/object access
- `noFallthroughCasesInSwitch: true` - Prevents switch fallthrough bugs
- `noImplicitOverride: true` - Explicit override required
- `module: "Preserve"` - Maintains ESNext module syntax
- `moduleResolution: "bundler"` - Allows importing `.ts` extensions
- `verbatimModuleSyntax: true` - Explicit type import syntax required
- `jsx: "react-jsx"` - Modern React JSX transform

### Client-specific
- Uses project references: `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite config)
- ESLint configured with React hooks and refresh plugins

## Important Notes

### Bun-specific
- This project uses Bun, not Node.js - use Bun commands throughout
- Dependencies are managed via Bun workspaces with symlinked node_modules
- Each workspace package with dependencies gets its own `node_modules` with symlinks to root

### shadcn/ui Components
- Add components: `npx shadcn@latest add <component-name>` (from client directory)
- Components are installed to `src/components/ui/`
- Uses class-variance-authority for variant management
- Tailwind merge utility in `src/lib/utils.ts` handles className conflicts

### Module Resolution
- Backend: Can import `.ts` extensions directly (Bun bundler mode)
- Frontend: Uses Vite's resolver with `@/` path aliases
- Type imports must use `import type` syntax due to `verbatimModuleSyntax`
