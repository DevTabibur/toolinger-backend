# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Toolinger Backend — an Express + TypeScript + MongoDB (Mongoose) REST API serving a suite of web utility tools and a blog/CMS + admin dashboard. Real-time features run over Socket.IO. Deployed to Vercel (serverless) from the compiled `dist/` output.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` and the `pnpm ...` calls in scripts), though a `package-lock.json` is also present.

- `pnpm dev` — run locally with hot reload (`ts-node-dev`, transpile-only, no type-checking)
- `pnpm build` — `tsc` compile to `dist/`, then `postbuild` copies `src/views/*` into `dist/views`
- `pnpm start` — run the compiled server (`node dist/server.js`); expects a prior `build`
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm prettier:fix` — Prettier write
- `pnpm lint-prettier` — lint:fix then prettier:fix

There is **no test runner configured** despite Jest-related dev deps; there are no test files. Do not assume `pnpm test` works.

A Husky `pre-commit` hook runs `lint-staged`, which formats `src/**/*.ts` with Prettier.

## Development guidelines

- **Act as a senior Node.js / Express.js developer** on every change: think about correctness, security, error handling, and edge cases before writing code — not just making it work.
- **Always follow the existing coding patterns.** Before adding anything, read a neighboring module and mirror its structure, naming, imports, and style. Do not introduce new patterns, libraries, or folder layouts when an established one already exists.
- Keep the layered separation intact: routes wire middleware, controllers stay thin (`catchAsync` + `sendSuccessResponse`), and all business logic + DB access lives in services. Never put logic in controllers or query the DB from a route.
- Throw `ApiError(httpStatus.X, message)` for failures and let `globalErrorHandler` format the response; return success only through `sendSuccessResponse`.
- Validate input with Zod schemas in `*.validation.ts` wired via `zodValidateRequest`, and read config through `src/config` — never `process.env` directly.
- Log with `logger` / `errorLogger`, not `console.log`.
- Match the surrounding TypeScript style; keep `strict` types passing (`pnpm build`) and run lint/prettier before finishing.

## Architecture

### Bootstrap flow
`src/server.ts` (creates HTTP + Socket.IO server, wires `setupSocketManager`, connects DB via `dbConnect`, starts listening) → `src/app.ts` (Express app: CORS, compression, cookie-parser, EJS views, static `/upload`, mounts all routes under `/api/v1`, then `globalErrorHandler` and a 404 fallback).

`src/config/index.ts` is the **only** place env vars should be read — it loads `.env` and exports a typed config object plus `IS_MODE_PROD` / `IS_MODE_DEV`. Import from here rather than touching `process.env` directly.

### Module pattern (most important convention)
Every feature lives in `src/app/modules/<name>/` and follows a strict layered file-per-concern layout:

- `*.routes.ts` (or `*.route.ts`) — Express router; wires middleware (`authGuard`, `zodValidateRequest`, upload middleware) to controller methods. Exported router is registered in `src/app/routes/index.ts`.
- `*.controller.ts` — thin HTTP layer. Every handler is wrapped in `catchAsync`, pulls from `req`, calls a service method, and returns via `sendSuccessResponse`. Controllers export a single object (e.g. `AuthController`).
- `*.service.ts` — all business logic and DB access. Throws `ApiError(httpStatus.X, message)` on failure. Exports a single object (e.g. `AuthService`).
- `*.model.ts` — Mongoose schema/model.
- `*.interface.ts` — TypeScript types for the module.
- `*.validation.ts` — Zod schemas (shaped as `{ body, query, params, cookies }` to match `zodValidateRequest`).
- `*.constant.ts` — enums, searchable/filterable field lists, etc.

When adding a feature, mirror this structure and register its route in `src/app/routes/index.ts`. Modules can nest (see `modules/blog/` with `category/`, `comment/`, `tag/` sub-modules).

To add an endpoint: route → controller (`catchAsync` + `sendSuccessResponse`) → service (logic + `ApiError`) → model/validation. Keep controllers free of business logic.

### Cross-cutting pieces
- **Error handling**: throw `ApiError` (`src/errors/ApiError.ts`) anywhere; `globalErrorHandler` (`src/app/middlewares/globalErrorHandler.ts`) normalizes Zod, Mongoose validation/cast, MongoServerError, and `ApiError` into a consistent JSON shape. Stack traces only leak in `development`.
- **Responses**: always use `sendSuccessResponse(res, { statusCode, message, data, meta })` from `src/shared/`. Don't hand-roll `res.json` for success paths.
- **Auth**: `authGuard(...roles)` (`src/app/middlewares/authGuard.ts`) verifies the JWT from the `Authorization` header and sets `req.user`. NOTE: role enforcement is currently commented out — `authGuard(USER_ROLE_ENUM.ADMIN)` verifies a valid token but does **not** actually restrict by role. Roles come from `USER_ROLE_ENUM` in `modules/user/user.constant.ts` (`admin`, `guest`, `editor`). JWT helpers are in `src/app/helpers/jwtHelpers.ts`.
- **Validation**: `zodValidateRequest(schema)` middleware parses `{ body, query, params, cookies }`; pair it with a module's `*.validation.ts` schema in the route.
- **File uploads**: `fileUploadAndConvertToWebP.ts` (multer → `sharp` conversion to WebP, saved under `upload/`) and `fileUploaderWithMulter.ts`. Uploaded files are served statically at `/upload`.
- **Email**: two paths — `sendEmail` (Nodemailer via Gmail app password) and `sendZeptoMail` (ZeptoMail API). OTP flows use `otpGenerator` + `OTPEmailTemplate` and the `otp` / `settings` modules.
- **Real-time**: `src/app/utils/socketManager.ts` holds all Socket.IO event handlers (rooms, active users, chat). Socket CORS origins come from config.
- **Logging**: use `logger` / `errorLogger` from `src/shared/logger.ts` (Winston + daily-rotate to `logs/`), not `console.log`. Much of the codebase still has commented-out `console.log` alongside logger calls — prefer the logger.
- **Pagination/query**: helpers in `src/app/helpers/paginationHelper.ts` and `src/shared/pick.ts`; modules define search/filter field lists in their `*.constant.ts`.

### Tool utilities
Many advertised "tools" (whois, domain age, DNS/blacklist checks, meta-tag parsing, link/CMS detection, broken-link checking, etc.) live as pure functions in `src/app/utils/` and `src/app/helpers/`, consumed by module services rather than being modules themselves.

## Conventions & gotchas

- TypeScript is `strict`, `target es2016`, `commonjs`, `rootDir src` → `outDir dist`. Custom `.d.ts` type shims live in `src/types/` (`typeRoots` includes `./types`).
- `req.user` typing is augmented in `src/interfaces/index.d.ts`.
- `dev` runs transpile-only (skips type errors) — run `pnpm build` to actually type-check before relying on a change.
- Vercel serves the compiled `dist/server.js`; `vercel.json` routes all traffic there, so `pnpm build` must succeed and `views` must be copied (handled by `postbuild`) for production.
- The repo has substantial commented-out code (old CORS blocks, a shortener module, JWT-based reset flow). Leave these unless the task is specifically to clean them up.
- `access token` validity is intentionally long-lived; a refresh-token flow is noted as a TODO in `issue.note`.
