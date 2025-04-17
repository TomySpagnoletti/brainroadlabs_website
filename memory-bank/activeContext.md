# BrainRoad Labs Website - Active Context

## Current Work Focus

The current focus of the BrainRoad Labs website project is implementing and refining the custom scroll transition mechanism. This is a core feature that creates a unique user experience by providing smooth transitions between different sections of the site.

## Recent Changes

1. **Basic Structure Implementation**: The basic structure of the website has been set up with Astro and Tailwind CSS.
2. **Component Creation**: Core components (Home, Project, Contact, Explanation, Credits) have been created.
3. **Layout Development**: The main layout with splash screen and gradient background has been implemented.
4. **Initial Scroll Transition**: A first version of the scroll transition mechanism has been implemented in `scrollTransition.js`.
5. **Responsive Design**: Basic responsive design has been implemented using Tailwind's orientation variants.

## Next Steps

Based on the TODOs found in the codebase, the following tasks are prioritized:

1. **Implement scrollTransitionV2.js**: The current version is empty and needs to be filled with improved scroll transition logic.
2. **CSS for Vertical Mode**: Handle CSS for blocks in vertical mode (portrait orientation) transitions.
3. **Menu Interaction**: Implement hover effects on the navigation menu and highlight the active section.
4. **Touch and Wheel Coordination**: Improve the coordination between touch and wheel events for smoother scrolling.
5. **Logo and Splash Screen**: Complete the logo design and finish the splash screen implementation.
6. **Clean Up Layout**: Remove temporary elements and clean up the Layout.astro file.
7. **SEO Optimization**: Add meta tags for SEO in Layout.astro.
8. **Favicon**: Create and implement a favicon based on the BrainRoad Labs logo.
9. **Cross-browser Testing**: Test the website on multiple browsers and devices.
10. **Mobile Testing**: Ensure proper functionality on mobile devices.

## Active Decisions and Considerations

1. **Scroll Mechanism Approach**: Deciding between improving the current scroll transition implementation or creating a completely new version in scrollTransitionV2.js.
2. **Navigation UX**: Balancing the unique scroll experience with intuitive navigation to ensure users can easily find and access content.
3. **Performance Optimization**: Ensuring smooth animations and transitions, especially with the gradient background effects.
4. **Responsive Design Strategy**: Refining the approach to handle different screen orientations and sizes effectively.

## Important Patterns and Preferences

1. **Component Organization**: Each section of the website is contained in its own Astro component.
2. **CSS Methodology**: Using a combination of Tailwind utility classes and custom CSS with variables.
3. **JavaScript Modularity**: Keeping functionality separated into distinct modules for better organization.
4. **Design Aesthetics**: 
   - Clean, minimal design
   - Rounded corners (20px radius)
   - Gradient colors for visual interest
   - Monospace font (Geist Mono) for body text
   - Sans-serif font (Geist) for headings

## Learnings and Project Insights

1. **Custom Scroll Challenges**: Implementing a custom scroll behavior that feels natural requires careful attention to gesture detection and smooth transitions.
2. **CSS Variables Power**: Using CSS custom properties (variables) for dynamic values has proven effective for managing the scroll transition states.
3. **Astro Advantages**: The Astro framework provides a good balance of static site generation with dynamic capabilities.
4. **Orientation Responsiveness**: Designing for both landscape and portrait orientations requires different approaches to layout and component sizing.
