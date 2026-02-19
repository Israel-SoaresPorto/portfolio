# Agent Guidelines for Portfolio Project

This document provides comprehensive guidelines for AI coding agents working on this Next.js portfolio project.

## Tech Stack

- **Next.js 16** (App Router) with React 19
- **TypeScript** (strict mode enabled)
- **Tailwind CSS v4** (PostCSS plugin system)
- **shadcn/ui** (new-york style with RSC support)
- **Jest** with React Testing Library
- **ESLint** (flat config)

## Build/Lint/Test Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Build
npm run build            # Create production build
npm start                # Start production server

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
jest <path-to-test>      # Run a single test file
jest -t "test name"      # Run tests matching pattern

# Linting
npm run lint             # Run ESLint with flat config
```

### Running Single Tests

```bash
# Run specific test file
npm test __tests__/components/header.test.tsx

# Run specific test case by name
npm test -- -t "deve renderizar o logo"

# Run tests for a specific component
npm test -- header
```

## Project Structure

```
app/
  layout.tsx           # Root layout with metadata & fonts
  page.tsx             # Home page (Server Component)
  globals.css          # Tailwind + theme variables
components/
  ui/                  # shadcn/ui components
  sections/            # Page sections (Hero, About, Skills, etc.)
  header.tsx           # Navigation header
  footer.tsx           # Footer component
  project-card.tsx     # Project display card
lib/
  types.ts             # TypeScript type definitions
  utils.ts             # Utility functions (cn helper)
data/
  projects.json        # Project data
__tests__/             # Jest tests mirroring component structure
```

## Code Style Guidelines

### Imports

**Order:** External packages → Next.js imports → React → UI components → Icons → Utilities → Types

```typescript
// 1. External packages
import Link from "next/link";
import Image from "next/image";

// 2. React
import { useState, useEffect } from "react";

// 3. UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// 4. Icons
import { Sun, Moon, Menu } from "lucide-react";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";

// 5. Utilities & Hooks
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// 6. Types
import { Project, ProjectCategory } from "@/lib/types";
```

### Path Aliases

Use `@/` prefix for all internal imports:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";
```

### Component Patterns

**Server Components by default** - Only use `"use client"` when needed for:
- State management (useState, useEffect)
- Browser APIs (window, localStorage)
- Event handlers
- Theme/context consumers

```typescript
// Client Component (when needed)
"use client";

import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // ...
}

// Server Component (default - no directive needed)
export function ProjectList() {
  return <div>{/* ... */}</div>;
}
```

### TypeScript

**Always use strict typing:**

```typescript
// Define interfaces for props
interface ProjectCardProps {
  project: Project;
  className?: string;
}

// Use type imports
import type { Metadata } from "next";

// Export types alongside components
export type { ProjectCardProps };
```

### Styling with Tailwind

**Use `cn()` utility for conditional classes:**

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class another-class",
  condition && "conditional-class",
  isActive ? "active-class" : "inactive-class",
  className // Allow external className override
)} />
```

**Responsive design:**
- Mobile-first approach
- Use breakpoints: `sm:` `md:` `lg:` `xl:`
- Dark mode: Use `dark:` prefix (automatic via media query)

### Naming Conventions

- **Components:** PascalCase (`ProjectCard`, `Header`)
- **Files:** kebab-case for components (`project-card.tsx`, `header.tsx`)
- **Functions/Variables:** camelCase (`handleClick`, `isMenuOpen`)
- **Constants:** UPPER_SNAKE_CASE or camelCase for arrays (`navItems`, `API_URL`)
- **Types/Interfaces:** PascalCase (`Project`, `ProjectCardProps`)

### Testing

**Use React Testing Library patterns:**

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { ComponentName } from "@/components/component-name";

describe("ComponentName", () => {
  it("deve descrever o comportamento esperado", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected text")).toBeInTheDocument();
  });
});
```

**Test descriptions in Portuguese** (following existing pattern)

**Mock external dependencies:**
```typescript
// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock hooks
jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: jest.fn() }),
}));
```

## Critical Implementation Details

### Tailwind v4 Syntax
- Use `@import "tailwindcss"` in CSS (NOT `@tailwind` directives)
- Theme tokens via `@theme inline` block in globals.css

### Font Loading
- Fonts configured in `app/layout.tsx`
- Apply via className: `${font.className}`

### shadcn/ui Components
```bash
npx shadcn@latest add button      # Add component
npx shadcn@latest diff button     # Check updates
```

### Image Optimization
**Always use next/image:**
```typescript
import Image from "next/image";

<Image
  src="/path/to/image.png"
  alt="Descriptive alt text"
  fill                    // For responsive containers
  className="object-cover"
/>
```

### Error Handling

For async operations, use try-catch:
```typescript
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error("Error fetching data:", error);
  // Handle error appropriately
}
```

### Accessibility

- Use semantic HTML
- Include `aria-label` for icon buttons
- Add `alt` text for images
- Use proper heading hierarchy
- Ensure keyboard navigation works

## When Making Changes

1. **Creating Routes:** Add directories in `app/` with `page.tsx`
2. **UI Components:** Install via shadcn CLI → goes to `components/ui/`
3. **Custom Components:** Add to `components/` directory
4. **Types:** Define in `lib/types.ts`
5. **Data:** Add to `data/` directory (JSON format)
6. **Tests:** Mirror component structure in `__tests__/`

## Coverage Exclusions

The following are excluded from coverage (see jest.config.ts):
- `/node_modules/`
- `/.next/`
- `/src/components/ui/` (shadcn components)
- `/src/lib/` (utility functions)
- `/src/data/` (static data)

## Best Practices

- Prioritize Server Components for better performance
- Use `cn()` for all conditional className logic
- Follow existing test patterns (descriptions in Portuguese)
- Keep components focused and single-responsibility
- Extract reusable logic into hooks (`hooks/` directory)
- Use TypeScript strict mode - no `any` types
- Ensure responsive design on all screen sizes
- Test both happy path and edge cases
