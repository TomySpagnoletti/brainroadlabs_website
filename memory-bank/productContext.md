# BrainRoad Labs Website - Product Context

## Why This Project Exists
The BrainRoad Labs website serves as the company's digital presence, designed to:
- Showcase technical expertise and innovative capabilities.
- Attract potential clients, partners, and collaborators.
- Present a portfolio of projects and professional experience.
- Serve as a point of contact for individuals interested in the company.

## Problems It Solves
- **Establishes Professional Online Presence**: Provides a credible and modern front for BrainRoad Labs.
- **Demonstrates Technical Prowess**: The website itself, with its custom interactions and animations, acts as a live demo of the company's skills.
- **Communicates Value Proposition**: Clearly articulates what BrainRoad Labs offers and its approach of blending experimentation with robust engineering.
- **Facilitates Contact and Engagement**: Offers a clear and accessible way for interested parties to connect.

## How It Should Work
The site is structured as a single-page experience with multiple content sections.
- **Section-Based Navigation**: Content is divided into distinct sections (Home, Experience, Contact, Credits, Unlck-u).
- **Custom Scroll/Transition Experience**:
    - Users navigate between sections using a custom mechanism rather than traditional browser scrolling.
    - The navigation is handled by `src/scripts/navigation.js`, which manipulates CSS `--order` properties to create a 3D stacking/sliding effect.
    - Navigation is triggered by a floating menu, keyboard arrow keys, mouse wheel, and touch gestures.
    - A scroll inertia analysis engine helps distinguish between page navigation and scrolling within content.
- **Visual Interactivity**:
    - An animated gradient background with "metaball" style effects.
    - An interactive bubble element that follows the mouse cursor.
- **Responsive Adaptation**: The layout and component dimensions adjust based on screen orientation (landscape/portrait).
- **Splash Screen**: A brief animated Lottie splash screen is shown on initial load.
- **Image Gallery**: Zoomable images open in a full-screen modal with gallery navigation.

## User Experience Goals
- **Memorable and Innovative**: Leave a strong impression of technical skill and creativity through unique interactions.
- **Intuitive Navigation**: Despite the custom scroll, navigation should feel easy and predictable across all devices.
- **Visually Engaging**: Maintain a clean, modern aesthetic with smooth animations and appealing visual effects.
- **Clear Information Hierarchy**: Present information about the company, its services, and projects in an organized manner.
- **Performant**: Ensure quick load times and fluid animations.

## Target Personas
- **Potential Clients**: Businesses or individuals seeking advanced web/mobile development, AI, or blockchain solutions.
- **Technical Partners**: Other tech companies or developers looking for collaboration.
- **Recruiters/Talent**: Professionals interested in working with BrainRoad Labs.
- **Tech Enthusiasts**: Individuals interested in innovative web design and development.
