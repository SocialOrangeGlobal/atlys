# Global Getaway - Modern Visa & Global Event Application Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)

**A cutting-edge, high-performance web platform built to make international visa applications and event travel visas seamless, instant, and transparent.**

[Explore Platform](#key-features) • [Setup Guide](#setup--installation) • [Architecture](#project-structure) • [Routes](#routes--pages)

</div>

---

## 📌 Project Overview

**Global Getaway** is a modern, responsive web application designed to deliver a world-class visa discovery and application experience. Built with Next.js App Router, Tailwind CSS, and Framer Motion, it provides travelers with real-time visa requirements, transparent fee structures, guaranteed delivery timelines, and event-focused visa applications.

---

## ✨ Key Features

### 1. 🌍 Country Visa Hub (`/` & `/visa/[country]`)
- **Instant Discovery**: Browse 40+ countries with live visa availability, length of stay, validity, and guaranteed ETA.
- **Dynamic Pricing Calculator**: Live fee breakdown (Government fees + Global Getaway service fees) with multi-applicant scaling and instant express toggle.
- **Document & Process Breakdown**: Clear requirements timeline, partner integrations (MakeMyTrip, IndiGo), and Global Getaway Protect guarantees.

### 2. 🎟️ Global Events Visa Portal (`/events/[slug]`)
- **Event-First Travel**: Curated global summits and conferences (e.g. *One Young World Summit*, *Tomorrowland*, *Web Summit*).
- **Synchronized Sub-Navigation**: Full `sticky top-0` navigation bar with automatic active-section scroll centering for mobile screens.
- **Global Getaway Shield Protection**: Built-in delay protection and $100 ticket refund insurance guarantees.

### 3. 🗺️ Interactive Global Map (`/map`)
- **Leaflet Geo-Navigation**: Interactive world map with custom flag pins for all supported visa destinations.
- **Touch-Friendly Modals**: Glassmorphic country card overlays optimized for mobile (`100dvh`), tablet, and desktop viewports.
- **Floating Controls**: Minimalist back navigation and destination indicator pill.

### 4. 🎨 Premium Glassmorphism UI & Motion
- **Hide-on-Scroll Navbar**: Header dynamically slides away on scroll-down to maximize viewing area and returns smoothly on top scroll.
- **Universal Responsiveness**: Fine-tuned layouts from narrow mobile viewports (320px) to ultra-wide desktop monitors (1920px+).
- **Fluid Layouts**: CSS `overflow-x-clip` architecture ensuring sticky headers function without horizontal drifting.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | App Router architecture with React Server Components & Fast Refresh |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type safety across components and datasets |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Modern utility-first styling with custom glassmorphism design tokens |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) | Smooth entrance animations and scroll-based opacity transitions |
| **Mapping** | [Leaflet](https://leafletjs.com/) / [React-Leaflet](https://react-leaflet.js.org/) | Interactive tile mapping and flag marker coordinate rendering |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible vector icons |
| **UI Primitives** | [Radix UI / Shadcn](https://ui.shadcn.com/) | Accessible Accordions and interactive components |

---

## 📁 Project Structure

```text
atlys/
├── app/
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic Event Visa details page
│   ├── map/
│   │   └── page.tsx               # Fullscreen Interactive Leaflet Map page
│   ├── visa/
│   │   └── [country]/
│   │       └── page.tsx           # Dynamic Country Visa details page
│   ├── globals.css                # Global CSS tokens, scrollbar utilities, and animations
│   ├── layout.tsx                 # Root layout with fonts, metadata, and providers
│   ├── loading.tsx                # Global route transition spinner
│   └── page.tsx                   # Main home page (Country discovery & Events grid)
│
├── components/
│   ├── global/
│   │   ├── filter-bar.tsx         # Category filter pills & search bar
│   │   ├── footer.tsx             # Responsive global footer with safe area padding
│   │   ├── leaflet-map.tsx        # Dynamic Leaflet map container & modal
│   │   ├── logo.tsx               # Vector SVG Global Getaway Brand Logo
│   │   ├── navbar.tsx             # Hide-on-scroll header & mobile bottom tabs (z-[100])
│   │   └── smooth-scroll.tsx      # Smooth scrolling enhancement
│   ├── home/
│   │   ├── country-card.tsx       # Glassmorphic visa card component
│   │   ├── country-grid.tsx       # Country cards listing with filter integration
│   │   ├── event-card.tsx         # Event ticket & visa summary card
│   │   └── events-grid.tsx        # Global events listing grid
│   └── ui/
│       ├── accordion.tsx          # Accessible collapsible FAQ accordion
│       └── country-card.tsx       # Reusable interactive card
│
├── lib/
│   ├── coordinates.ts             # Geographic latitude/longitude mappings for flags
│   ├── data.ts                    # Country visa information catalog
│   ├── events.ts                  # Global event details & media catalog
│   └── utils.ts                   # Tailwind CSS class merging utilities (cn)
│
├── public/                        # Static assets (brand logos, partner badges, images)
├── .gitignore                     # Production Git exclusion rules
├── next.config.ts                 # Next.js configuration (Remote image domains)
├── package.json                   # Project dependencies and script definitions
├── tailwind.config.ts             # Tailwind CSS design system extensions
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### 1. Clone the Repository
```bash
git clone https://github.com/SocialOrangeGlobal/atlys.git
cd atlys
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Routes & Pages

| Route | Description |
| :--- | :--- |
| `/` | **Home**: Country Visa catalog, category filters, and featured events grid |
| `/visa/[country]` | **Visa Details**: Country-specific requirements, pricing breakdown, and FAQ |
| `/events/[slug]` | **Event Visa**: Conference-specific visa portal with sticky section navigator |
| `/map` | **Interactive Map**: Global map discovery with interactive flag markers |

---

## 📜 Available Scripts

- `npm run dev` - Starts the Next.js development server with hot-reload
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the Next.js production server
- `npm run lint` - Runs ESLint code quality checks

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
