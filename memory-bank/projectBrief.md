# BrainRoad Labs Website

## Project Overview
This project is the official website for BrainRoad Labs, developed with Astro and Tailwind CSS. The site aims to showcase the company's skills and services through an innovative user experience, featuring a custom scroll transition engine with inertia analysis and a responsive design that adapts to screen orientation.

## Core Requirements and Goals
- Create a modern, responsive website adapting to different screen orientations.
- Implement a smooth, engaging scroll transition experience between content sections.
- Provide an intuitive user interface with clear navigation.
- Showcase BrainRoad Labs' technical capabilities and project portfolio.
- Ensure good performance and accessibility.

## High-level Overview
The BrainRoad Labs website presents information in distinct sections navigated via a custom mechanism. The implementation uses CSS custom properties (`--order`) to manage section visibility and transitions, controlled by `src/scripts/navigation.js`. The design is responsive, primarily via custom CSS orientation media queries; Tailwind orientation screens are defined but not extensively used. The site also features a sophisticated scroll inertia analysis engine to differentiate between page navigation and internal content scrolling, particularly for Apple input devices.

## Technologies
- **Framework**: Astro
- **CSS Framework**: Tailwind CSS
- **JavaScript**: Vanilla JavaScript (ES Modules)
- **Icons**: Astro Icon with Heroicons
- **Analytics**: Vercel Analytics & Speed Insights
- **Animations**: Lottie for splash screen

## Project Structure
- **Components**: `src/components/` (Home, Experience, Contact, Credits, Unlck-u, etc.)
- **Layouts**: `src/layouts/` (Layout.astro)
- **Pages**: `src/pages/` (index.astro)
- **Assets**: `src/assets/`, `public/`
- **Global Styles**: `src/styles/`
- **Scripts**: `src/scripts/`

## Current Features
- Lottie-based splash screen on entry.
- Animated gradient background with an interactive bubble.
- Section-based layout with a floating navigation menu.
- Custom scroll transition mechanism with inertia analysis managed by `src/scripts/navigation.js`.
- Responsive design adapting to screen orientation (portrait/landscape).
- Responsive header elements that adjust to prevent overlap.
- Image modal with gallery functionality.
- Draggable resizing of content containers on desktop.

## Design Preferences
- Clean, minimal design aesthetic.
- Rounded corners and gradient colors for visual interest.
- Responsive layouts adapting to screen orientation.
- Smooth, performant animations and transitions.
