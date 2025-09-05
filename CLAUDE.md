# CLAUDE.md

This file provides guidance to AI assistants when working with code in this repository.

## Technologies
- **Framework**: Astro
- **CSS Framework**: Tailwind CSS
- **JavaScript**: Vanilla JavaScript (ES Modules)
- **Icons**: `astro-icon` (using Heroicons)
- **Analytics**: Vercel Analytics, Vercel Speed Insights
- **Animations**: Lottie
- **Node**: v20+ recommended
- **Package Manager**: npm

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Code Style Guidelines
- **Formatting**: Follow existing file formatting.
- **Components**: Use `.astro` files for components; follow Astro component syntax.
- **CSS**:
  - Use Tailwind CSS classes for styling whenever possible.
  - Global styles and complex animations/layouts in `src/styles/global.css`, utilizing CSS custom properties for theming and dynamic values.
- **Tailwind**:
  - Use arbitrary values with square brackets for precise sizing (e.g., `w-[700px]`).
  - Follow responsive design patterns with orientation variants: `landscape:w-[value] portrait:w-[value]`.
- **JavaScript**:
    - Write modular ES6 JavaScript.
    - Client-side scripts are located in `src/scripts/`.
    - `src/scripts/index.js` serves as the main entry point for initializing JS features.

## Project Structure
- `src/components/`: Reusable Astro components.
- `src/layouts/`: Layout components (e.g., `Layout.astro`).
- `src/pages/`: Astro pages that define routes (e.g., `index.astro`).
- `src/scripts/`: Client-side JavaScript modules.
- `src/styles/`: Global stylesheets.
- `public/`: Static assets directly served.
- `astro.config.mjs`: Astro project configuration.
- `tailwind.config.js`: Tailwind CSS configuration.

## IMPORTANT RULES
- The custom scroll mechanism is managed in `src/scripts/navigation.js` and is based on manipulating the CSS `--order` property. It includes a sophisticated inertia analysis engine.
- The splash screen is implemented using Lottie (`LottieSplash.astro`) and `@lottiefiles/dotlottie-web`.
- All client-side interactivity is handled by modular JavaScript in the `src/scripts/` directory.
- Do not ask to start the server unless specifically troubleshooting server-related issues.