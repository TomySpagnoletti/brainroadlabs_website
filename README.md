# BrainRoad Labs Website

## 🚀 Overview

This repository contains the source code for the official BrainRoad Labs website, a portfolio and technical showcase built with Astro, Tailwind CSS, and Vanilla JavaScript. It features a unique interactive experience with a custom scroll transition engine, responsive design, and engaging animations.

## ✨ Features

- **Custom Scroll Engine**: Smooth transitions between content sections using a custom mechanism with inertia analysis for precise control.
- **Adaptive Design**: Automatically adapts to portrait and landscape screen orientations.
- **Interactive Elements**: Dynamic animated gradient background with a cursor-following bubble.
- **Modern Technology Stack**: Built with Astro, Tailwind CSS, and a modular Vanilla JavaScript architecture.
- **Component-Based**: Modular design using Astro components.
- **Lottie Splash Screen**: An animated splash screen provides a polished entry experience.
- **Image Gallery**: A full-screen modal for viewing zoomable images.
- **Container Resizing**: Draggable resizing of content containers on desktop.

## 🛠️ Technology Stack

- **Framework**: Astro
- **CSS Framework**: Tailwind CSS
- **JavaScript**: Vanilla JS (ES Modules)
- **Icons**: Astro Icon (with Heroicons)
- **Animations**: Lottie
- **Analytics**: Vercel Analytics & Speed Insights
- **Node**: v20+ recommended

## 🏗️ Project Structure

```
/
├── public/              # Static assets (favicon, animations, etc.)
├── src/
│   ├── assets/          # Project assets (images, fonts)
│   ├── components/      # Astro components (Home, Experience, Contact, etc.)
│   ├── layouts/         # Layout templates (Layout.astro)
│   ├── pages/           # Page definitions (index.astro)
│   ├── scripts/         # JavaScript modules (navigation.js, modal.js, etc.)
│   └── styles/          # Global styles (global.css, fonts.css)
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

- **Memorable Experience**: Creating a strong first impression through innovative navigation and visuals.
- **Visual Consistency**: Maintaining a cohesive aesthetic with smooth transitions and elegant design.
- **Performance**: Ensuring fast loading times and smooth animations.
- **Intuitive UX**: Designing interactions that feel natural and predictable across all devices.

## 📄 License

© BrainRoad Labs - All Rights Reserved