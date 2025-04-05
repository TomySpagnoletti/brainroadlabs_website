# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technologies
- **Framework**: Astro v5.6.0
- **CSS Framework**: Tailwind CSS v4.1.1
- **Tailwind Integration**: @tailwindcss/vite v4.1.1
- **Node**: v20+ recommended
- **Package Manager**: npm

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## Code Style Guidelines
- **Formatting**: Use tabs for indentation; follow existing file formatting
- **Imports**: Import statements at the top of the file, sorted alphabetically
- **Components**: Use .astro files for components; follow Astro component syntax
- **CSS**:
  - Use Tailwind CSS classes for styling whenever possible
  - Component-specific styles in `<style>` tags when needed
  - Global styles in src/styles/
- **Tailwind**:
  - Use arbitrary values with square brackets for precise sizing: `w-[700px]`
  - Follow responsive design patterns with orientation variants: `landscape:w-[700px] portrait:w-[300px]`
  - Custom Tailwind config in tailwind.config.js defines orientation variants
- **Naming**: PascalCase for component files (e.g., Layout.astro, Home.astro)
- **HTML**: Use semantic HTML elements; maintain accessibility
- **TypeScript**: Follows strict TypeScript configuration (from Astro defaults)
- **Error Handling**: Use appropriate error boundaries; follow Astro patterns
- **Media**: Place images in src/assets; use relative imports

## Project Structure
- Components in src/components/
- Layouts in src/layouts/
- Pages in src/pages/
- Assets in src/assets/
- Global styles in src/styles/

## Design Preferences
- **Responsive Design**: Adapt layouts based on screen orientation using Tailwind's orientation variants
- Clean, minimal design
- Rounded corners (20px radius)