# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) or other AI assistants when working with code in this repository.

## Technologies
- **Framework**: Astro v5.10.0
- **CSS Framework**: Tailwind CSS v4.1.1
- **Tailwind Integration**: `@tailwindcss/vite` v4.1.1
- **Icon Toolkit**: `astro-icon` (using Heroicons via `@iconify-json/heroicons`)
- **Analytics**: Vercel Analytics, Vercel Speed Insights
- **Node**: v20+ recommended
- **Package Manager**: npm

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## Code Style Guidelines
- **Formatting**: Use tabs for indentation; follow existing file formatting.
- **Imports**: Import statements at the top of the file, generally sorted alphabetically or by type.
- **Components**: Use `.astro` files for components; follow Astro component syntax.
- **CSS**:
  - Use Tailwind CSS classes for styling whenever possible.
  - Component-specific styles in `<style>` tags within `.astro` files when necessary.
  - Global styles and complex animations/layouts in `src/styles/global.css`, utilizing CSS custom properties for theming and dynamic values.
- **Tailwind**:
  - Use arbitrary values with square brackets for precise sizing (e.g., `w-[700px]`).
  - Follow responsive design patterns with orientation variants: `landscape:w-[value] portrait:w-[value]`.
  - Custom Tailwind config in `tailwind.config.js` defines `orientation` variants.
- **Naming**: PascalCase for component files (e.g., `Layout.astro`, `Home.astro`).
- **HTML**: Use semantic HTML elements; maintain accessibility.
- **JavaScript**:
    - Write modular ES6 JavaScript.
    - Client-side scripts are typically located in `src/scripts/`.
    - `src/scripts/index.js` serves as the main entry point for initializing JS features.
- **TypeScript**: Project uses JavaScript primarily, but Astro has built-in TypeScript support. Follow strict TypeScript configuration if/when TS files are added.
- **Error Handling**: Use appropriate error boundaries and patterns as per Astro/JS best practices.
- **Media**: Place images and other static assets in `public/` or `src/assets/` as appropriate.

## Project Structure
- `src/components/`: Reusable Astro components.
- `src/layouts/`: Layout components (e.g., `Layout.astro`).
- `src/pages/`: Astro pages that define routes (e.g., `index.astro`).
- `src/scripts/`: Client-side JavaScript modules.
- `src/styles/`: Global stylesheets (e.g., `global.css`).
- `public/`: Static assets directly served.
- `astro.config.mjs`: Astro project configuration.
- `tailwind.config.js`: Tailwind CSS configuration.

## Design Preferences
- **Responsive Design**: Adapt layouts based on screen orientation (`landscape`/`portrait`) using Tailwind's orientation variants and custom CSS.
- **Visual Style**: Clean, minimal design with engaging animations and interactive elements.
- **Branding**: Rounded corners (e.g., 20px radius), use of gradient colors.

## IMPORTANT RULES
- Do not ask to start the server unless specifically troubleshooting server-related issues.
- Code (comments, variable names, etc.) should generally be in English for consistency.
- Only perform the tasks explicitly requested.
- When removing code, delete it entirely rather than commenting it out, unless the commented code serves a specific explanatory purpose for future reference.
- The custom scroll mechanism is managed in `src/scripts/navigation.js` and is based on manipulating the CSS `--order` property.
- The splash screen is implemented using Lottie (`LottieSplash.astro`) and `@lottiefiles/dotlottie-web`.