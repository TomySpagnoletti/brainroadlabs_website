# BrainRoad Labs Website - System Patterns

## System Architecture

The BrainRoad Labs website is built with Astro, employing a component-based architecture for its frontend.

### Core Architectural Components
- **Main Layout (`Layout.astro`)**: Serves as the global wrapper. It includes:
    - Lottie-based splash screen (`LottieSplash.astro`).
    - Animated gradient background with an interactive bubble.
    - A central `<slot />` for page-specific content.
    - A floating navigation menu.
    - An image modal (`Modal.astro`).
- **Page (`index.astro`)**: The main entry page that assembles various section components within the `Layout`.
- **Section Components (`src/components/*.astro`)**: Individual, self-contained UI blocks representing different parts of the website (e.g., Home, Experience, Contact). Each is a `.br_container`.
- **Scripts (`src/scripts/*.js`)**: Modular JavaScript files that handle all client-side interactivity, initialized from `index.js`.

## Key Technical Decisions & Patterns

### Custom Scroll & Navigation Mechanism
- **CSS Custom Property Driven**: The navigation system relies on a CSS custom property `--order` applied to `.br_container` elements.
    - The section with `--order: 1` is considered the "active" or "front" section.
    - Positive `--order` values correspond to sections "below" the current view.
    - Negative `--order` values correspond to sections "above" the current view, styled with a 3D perspective tilt.
- **JavaScript Control**:
    - `src/scripts/navigation.js` handles menu clicks, keyboard events, touch gestures, and mouse wheel input. It updates the `--order` values on all containers to simulate scrolling.
    - A scroll inertia analysis engine within `navigation.js` distinguishes between intentional page navigation and scrolling within overflowed content.
- **DOM Initialization**: `src/scripts/initDOM.js` initializes container classes and CSS variables based on their initial state.

### Responsive Design
- **Orientation-Based**: Layouts adapt primarily based on screen orientation (`portrait` vs. `landscape`) using Tailwind CSS variants and custom media queries.
- **Dynamic Sizing**: CSS custom properties like `--container-landscape`, `--container-portrait`, and `--viewport-height` are used to control container dimensions.
- **Header Adjustment**: `src/scripts/responsiveHeaders.js` dynamically adjusts the layout of title and badge elements to prevent overlap.
- **Container Resizing**: `src/scripts/resize.js` allows users to drag-resize containers on desktop.

### State Management (UI)
- **CSS-Driven State**: The visual state of sections (position, opacity, transform) is managed by CSS rules reacting to the `--order` custom property.
- **Class Toggling**: JavaScript toggles classes (e.g., `br_container--above`) to trigger transitions or apply state-specific styles.
- **Navigation State**: The active navigation item is highlighted based on which section has `--order: 1`, managed by `navigation.js`.
- **Modal State**: A global `window.isModalOpen` flag is used to prevent background interactions when the image modal is open.

### Visual & Animation Patterns
- **Animated Gradient Background**: Uses multiple CSS animated `div` elements with radial gradients, `mix-blend-mode`, and an SVG `feGaussianBlur` filter (`#goo`) to create a "metaball" effect. An interactive div follows the cursor.
- **Splash Screen**: A Lottie animation is displayed on entry, managed by the `LottieSplash.astro` component and `lottieSplash.js`.
- **Component Stacking**: `.br_container` elements are stacked using CSS Grid (`grid-template-areas: "stack"`). Their `z-index` is dynamically calculated based on `--order`.

## Component Relationships (Simplified)
```
Layout.astro
├── LottieSplash
├── GradientBackground (with InteractiveBubble)
├── ContentWrapper (CSS Grid for stacking)
│   └── <slot /> (receives page content from index.astro)
│       ├── HomeComponent
│       ├── ExperienceComponent
│       ├── ContactComponent
│       ├── CreditsComponent
│       └── UnlckUComponent
├── FloatingNavMenu
└── Modal
```

## Data Flow
- **Static Content**: Most content is hardcoded within the `.astro` components. The `Experience.astro` component currently uses static markup. A previous iteration pattern exists in `src/components/Project_deprecated.astro` but is not used in `src/pages/index.astro`.
- **User Interaction -> JS -> CSS Variables/Classes**:
    - User actions (clicks, key presses, gestures, mouse movements) are captured by the relevant JavaScript modules in `src/scripts/`.
    - JS updates CSS custom properties (like `--order`) or toggles CSS classes on elements.
    - CSS then applies new styles and transitions based on these changes.
