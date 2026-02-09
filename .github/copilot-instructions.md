# Copilot Instructions for Portfolio Project

## Tech Stack & Architecture

This is a **Next.js 16** App Router portfolio project using:
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** (with new PostCSS plugin system)
- **shadcn/ui** (new-york style, with RSC support and CSS variables)
- **Geist fonts** (Sans & Mono) loaded via `next/font/google`
- Flat ESLint config (`eslint.config.mjs`)

## Project Structure

```
app/
  layout.tsx       # Root layout with font variables & metadata
  page.tsx         # Home page
  globals.css      # Tailwind + shadcn imports + CSS variable theming
components/ui/     # shadcn/ui components (install via CLI)
lib/
  utils.ts         # cn() utility for className merging
components.json    # shadcn/ui configuration
```

## Key Conventions

### Styling & Theming

- **Tailwind v4 syntax**: Use `@import "tailwindcss"` in CSS (not `@tailwind` directives)
- **CSS variables for theming**: Colors defined in `globals.css` as `--background` and `--foreground`
- **Inline theme tokens**: Use `@theme inline` block to map CSS variables to Tailwind tokens
- **Dark mode**: Uses system `prefers-color-scheme` (automatic, no manual toggle)
- **Font variables**: Apply Geist fonts via className: `${geistSans.variable} ${geistMono.variable}`

Example from [app/globals.css](app/globals.css):
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

### shadcn/ui Integration

- **Style**: `new-york` variant with React Server Components support
- **Base color**: `neutral` (configurable in `components.json`)
- **Icon library**: `lucide-react` (use for icons)
- **Installing components**: Run `npx shadcn@latest add <component-name>`
- **className utility**: Use `cn()` from `@/lib/utils` to merge Tailwind classes

Example component import:
```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### TypeScript Configuration

- **Path aliases**: Configured in `components.json` and `tsconfig.json`
  - `@/components` → `./components`
  - `@/lib` → `./lib`
  - `@/hooks` → `./hooks`
- **Strict mode enabled**: All TypeScript strict checks are active
- **Module resolution**: Uses `bundler` mode with ESNext modules

### Component Patterns

- **Server Components by default**: All components in `app/` are React Server Components unless marked with `'use client'`
- **Image optimization**: Always use `next/image` for images (see [app/page.tsx](app/page.tsx#L3))
- **Metadata**: Define in `layout.tsx` using Next.js `Metadata` type

## Development Workflow

```bash
npm run dev     # Start dev server on :3000
npm run build   # Production build
npm run lint    # Run ESLint (flat config)

# shadcn/ui component management
npx shadcn@latest add button        # Add specific component
npx shadcn@latest add button card   # Add multiple components
npx shadcn@latest diff button       # Check for component updates
```

## Critical Implementation Details

1. **Don't use Tailwind v3 syntax** - This project uses v4 with PostCSS plugin (`@tailwindcss/postcss`)
2. **Font loading**: Fonts are configured in `layout.tsx` and applied as CSS variables to body
3. **Responsive design**: Use Tailwind responsive classes (`sm:`, `md:`) as seen in [app/page.tsx](app/page.tsx)
4. **Dark mode classes**: Apply `dark:` variants - they work automatically via media query

## When Adding New Features

- Create new routes as directories in `app/` with `page.tsx`
- **UI components**: Install via `npx shadcn@latest add <component>` - they'll go to `components/ui/`
- **Custom components**: Add to `components/` directory (non-UI)
- Use TypeScript for all new files
- Follow the existing font variable and theming pattern
- Prioritize Server Components; only use Client Components (`'use client'`) when needed for interactivity
- Always use `cn()` utility when conditionally applying classes
