# 🫓 The Pupusa Index 🇸🇻

> **The unofficial economic indicator of El Salvador.**  
> _Tracking purchasing power, one Revuelta at a time._

![Pupusa Index Banner](https://via.placeholder.com/1200x400?text=The+Pupusa+Index)

## 🧐 What is this?

The **Pupusa Index** is a fun, interactive economic tool inspired by _The Economist's_ Big Mac Index. It measures the **Purchasing Power Parity (PPP)** in El Salvador using the country's most beloved dish: the **Pupusa**.

By tracking the price of a standard _Revuelta_ pupusa, we can analyze:

- **Inflation**: How prices change over time.
- **Labor Value**: How many minutes of minimum wage work it takes to earn a meal.
- **Global Parity**: How much cheaper it is to live in El Salvador vs. the USA.

## 📐 Methodology

The **Pupusa Index** is calculated using a simplified version of the purchasing power parity (PPP) theory.

### The Formula

$$
\text{Pupusa Index} = \frac{\text{Price of Revuelta (SV)}}{\text{Daily Minimum Wage (SV)}}
$$

### Data Sources

- **Pupusa Prices**: Crowdsourced and averaged from local pupuserías (currently mocked for demonstration).
- **Minimum Wage**: Based on the current daily minimum wage in El Salvador (approx. $12.00 USD).
- **Comparative Data**: Inspired by [The Economist's Big Mac Index](https://github.com/TheEconomist/big-mac-data), we compare local purchasing power against global standards.

## ✨ Features

- **📊 Real-Time Metrics**: Live updates on average pupusa prices.
- **⏱️ Time to Feast**: Calculates the "sweat equity" required to buy a pupusa based on minimum wage.
- **🌎 Global Parity**: Compares local purchasing power against US prices.
- **🗣️ Bilingual Support**: Fully localized in **English** and **Spanish** (Español).
- **🧮 Pupusa Calculator**: Enter your budget and see how many you can eat!
- **🔐 Admin Dashboard**: Secure interface for updating prices dynamically.

## 🛠️ Tech Stack

Built with modern web technologies for speed and beauty:

- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism Design)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: Google Material Symbols

## 🚀 Getting Started

Want to run this locally? Grab a horchata and follow these steps:

### 1. Clone the repo

```bash
git clone https://github.com/RicardoFv2/pupusa-index.git
cd pupusa-index
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Backend (Price API)

```bash
node server/index.js
```

### 4. Start the Frontend

```bash
npm run dev
```

Made with ❤️ and 🌽 in El Salvador.
