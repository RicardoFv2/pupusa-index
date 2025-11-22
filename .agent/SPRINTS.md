# Project Roadmap & Sprints

Based on the requirements in `rule.md`, here is the breakdown of work into logical sprints.

## Sprint 1: Foundation & Design System

**Goal:** Set up the project structure and establish the "Liquid Glass" aesthetic.

- [ ] **Project Setup**
  - Initialize React + TypeScript + Vite
  - Install Tailwind CSS
  - Configure fonts (Inter/Roboto)
- [ ] **Design System Implementation**
  - Define color palette (Deep blues/purples/tropical gradients)
  - Create `GlassCard` utility/component (`backdrop-filter: blur`, `bg-white/10`)
  - Set up global styles (reset, body background)

## Sprint 2: Core Components & Layout

**Goal:** Build the visual structure and static content.

- [ ] **Hero Section**
  - Title: "The Pupusa Index"
  - Subtitle: Cost of living explanation
- [ ] **Key Metric Display**
  - Component to show current price (Mock: $0.85)
  - Styling for prominence
- [ ] **Contextual Data**
  - Comparison component (Pupusas per Minimum Wage)
  - Mock data integration ($12.00/day)

## Sprint 3: Interactivity & Logic

**Goal:** Make the application functional and interactive.

- [ ] **Pupusa Calculator**
  - Input field for User Budget (USD)
  - Calculation logic (`Budget / Price`)
  - Display result dynamically
- [ ] **State Management**
  - Manage state for calculator input/output

## Sprint 4: Polish & Responsiveness

**Goal:** Ensure the app looks premium and works everywhere.

- [ ] **Responsiveness**
  - Mobile layout adjustments
  - Desktop layout optimization
- [ ] **Visual Polish**
  - Add micro-animations (hover states, transitions)
  - Refine glass effects (borders, shadows)
  - Verify contrast and accessibility
