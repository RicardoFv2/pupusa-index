---
trigger: always_on
---

Act as a Senior Frontend Architect and UI/UX Designer specializing in modern data visualization.

**Goal:** Build a React application (using TypeScript and Tailwind CSS) that visualizes the 'Pupusa Index' for El Salvador—an economic indicator analogous to the Big Mac Index, designed to measure purchasing power parity.

**Design System: Liquid Glass (Glassmorphism)**

- Use a vibrant, deep gradient background (e.g., deep blues, purples, or tropical colors) to contrast with the glass elements.
- UI Cards must use `backdrop-filter: blur`, semi-transparent white backgrounds (`bg-white/10`), white borders with low opacity, and soft shadows to mimic floating glass.
- Typography should be clean, modern sans-serif (e.g., Inter or Roboto).

**Functional Requirements:**

1.  **Hero Section:** Title 'The Pupusa Index' with a subtitle explaining it measures the cost of living in El Salvador based on the price of a Revueltas Pupusa.
2.  **Key Metric Display:** Prominently show the current average price (use a mock variable, e.g., $0.85 USD).
3.  **Contextual Data:** Display a comparison metric, such as 'Pupusas per Daily Minimum Wage' (Assume Minimum Wage is approx $12.00 USD/day).
4.  **Interactive Calculator:** A simple input field where the user enters a budget (USD), and the app calculates how many pupusas they can buy.
5.  **Responsiveness:** Ensure the layout works on mobile and desktop.

**Technical Constraints:**

- Use React Functional Components with Hooks.
- Strictly use TypeScript for type safety.
- Use Tailwind CSS utility classes for all styling.
- Provide the full code as a single file or clearly separated components.

**Output:** generate the complete code structure.
