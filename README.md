# 🫓 The Pupusa Index 🇸🇻

> **The unofficial economic indicator of El Salvador.**

The Pupusa Index gauges purchasing power parity in El Salvador using the price of a Revueltas pupusa as a benchmark. Inspired by the Big Mac Index, it offers a tangible way to understand inflation and the cost of living.

![Pupusa Index Screenshot](public/pupusa-logo.png)

## 🛠️ Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) (TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism Design)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: Google Material Symbols & [RealFaviconGenerator](https://realfavicongenerator.net/)
- **Database**: [Supabase](https://supabase.com/)

## 🚀 Features

- **Real-time Price Tracking**: Sourced from community submissions via Supabase.
- **Interactive Calculator**: Calculate how many pupusas you can buy with your budget.
- **Global Parity**: Compare local purchase power against international standards.
- **Labor Metric**: See how many minutes of work at minimum wage it takes to earn a pupusa.
- **Glassmorphism UI**: A modern, sleek interface with a 60px header logo.

## 🗄️ Database Setup (Supabase)

This project uses Supabase for storing pupusa prices and handling admin authentication.

1.  Create a project at [Supabase](https://supabase.com).
2.  Get your `Project URL` and `anon public key` from Settings -> API.
3.  Create a `.env` file in the root directory (copied from `.env.example` if available) and add:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_ADMIN_PASSWORD=your_secure_password
    ```

## 💻 Getting Started

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

### 3. Start the Frontend

```bash
npm run dev
```

The app will support hot-reloading at `http://localhost:5173`.

## 🤝 Contribution

Feel free to submit a PR or open an issue if you have ideas to improve the index!

---

Made with ❤️ and 🌽 in El Salvador.
