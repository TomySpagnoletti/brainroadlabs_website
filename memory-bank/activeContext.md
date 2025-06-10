# BrainRoad Labs Website - Active Context

## Current Work Focus
The primary focus is to **refine and enhance the custom navigation system**, which is now centralized in `src/scripts/navigation.js`. This involves:
1.  Ensuring robust and smooth gesture handling for mouse wheel, touch, and keyboard interactions.
2.  Improving the state management for active sections and navigation UI.
3.  Optimizing the transition performance.

A secondary focus is **populating placeholder content** in several key sections (`Contact`, `Explanation`, `Unlck-u`, and parts of `Project`).

## Recent Changes (based on current codebase state)
- **Navigation Logic Centralized**: The navigation logic, previously in an inline script, has been moved to `src/scripts/navigation.js`.
- **Dependencies Updated**: `astro` to v5.8.0, with additions like `@vercel/analytics`, `@vercel/speed-insights`, and `astro-icon`.
- **New Component**: `Unlck-u.astro` was added to the page structure.
- **Dynamic Styling**: The project heavily relies on CSS custom properties (`--order`, `--viewport-height`, etc.) for layout and animations, controlled via JavaScript.
- **Modular Scripts**: Features like the splash screen, responsive headers, and interactive bubble are handled by dedicated modules in `src/scripts/`.

## Next Steps (Prioritized)
1.  **Refine `navigation.js`**:
    *   Enhance gesture handling (wheel, touch) for a smoother experience.
    *   Ensure correct state management for the active navigation item.
2.  **Fill Placeholder Content**:
    *   `Contact.astro`
    *   `Explanation.astro`
    *   `Unlck-u.astro`
    *   Update `Project.astro` descriptions.
3.  **Address Navigation `data-nav-id`**: Correct the `data-nav-id` for `Credits.astro` and `Unlck-u.astro`.
4.  **Complete UI Elements**: Integrate the final logo and polish the splash screen.
5.  **Code Cleanup**: Systematically review and address all `TODO` comments.

## Active Decisions and Considerations
- **Navigation System**: The core logic is now consolidated in `src/scripts/navigation.js`, which manipulates CSS `--order` properties. The key decision is how to enhance this system for better gesture support and performance.
- **User Experience**: Balancing the unique navigation with intuitive usability across all devices remains a top priority.
- **Performance of Animations**: The gradient background and section transitions need to be monitored for performance, especially on less powerful devices.

## Important Patterns and Preferences (Observed)
- **Component-Driven Structure**: Sections are well-encapsulated Astro components.
- **CSS Custom Properties for Dynamic Styling**: Heavily used for theming, animation parameters, and layout control (e.g., `--order` for section state).
- **Utility-First (Tailwind) with Custom CSS**: Tailwind for general layout and utilities, with significant custom CSS in `global.css` for complex visuals and animations.
- **Modular JavaScript**: Client-side JavaScript is broken into modules by feature, initialized from `index.js`.
- **Responsive Design via Orientation**: `@media (orientation: landscape/portrait)` is a core part of the responsive strategy.
- **Clear TODOs**: The codebase contains many `TODO` comments, indicating areas for future work.

## Learnings and Project Insights
- **Centralized Navigation Logic**: Consolidating the navigation logic into `navigation.js` has simplified the architecture. The `--order`-based system remains a clever and effective way to manage section transitions.
- **Power of CSS Variables**: The project continues to demonstrate the power of CSS custom properties for creating dynamic and state-driven animations.
- **Iterative Refinement**: The evolution from an inline script to a dedicated `navigation.js` module shows a clear iterative process toward a more robust and maintainable solution.
