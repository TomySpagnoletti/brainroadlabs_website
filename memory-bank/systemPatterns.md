# BrainRoad Labs Website - System Patterns

## System Architecture

The BrainRoad Labs website is built with Astro, employing a component-based architecture for its frontend.

### Core Architectural Components
- **Main Layout (`Layout.astro`)**: Serves as the global wrapper. It includes:
    - Lottie-based splash screen (`LottieSplash.astro`).
    - Animated gradient background with an interactive bubble.
    - A central `<slot />` for page-specific content.
    - A floating navigation menu.
    - A script (`src/scripts/navigation.js`) that manages the primary section navigation logic.
- **Page (`index.astro`)**: The main entry page that assembles various section components within the `Layout`.
- **Section Components (`src/components/*.astro`)**: Individual, self-contained UI blocks representing different parts of the website (e.g., Home, Project, Contact). Each is typically a `.br_container`.

## Key Technical Decisions & Patterns

### Custom Scroll & Navigation Mechanism
- **CSS Custom Property Driven**: The current active navigation system relies heavily on a CSS custom property `--order` applied to `.br_container` elements.
    - Positive `--order` values generally correspond to sections "below" the current view, stacking with decreasing opacity and z-translation.
    - Negative `--order` values correspond to sections "above" the current view, often styled with a 3D perspective tilt.
    - The section with `--order: 1` is considered the "active" or "front" section.
- **JavaScript Control**:
    - `src/scripts/navigation.js` handles click events on navigation items and keyboard (arrow key) events. It updates the `--order` values on all containers to simulate scrolling through sections.
    - `src/scripts/initDOM.js` initializes container classes based on their initial `--order` values.

### Responsive Design
- **Orientation-Based**: Layouts adapt primarily based on screen orientation (`portrait` vs. `landscape`) using Tailwind CSS variants and custom media queries in `global.css`.
- **Dynamic Sizing**: CSS custom properties like `--container-landscape`, `--container-portrait`, and `--viewport-height` are used to control container dimensions.
- **Header Adjustment**: `src/scripts/responsiveHeaders.js` dynamically adjusts the layout of title and badge elements within headers to prevent overlap on smaller screens.
- **Scrollbar Hiding**: Custom CSS is used to hide scrollbars within `.br_container` elements for a cleaner look.

### State Management (UI)
- **CSS-Driven State**: The visual state of sections (position, opacity, transform) is largely managed by CSS rules reacting to the `--order` custom property.
- **Class Toggling**: JavaScript is used to toggle classes (e.g., `br_splash--hidden`, `.br_container--default-state`, `.br_container--above`) to trigger transitions or apply state-specific styles.
- **Navigation State**: The active navigation item is highlighted based on which section container has `--order: 1`, managed by `src/scripts/navigation.js`.

### Visual & Animation Patterns
- **Animated Gradient Background**: Uses multiple CSS animated `div` elements (`.g1` to `.g5`) with radial gradients, `mix-blend-mode`, and an SVG `feGaussianBlur` filter (`#goo`) to create a "lava lamp" or "metaball" effect. An additional `.interactive` div follows the cursor.
- **Splash Screen**: A Lottie animation is displayed on entry, managed by the `LottieSplash.astro` component. The old `splashScreen.js` has been removed.
- **Component Stacking**: `.br_container` elements are stacked using CSS Grid (`grid-template-areas: "stack"`) within the `.content-wrapper`. Their `z-index` is dynamically calculated based on `--order`.

## Component Relationships (Simplified)

```
Layout.astro
├── LottieSplash
├── GradientBackground (with InteractiveBubble)
├── ContentWrapper (CSS Grid for stacking)
│   └── <slot /> (receives page content, e.g., from index.astro)
│       ├── HomeComponent
│       ├── ProjectComponent (generates multiple project views)
│       ├── ContactComponent
│       ├── ExplanationComponent
│       ├── CreditsComponent
│       └── UnlckUComponent
└── FloatingNavMenu
```

## Data Flow
- **Static Content**: Most textual content is hardcoded within the `.astro` components. The `Project.astro` component iterates over a JavaScript array of project data.
- **User Interaction -> JS -> CSS Variables/Classes**:
    - User actions (clicks on nav, key presses) are captured by `src/scripts/navigation.js`. Mouse movements are handled by `src/scripts/interactiveBubble.js`.
    - JS updates CSS custom properties (like `--order`) or toggles CSS classes on elements.
    - CSS then applies new styles and transitions based on these changes.

## Noteworthy Patterns & TODOs
- **Centralized Scroll Logic**: The navigation logic has been centralized in `src/scripts/navigation.js`, which is a significant improvement over the previous inline script.
- **Placeholder Content**: Several components (`Contact`, `Explanation`, `Unlck-u`, parts of `Project`) contain placeholder "XXX" content.
- **`data-nav-id` Duplication**: `Credits.astro` and `Unlck-u.astro` share the `data-nav-id="nav-explanation"`, which might affect navigation highlighting for these sections.
