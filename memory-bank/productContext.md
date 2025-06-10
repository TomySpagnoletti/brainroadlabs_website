# BrainRoad Labs Website - Product Context

## Why This Project Exists
The BrainRoad Labs website serves as the company's digital presence, designed to:
- Showcase technical expertise and innovative capabilities.
- Attract potential clients and partners.
- Present a portfolio of projects and services.
- Serve as a point of contact and information for individuals interested in the company, including potential talent (#OpenToWork).

## Problems It Solves
- **Establishes Professional Online Presence**: Provides a credible and modern front for BrainRoad Labs.
- **Demonstrates Technical Prowess**: The website itself, with its custom interactions and animations, acts as a live demo of the company's skills.
- **Communicates Value Proposition**: Clearly articulates what BrainRoad Labs offers, its experience (e.g., Jean Paul Gaultier, CES 2023 feature), and its approach of blending experimentation with robust engineering.
- **Facilitates Contact and Engagement**: Offers a way for interested parties to learn more and potentially reach out.

## How It Should Work (Current & Intended)
The site is structured as a single-page experience with multiple content sections.
- **Section-Based Navigation**: Content is divided into distinct sections (Home, Projects, Contact, Explanation, Credits, Unlck-u).
- **Custom Scroll/Transition Experience**:
    - Users navigate between these sections using a custom mechanism rather than traditional browser scrolling.
    - The navigation is handled by `src/scripts/navigation.js`, which manipulates CSS `--order` properties to create a 3D stacking/sliding effect.
    - Navigation is triggered by a floating menu and keyboard arrow keys, with plans to enhance wheel and touch gesture support.
- **Visual Interactivity**:
    - An animated gradient background with "metaball" style effects.
    - An interactive bubble element that follows the mouse cursor.
- **Responsive Adaptation**: The layout and component dimensions adjust based on screen orientation (landscape/portrait).
- **Splash Screen**: A brief animated splash screen (`BR`) is shown on initial load.

## User Experience Goals
- **Memorable and Innovative**: Leave a strong impression of technical skill and creativity through unique interactions.
- **Intuitive Navigation**: Despite the custom scroll, navigation should feel relatively easy and predictable. The floating menu and keyboard controls aid this.
- **Visually Engaging**: Maintain a clean, modern aesthetic with smooth animations and appealing visual effects (gradients, rounded corners).
- **Clear Information Hierarchy**: Present information about the company, its services, and projects in an organized manner.
- **Performant**: Ensure quick load times and fluid animations.

## Target Personas
- **Potential Clients**: Businesses or individuals seeking advanced web/mobile development, AI, or blockchain solutions.
- **Technical Partners**: Other tech companies or developers looking for collaboration.
- **Recruiters/Talent**: Professionals interested in working with BrainRoad Labs.
- **Tech Enthusiasts**: Individuals interested in innovative web design and development.
