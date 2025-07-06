# BrainRoad Labs Website

## Project Overview
This project is the official website for BrainRoad Labs, developed with Astro and Tailwind CSS. The site aims to showcase the company's skills and services through an innovative user experience, featuring custom scroll transitions and a responsive design that adapts to screen orientation.

## Core Requirements and Goals
- Create a modern, responsive website adapting to different screen orientations.
- Implement smooth, engaging scroll transitions between content sections.
- Provide an intuitive user interface with clear navigation.
- Showcase BrainRoad Labs' technical capabilities and project portfolio.
- Ensure good performance and accessibility.

## High-level Overview
The BrainRoad Labs website presents information in distinct sections navigated via a custom mechanism. The implementation uses CSS custom properties (`--order`) to manage section visibility and transitions, controlled by `src/scripts/navigation.js`. The design is responsive, leveraging Tailwind's orientation variants.

## Technologies
- **Framework**: Astro v5.10.0
- **CSS Framework**: Tailwind CSS v4.1.1
- **Tailwind Integration**: `@tailwindcss/vite` v4.1.1
- **Icon Toolkit**: `astro-icon` with Heroicons
- **Analytics**: Vercel Analytics & Speed Insights
- **JavaScript**: Vanilla JavaScript (ES Modules)
- **Fonts**: Apple SF Pro (Display)
- **Node**: v20+ recommended
- **Package Manager**: npm

## Project Structure
- Components: `src/components/` (Home, Project, Contact, Credits, Unlck-u)
- Layouts: `src/layouts/` (Layout.astro)
- Pages: `src/pages/` (index.astro)
- Assets: `src/assets/`, `public/`
- Global styles: `src/styles/`
- Scripts: `src/scripts/`

## Current Features (as of analysis)
- Lottie-based splash screen on entry.
- Animated gradient background with interactive bubble.
- Section-based layout with a floating navigation menu.
- Custom scroll transition mechanism managed by `src/scripts/navigation.js`.
- Responsive design adapting to screen orientation (portrait/landscape).
- Responsive header elements (title/badge).
- Placeholder content in several sections.

## Design Preferences
- Clean, minimal design aesthetic.
- Rounded corners (e.g., 20px radius).
- Use of gradient colors for visual interest.
- Responsive layouts adapting to screen orientation.
