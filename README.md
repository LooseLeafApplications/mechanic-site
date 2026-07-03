# WG Vehicle Solutions - Web Application

A high-performance, mobile-first web application for a local automotive specialist based in Evesham. Built to facilitate immediate roadside rescues and streamline workshop bookings.

**[🔴 Live Deployment on GitHub Pages](https://looseleafapplications.github.io/mechanic-site/)**

---

## 🏗 Architecture & Stack

This project strictly adheres to the principle of "Separation of Concerns" and utilises a modular, dependency-free frontend stack.

- **HTML5:** Semantic, accessible markup with strict ARIA labelling and logical document outlines.
- **CSS3 (LooseLeaf UI Model):** A custom, highly modular CSS architecture utilising the Atomic Design methodology. No heavy frameworks (e.g., Bootstrap or Tailwind); everything is driven by CSS Custom Properties (Design Tokens) and adapted from the LooseLeaf-UI toolkit.
- **Vanilla JavaScript:** Lightweight client-side DOM manipulation without the overhead of React or heavy libraries.

---

## 🎨 The Design System (Tokens)

The visual identity is driven by a custom typography pairing and a high-contrast, accessible colour palette tailored to a professional mechanical workshop.

- **Typography:** `Inter` for highly legible UI elements and data tables; `Merriweather` for authoritative, vintage-inspired headings.
- **Primary Action (Malachite):** Used strictly for conversion points (e.g., WhatsApp booking buttons).
- **Attention (Amber):** Reserved exclusively for warnings and status changes (e.g., "Closing Soon").
- **Structural Depth (Vintage Grape):** Provides grounded contrast against the green for secondary UI elements.

---

## 🚀 Sprint 1 Features

- **Semantic HTML Pages:** established initial markup for index, services, and contact html pages.
- **Modular CSS Pipeline:** Separated global styles into distinct layers (`00-harmonics.css`, `01-primitives.css`, `02-atoms.css`, `03-organisms.css`) for maintainability.
- **Infinite Review Marquee:** A lightweight, pure-CSS scrolling track for customer testimonials. Fully accessible, utilising `aria-hidden` on duplicate nodes and a `pause-on-hover` state for screen readers.
- **Live Operational Status Clock:** A vanilla JavaScript module (in `core.js`) that reads the user's local device time, compares it against the workshop's operating hours, and dynamically updates the UI to reflect "Open Now," "Closing Soon," or "Closed" with corresponding semantic colour tokens.

---
