# Glucosebook Extension Guide

## Architecture

- Keep route entry points in `app/` thin and compose them from `sub-components/`.
- Store reusable page modules in `sub-components/<domain>/` and primitives in `widgets/`.
- Keep mock data API-shaped and isolated in `data/<domain>/` so it can be replaced by a service layer.
- Register primary navigation in `routes/DashboardRoutes.js`.
- Add visual tokens and shared states in `styles/_user.scss`; avoid page-specific inline styles.

## UI Conventions

- Use the shared `page-heading-row`, `dashboard-card`, `button-primary`, and `button-secondary` patterns.
- Every data surface needs loading, empty, error, and populated states before it is production-ready.
- Use semantic headings, labels, buttons, tables, and `aria` attributes for interactive controls.
- Preserve light and dark mode behavior and verify desktop, tablet, and mobile breakpoints.
- Use color as a supporting signal, never as the only status indicator.

## Feature Workflow

1. Define the route and API-shaped data contract.
2. Build domain components around one responsibility each.
3. Compose the route from those components.
4. Register navigation only after the route exists.
5. Run `npm run build` and visually verify both themes and mobile navigation.

## Guardrails

- Do not add a second component library without an explicit decision.
- Do not place business logic in navigation or layout components.
- Do not use `dangerouslySetInnerHTML` for application data.
- Do not create dead navigation links or interactions that only look functional.
