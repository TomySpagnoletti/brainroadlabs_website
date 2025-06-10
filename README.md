# BrainRoad Labs Website

## 🚀 Overview

BrainRoad Labs is a professional web and mobile development company providing innovative technical solutions. This repository contains the source code for our official website, featuring a unique interactive experience with custom scroll transitions, responsive design, and engaging animations.

Our site serves as both a portfolio of our work and a demonstration of our technical capabilities through modern web implementation.

## ✨ Features

- **Custom Scroll Experience**: Smooth transitions between content sections using a custom mechanism.
- **Adaptive Design**: Automatically adapts to portrait and landscape screen orientations.
- **Interactive Elements**: Dynamic animated gradient background with a cursor-following bubble.
- **Modern Technology Stack**: Built with Astro, Tailwind CSS, and Vanilla JavaScript.
- **Component-Based**: Modular design using Astro components.
- **Splash Screen**: Initial loading animation.

## 🛠️ Technology Stack

- **Framework**: Astro v5.8.0
- **CSS Framework**: Tailwind CSS v4.1.1
- **Tailwind Integration**: `@tailwindcss/vite` v4.1.1
- **Icon Toolkit**: `astro-icon` (with Heroicons)
- **JavaScript**: Vanilla JS with modular architecture
- **Typography**: Geist and Geist Mono fonts
- **Analytics**: Vercel Analytics & Speed Insights
- **Node**: v20+ recommended

## 🏗️ Project Structure

```
/
├── public/              # Static assets served as-is (e.g., favicon.svg)
├── src/
│   ├── assets/          # Project assets (images, etc.)
│   ├── components/      # Astro components (Home, Project, Contact, etc.)
│   ├── layouts/         # Layout templates (Layout.astro)
│   ├── pages/           # Page definitions (index.astro)
│   ├── scripts/         # JavaScript modules (e.g., navigation.js, interactiveBubble.js)
│   └── styles/          # Global styles (global.css)
├── astro.config.mjs     # Astro configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## 🎯 Design Philosophy

Our website emphasizes:
- **Memorable Experience**: Creating a strong first impression through innovative navigation and visuals.
- **Visual Consistency**: Maintaining a cohesive aesthetic with smooth transitions and elegant design.
- **Performance**: Ensuring fast loading times and smooth animations.
- **Accessibility**: Striving to support different devices and screen orientations effectively.

## 👥 Target Audience

- **Potential Clients**: Businesses seeking web/mobile development services.
- **Technical Partners**: Technology companies looking for collaborations.
- **Talent**: Professionals interested in work opportunities.
- **Tech Community**: Developers interested in innovative approaches.

## 📋 Development Guidelines

- **Styling**: Primarily use Tailwind CSS classes; supplement with custom CSS in `src/styles/global.css` for complex effects and theming via CSS custom properties.
- **Components**: Follow Astro component structure for modularity.
- **Responsiveness**: Implement orientation-specific layouts (landscape/portrait) using Tailwind variants and custom CSS.
- **JavaScript**: Organize client-side code in modular ES6 modules (like `navigation.js`), initialized from `src/scripts/index.js`.

## 📄 License

© BrainRoad Labs - All Rights Reserved