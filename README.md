# Test-Ve — Static website development environment

This repository is a static website with `index.html`, `script.js`, and `style.css`.

What I added

- `package.json` — scripts for start (live-server), lint (ESLint), and format (Prettier)
- `.eslintrc.json` — ESLint config with Prettier integration
- `.prettierrc` — Prettier config
- `.gitignore` — ignores node_modules, VS Code settings
- `.vscode/` recommendations and settings

Quick start (PowerShell):

```powershell
# 1) Install dev dependencies (from project root)
npm install

# 2) Start a local server (opens browser at http://127.0.0.1:3000)
npm run start

# 3) Lint JavaScript files
npm run lint

# 4) Format files with Prettier
npm run format
```

If you'd rather use a modern bundler with HMR, I can add Vite and a basic dev configuration.
