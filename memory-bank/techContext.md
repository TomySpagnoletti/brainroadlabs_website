# BrainRoad Labs Website - Technical Context

## Technologies Used

### Core Framework
- **Astro**: Static site builder for component-based development.

### CSS & Styling
- **Tailwind CSS**: Utility-first CSS framework.
  - Integrated via `@tailwindcss/vite`.
  - Configuration in `tailwind.config.js` includes custom `portrait` and `landscape` screen variants.
  - These variants are defined but used sparingly; orientation responsiveness is handled primarily via custom CSS media queries in `src/styles/global.css`.
- **Custom CSS**: Extensive custom styles in `src/styles/global.css` for:
  - Base styling and typography (SF Pro).
  - Splash screen and animated badges.
  - Complex gradient background with SVG filters (`#goo`) and animations.
  - Core layout mechanics for section containers (`.br_container`) using CSS custom properties (`--order`, `--viewport-height`, etc.) for 3D-like transitions.
  - Floating navigation menu styling.

### JavaScript
- **Vanilla JavaScript (ES Modules)**: Used for all client-side interactions.
  - Main entry point: `src/scripts/index.js`.
  - **`navigation.js`**: Manages the core navigation logic, including menu clicks, keyboard events, touch gestures, and a sophisticated scroll inertia analysis engine for mouse wheel events.
  - **`initDOM.js`**: Sets initial CSS variables like `--viewport-height` and container classes.
  - **`interactiveBubble.js`**: Controls the cursor-following background bubble.
  - **`responsiveHeaders.js`**: Adjusts header layouts to prevent overlap.
  - **`modal.js`**: Handles the image gallery modal.
  - **`resize.js`**: Implements draggable resizing of containers on desktop.
- **Lottie Animations**: The splash screen is a Lottie animation handled by `src/components/LottieSplash.astro` and the `@lottiefiles/dotlottie-web` package.

### UI & UX
- **Icons**: `astro-icon` with `@iconify-json/heroicons`.

### Analytics & Monitoring
- **Vercel Analytics**: `@vercel/analytics`.
- **Vercel Speed Insights**: `@vercel/speed-insights`.

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
- `src/components/`: Astro components for sections (Home, Experience, Contact, etc.).
- `src/layouts/`: Main layout (`Layout.astro`).
- `src/pages/`: Astro pages (`index.astro`).
- `src/assets/`: Static assets (fonts, images).
- `public/`: Publicly served static files.
- `src/styles/`: Global CSS (`global.css`, `fonts.css`).
- `src/scripts/`: Client-side JavaScript modules.

## Technical Constraints & Considerations

### Browser Compatibility
- Assumed modern browsers due to usage of CSS Grid, custom properties, `visualViewport`, and ES Modules.
- Safari-specific CSS for `mix-blend-mode` is present.

### Performance
- Animations (gradient background, section transitions, splash screen) need to be performant.
- Vercel Speed Insights is integrated for monitoring.

### Accessibility
- Custom scroll behavior requires careful consideration for accessibility. Keyboard navigation (arrow keys) is implemented.

## Dependencies (from `package.json`)

### Main Dependencies
- `astro`
- `@lottiefiles/dotlottie-web`
- `tailwindcss`
- `@tailwindcss/vite`
- `astro-icon`
- `astro-seo`
- `@vercel/analytics`
- `@vercel/speed-insights`

### Dev Dependencies
- `@iconify-json/heroicons`
- `terser`

## Tool Usage Patterns

### CSS Methodology
- Primarily Tailwind CSS utility classes.
- Extensive custom CSS in `src/styles/global.css` for complex layouts, animations, and theming via CSS custom properties.
- Responsive design heavily relies on `@media (orientation: landscape/portrait)`.

### JavaScript Organization
- Modular, with an `index.js` initializing all features.
- DOM manipulation for dynamic styling and behavior.
- Event listeners for user interactions (click, keydown, wheel, touch, mousemove, resize).
- The core navigation logic is centralized in `src/scripts/navigation.js`.
