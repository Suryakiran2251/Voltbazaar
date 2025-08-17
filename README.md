# VoltBazaar — Vite + React Electronics Store (Demo)

## Quick start
1. Install Node.js (LTS) and npm.
2. Open terminal in this project folder.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite (usually http://localhost:5173).

## Tailwind CSS
This project includes Tailwind in devDependencies. After `npm install`, initialize Tailwind (if needed):
```bash
npx tailwindcss init -p
```
Ensure `tailwind.config.cjs` content path includes `./index.html` and `./src/**/*.{js,jsx}`.

## Deploy
Use Vercel / Netlify / GitHub Pages. For Vercel:
```bash
npm i -g vercel
vercel login
vercel --prod
```
