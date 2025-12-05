# 🫓 The Pupusa Index 🇸🇻

> **The unofficial economic indicator of El Salvador.**

- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism Design)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: Google Material Symbols
- **Note**: This project uses **Supabase** for data storage.

### 🗄️ Database Setup (Supabase)

To enable dynamic price updates and submissions:

1.  Create a project at [Supabase](https://supabase.com).
2.  Get your `Project URL` and `anon public key` from Settings -> API.
3.  Add them to your Vercel Environment Variables:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
    - `VITE_ADMIN_PASSWORD`: Your desired admin password (defaults to "pupusa123" if not set)
4.  Run the SQL script in `supabase/schema.sql` (or ask the AI to do it!) to create the tables.

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
