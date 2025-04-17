# BrainRoad Labs Website - System Patterns

## System Architecture

The BrainRoad Labs website is built using a component-based architecture with Astro as the main framework. The system is designed around the following key architectural patterns:

### Component Structure
- **Layout Component**: Serves as the main wrapper for all pages, containing common elements like the splash screen, background, and navigation.
- **Section Components**: Individual content sections (Home, Projects, Contact, Explanation, Credits) that are stacked and manipulated by the scroll transition system.
- **Utility Components**: Smaller, reusable components that provide specific functionality.

### Page Composition
- Pages are composed by importing and assembling components.
- The main index page imports all section components and arranges them in the desired order.

## Key Technical Decisions

### Custom Scroll Mechanism
- Implemented a custom scroll transition system that overrides the default browser scrolling behavior.
- Uses CSS custom properties (variables) and JavaScript to control the position and appearance of sections.
- Sections are assigned an `--order` value that determines their position in the stack.

### Responsive Design Approach
- Uses Tailwind CSS for responsive styling.
- Implements orientation-specific layouts using Tailwind's orientation variants.
- Adjusts container dimensions based on screen orientation (landscape vs. portrait).

### Animation and Transitions
- Smooth transitions between sections using CSS transforms and transitions.
- Interactive background with animated gradient bubbles.
- Splash screen with fade-out animation.

## Design Patterns in Use

### Observer Pattern
- Used in scroll event handling to detect and respond to user scroll actions.
- Touch events are also observed and translated into appropriate scroll actions.

### Factory Pattern
- Component initialization follows a factory-like pattern where each component's initialization function is called from a central location.

### State Management
- Section state (current position, visibility) is managed through CSS custom properties and class toggling.
- Navigation state is tracked to ensure proper section transitions.

## Component Relationships

```
Layout (Layout.astro)
├── Splash Screen
├── Background (Gradient Bubbles)
├── Content Wrapper
│   ├── Home Component
│   ├── Project Component
│   ├── Contact Component
│   ├── Explanation Component
│   └── Credits Component
└── Navigation Menu
```

## Critical Implementation Paths

### Scroll Transition System
1. User initiates scroll (wheel or touch)
2. Event listeners detect the scroll action
3. The scroll direction is determined
4. Section order values are updated
5. CSS transitions animate the sections to their new positions

### Responsive Adaptation
1. CSS media queries detect screen orientation
2. Container dimensions adjust based on orientation
3. Layout adapts to provide optimal viewing experience

### Interactive Elements
1. Mouse/touch position is tracked
2. Background elements respond to user interaction
3. Navigation menu allows direct jumping to specific sections

## Data Flow

- **Static Content**: Most content is static and defined directly in the component files.
- **User Interaction**: User interactions (scroll, touch, clicks) are captured by event listeners.
- **Visual State**: The visual state of the application is primarily controlled through CSS custom properties and class manipulation.
