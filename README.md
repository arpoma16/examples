# Interactive Algorithm Platform

Client-side interactive visualizations for robotics and math algorithms.

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui primitives
- Three.js (`@react-three/fiber`, `@react-three/drei`)
- KaTeX (`katex`, `react-katex`)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Production builds use `/examples/` as the Vite base path for GitHub Pages.
Deployment is handled through the GitHub Pages official GitHub Actions workflow.
