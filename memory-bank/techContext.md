# BrainRoad Labs Website - Technical Context

## Technologies Used

### Core Framework
- **Astro v5.6.0**: A modern static site builder that allows for component-based development with minimal JavaScript.

### CSS Framework
- **Tailwind CSS v4.1.1**: Utility-first CSS framework for rapid UI development.
- **@tailwindcss/vite v4.1.1**: Tailwind CSS integration for Vite.

### JavaScript
- **Vanilla JavaScript**: Used for custom interactions and animations.
- **ES Modules**: For modular JavaScript organization.

### Fonts
- **Geist**: Sans-serif font for headings and UI elements.
- **Geist Mono**: Monospace variant used for body text.

### Build Tools
- **Vite**: Fast, modern frontend build tool (integrated with Astro).
- **Node.js**: JavaScript runtime (v20+ recommended).
- **npm**: Package manager for dependencies.

## Development Setup

### Local Development
- **Development Server**: Run with `npm run dev`
- **Build Process**: Generate production build with `npm run build`
- **Preview**: Preview production build with `npm run preview`

### Project Structure
- **src/components/**: Astro components for different sections
- **src/layouts/**: Layout templates
- **src/pages/**: Page definitions
- **src/assets/**: Static assets
- **src/styles/**: Global styles and CSS utilities
- **src/scripts/**: JavaScript modules for functionality
- **public/**: Static files served as-is

## Technical Constraints

### Browser Compatibility
- Designed for modern browsers with CSS Grid and custom properties support.
- Uses modern JavaScript features (ES6+).

### Performance Considerations
- Animations and transitions should remain smooth on various devices.
- Gradient background effects should not cause performance issues on mobile.

### Accessibility
- Custom scroll behavior must not interfere with basic accessibility requirements.
- Interactive elements need to be keyboard accessible.

## Dependencies

### Direct Dependencies
```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.1",
    "astro": "^5.6.0",
    "tailwindcss": "^4.1.1"
  }
}
```

### External Resources
- Google Fonts for Geist and Geist Mono font families.

## Tool Usage Patterns

### CSS Methodology
- Tailwind utility classes for most styling.
- Custom CSS for specific animations and effects.
- CSS custom properties (variables) for dynamic values.

### JavaScript Organization
- Modular JavaScript with separate files for different functionalities:
  - `index.js`: Main entry point that initializes all features
  - `scrollTransition.js`: Handles custom scroll behavior
  - `interactiveBubble.js`: Manages interactive background elements
  - `responsiveHeaders.js`: Adjusts headers based on viewport
  - `splashScreen.js`: Controls splash screen animation
  - `initDOM.js`: Sets up initial DOM state

### Build and Deployment
- Astro handles the build process, generating static HTML with minimal JavaScript.
- CSS is processed through Tailwind's pipeline.

## Environment Requirements

- **Node.js**: v20+ recommended
- **npm**: For package management
- **Modern browser**: For development and testing

## Technical Debt and Considerations

- The `scrollTransitionV2.js` file is currently empty and needs implementation.
- There are several TODO comments in the codebase that need to be addressed.
- The navigation menu and controls in Layout.astro are marked with TODO for removal.
