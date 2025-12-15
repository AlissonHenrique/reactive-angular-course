## Project Overview

This is the **Reactive Angular Course** example app (Angular 21) with a small TypeScript/Express development backend. Frontend and backend run separately during development:

- Frontend: `npm start` (Angular dev server, port 4200)
- Backend: `npm run server` (ts-node Express server, port 9000)
- HTTP proxy: `proxy.json` forwards `/api` to `http://localhost:9000`

Key directories:
- `src/app` — Angular app, components, services and stores (look at `services/` and `model/`)
- `server/` — small REST API used for local dev and examples (`*.route.ts`, `db-data.ts`)

Important files to reference when making changes:
- `package.json` — scripts (`start`, `server`, `test`, `e2e`) and dependencies
- `proxy.json` — where `/api` is proxied to the backend during frontend dev
- `server/*.route.ts` — simulated REST endpoints and sample payload shape
- `src/app/services/*.ts` and `src/app/*.store.ts` — service/store patterns used across the app

Patterns and conventions the agent should follow
- Use existing services and stores patterns: services use `HttpClient` + RxJS (`pipe`, `map`, `shareReplay`) and stores expose `Observables` (often backed by `BehaviorSubject`). See `src/app/services/courses.service.ts` and `src/app/services/courses.store.ts`.
- Backend is a small Express server written in TypeScript. For API changes, update `server/*.route.ts` and `server/db-data.ts`. Example: `searchLessons` endpoint and client usage in `CoursesService.searchLessons()`.
- UI-to-API flow generally: component -> service -> `/api/*` endpoints -> `server/*.route.ts` -> `db-data.ts` sample data.
- Tests: unit tests use Karma/Jasmine (`npm test`). Look at component spec files in `src/app` (e.g., `courses-card-list.component.spec.ts`) to mirror testing patterns.

Developer workflows
- Setup: `npm install` (follow README; README recommends Node 22 LTS; `package.json` lists an `engines.node` of `16` — prefer using the README guidance or project CI config)
- Run dev backend and frontend in separate terminals: `npm run server` and `npm start`.
- Run unit tests with `npm test`, e2e with `npm run e2e`.

When editing code
- If you add or change an API route, update `server/*.route.ts` and ensure `proxy.json` (if relevant) still maps ` /api` to the backend.
- Preserve RxJS patterns (use `pipe` and small operator chains; use `shareReplay()` for caching HTTP streams as seen in `CoursesService`).
- Follow Angular DI patterns (`@Injectable({ providedIn: 'root' })` or `@Injectable()` where appropriate).

Examples to reference
- Searching lessons: `CoursesService.searchLessons()` -> hits `/api/lessons` -> implemented in `server/search-lessons.route.ts`
- Courses list: `CoursesService.loadAllCourses()` -> `/api/courses` -> `server/get-courses.route.ts`

Notes for agents
- Focus on minimal, well-scoped changes that follow the project's patterns. Avoid introducing large architectural changes unless explicitly requested.
- Use existing spec files as test templates. Add a small focused unit test for any new behavior and run `npm test` locally.

If anything is unclear or you want more detail (CI, Node version constraints, or preferred test runners), ask before implementing large changes.
