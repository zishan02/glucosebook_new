# Glucosebook Clinical Workspace

An extensible Next.js dashboard foundation for glucose monitoring and care operations. The interface provides a responsive application shell, dark mode, clinical metrics, charts, patient monitoring, alert triage, and ready-to-extend domain routes.

## Stack

- Next.js 16 and React 19
- Bootstrap 5 and React Bootstrap
- ApexCharts for clinical visualizations
- SCSS design tokens and responsive layout rules

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
app/                    Route entry points and layouts
data/                   API-shaped mock data by domain
layouts/                Shared application shell
routes/                 Primary navigation registry
sub-components/         Domain-level page modules
widgets/                Reusable UI primitives
styles/_user.scss       Application design system
```

## Extending the App

1. Add a route under `app/(dashboard)/`.
2. Create focused domain modules under `sub-components/`.
3. Keep temporary data in `data/` using the expected API response shape.
4. Register the completed route in `routes/DashboardRoutes.js`.
5. Verify light mode, dark mode, keyboard behavior, and mobile layout.

The conventions in `AGENTS.md` are the source of truth for future additions.

## Validation

```bash
npm run build
```
