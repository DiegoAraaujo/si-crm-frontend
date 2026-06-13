# SI CRM Frontend

Web interface for SI CRM, a real estate client relationship management system built for SI Realty Group.

## Technologies

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- TanStack Query v5
- Axios (with JWT refresh token interceptors)
- Zustand (global auth state)
- React Hook Form + Zod (forms and validation)
- Lucide React (icons)
- Docker + Docker Compose

## Architecture

Feature-based modular architecture organized per domain:

- `api` — API calls to the backend
- `hooks` — TanStack Query hooks (queries and mutations)
- `components` — UI components scoped to the module
- `schemas` — Zod validation schemas

## Modules

- `auth` — login, register, logout, route protection
- `dashboard` — stats, conversion funnel, recent leads and activities
- `leads` — full lead CRUD with search and status filter
- `kanban` — dynamic columns with drag and drop
- `statuses` — kanban status CRUD
- `chat` — AI assistant chat interface
- `users` — authenticated user profile

## Requirements

- Node.js 20+
- npm 10+
- SI CRM Backend running on port 3333
- SI CRM AI microservice running on port 8000

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3333 |
| NEXT_PUBLIC_AI_URL | AI microservice URL | http://localhost:8000 |

## Running Locally

**1. Install dependencies:**

```bash
npm install
```

**2. Start the development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Running with Docker

```bash
docker build -t si-crm-frontend .
docker run -p 3000:3000 si-crm-frontend
```

## Integration

- **Backend:** expects SI CRM API at `http://localhost:3333` (configurable via `NEXT_PUBLIC_API_URL`)
- **AI Microservice:** expects FastAPI running at `http://localhost:8000` (configurable via `NEXT_PUBLIC_AI_URL`)

## Pages

| Route | Description |
|---|---|
| `/login` | Login page |
| `/register` | Register page |
| `/dashboard` | Stats and overview |
| `/kanban` | Kanban board with drag and drop |
| `/leads` | Leads table with search and filters |
| `/chat` | AI assistant chat |
| `/profile` | User profile |

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run linter
```