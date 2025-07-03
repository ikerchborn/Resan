# Resan Frontend

React + Vite static site for DeepChat UI.

## Development
```bash
npm install
npm run dev
```

## Build + Deploy to GitHub Pages
```bash
# 1. Ajusta la ruta base (solo una vez)
# vite.config.ts
# export default defineConfig({
#   base: "/Resan/",  # ⇐ nombre exacto del repo con slashes
#   plugins: [react()],
# });

# 2. Instala el helper de despliegue (solo la primera vez)
npm install -D gh-pages

# 3. Añade los scripts al package.json
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d dist"

# 4. Despliega
npm run deploy
```
Configure GitHub → Settings → Pages:
• Build and deployment → **Deploy from branch**
• Branch `gh-pages` / `(root)`

Update `src/App.tsx` to point to your Vercel backend URL.
