# BrainRoad Labs Website - Technical Context

## Technologies Used

### Core Framework
- **Astro v5.8.0**: Static site builder for component-based development.

### CSS & Styling
- **Tailwind CSS v4.1.1**: Utility-first CSS framework.
  - Integrated via `@tailwindcss/vite` v4.1.1.
  - Configuration in `tailwind.config.js` includes custom `portrait` and `landscape` screen variants.
- **Custom CSS**: Extensive custom styles in `src/styles/global.css` for:
  - Base styling, typography (Geist, Geist Mono).
  - Splash screen, animated badges.
  - Complex gradient background with SVG filters (`#goo`) and animations.
  - Core layout mechanics for section containers (`.br_container`) using CSS custom properties (`--order`, `--viewport-height`, etc.) for 3D-like transitions.
  - Floating navigation menu styling.

### JavaScript
- **Vanilla JavaScript (ES Modules)**: Used for all client-side interactions.
  - Main entry point: `src/scripts/index.js`.
  - Modules for:
    - DOM initialization (`initDOM.js`): Sets CSS variables like `--viewport-height`, `--max-blocks`, and initial container classes.
    - Interactive background bubble (`interactiveBubble.js`).
    - Responsive header adjustments (`responsiveHeaders.js`).
    - Splash screen handling (`splashScreen.js`).
    - Scroll transition logic:
      - `src/scripts/navigation.js`: Manages the core navigation logic by manipulating CSS `--order` properties.

### UI & UX
- **Icons**: `astro-icon` v1.1.5 with `@iconify-json/heroicons` v1.2.2.

### Analytics & Monitoring
- **Vercel Analytics**: `@vercel/analytics` v1.5.0.
- **Vercel Speed Insights**: `@vercel/speed-insights` v1.2.0.

### Build Tools & Environment
- **Vite**: Frontend build tool (via Astro).
- **Node.js**: v20+ recommended.
- **npm**: Package manager.

## Development Setup

### Local Development
- Server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

### Project Structure
- `src/components/`: Astro components for sections (Home, Project, Contact, Explanation, Credits, Unlck-u).
- `src/layouts/`: Main layout (`Layout.astro`).
- `src/pages/`: Astro pages (`index.astro`).
- `src/assets/`: Static assets (e.g., images, not explicitly seen but typical).
- `public/`: Publicly served static files (e.g., `favicon.svg`).
- `src/styles/`: Global CSS (`global.css`).
- `src/scripts/`: Client-side JavaScript modules.

## Technical Constraints & Considerations

### Browser Compatibility
- Assumed modern browsers due to usage of CSS Grid, custom properties, `visualViewport`, and ES Modules.
- Safari-specific CSS for `mix-blend-mode` is present.

### Performance
- Animations (gradient background, section transitions, splash screen) need to be performant.
- Vercel Speed Insights is integrated for monitoring.

### Accessibility
- Custom scroll behavior needs careful consideration for accessibility (keyboard navigation, screen readers).
- Current inline script in `Layout.astro` includes keyboard (arrow key) navigation.

## Dependencies (from `package.json`)

### Main Dependencies
- `astro`: ^5.8.0
- `tailwindcss`: ^4.1.1
- `@tailwindcss/vite`: ^4.1.1
- `astro-icon`: ^1.1.5
- `@vercel/analytics`: ^1.5.0
- `@vercel/speed-insights`: ^1.2.0

### Dev Dependencies
- `@iconify-json/heroicons`: ^1.2.2

## Tool Usage Patterns

### CSS Methodology
- Primarily Tailwind CSS utility classes.
- Extensive custom CSS in `src/styles/global.css` for complex layouts, animations, and theming via CSS custom properties.
- Responsive design heavily relies on `@media (orientation: landscape/portrait)` and custom screen variants in Tailwind.

### JavaScript Organization
- Modular, with an `index.js` initializing various features.
- DOM manipulation for dynamic styling and behavior (e.g., setting CSS variables, class toggling).
- Event listeners for user interactions (scroll, touch, mousemove, resize, keydown) and lifecycle events (`DOMContentLoaded`).
- The scroll/navigation logic is now centralized in `src/scripts/navigation.js`, which is initialized from `index.js`.

### Build and Deployment
- Astro handles the build process.
- Vercel tools suggest potential deployment on Vercel.
