# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KnowledgeAgent is a monorepo project managed with Bun workspaces. The project uses TypeScript and is currently in early development stage with minimal implementation.

## Technology Stack

- **Runtime**: Bun v1.3.6+
- **Language**: TypeScript 5+
- **Module System**: ESNext with bundler resolution
- **Workspace Structure**: Bun workspaces with packages in `packages/*`

## Development Commands

### Installation
```bash
bun install
```

### Running the Application
```bash
# Run root entry point
bun run index.ts

# Run server package
cd packages/server
bun run index.ts
```

### TypeScript Configuration
The project uses strict TypeScript settings with:
- `strict: true` - All strict type checking enabled
- `noUncheckedIndexedAccess: true` - Safer array/object access
- `noFallthroughCasesInSwitch: true` - Prevents switch fallthrough bugs
- `noImplicitOverride: true` - Explicit override required
- Module resolution: bundler mode with ESNext modules

## Project Structure

### Monorepo Architecture
- **Root**: Main workspace configuration and entry point
- **packages/server**: Express-based server package (currently minimal)
- **packages/client**: Empty client package placeholder

### Current State
Both `index.ts` files (root and server) currently contain placeholder code. The server package has Express 5.2.1 configured but not yet implemented.

## Important Notes

- This is a Bun project - use Bun's native commands and features
- The project uses `"module": "Preserve"` to maintain ESNext module syntax
- TypeScript uses `moduleResolution: "bundler"` which allows importing `.ts` extensions
- `verbatimModuleSyntax: true` is enabled - import type syntax must be explicit
- The client package exists but is currently empty
