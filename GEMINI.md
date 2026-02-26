# M1 App — Project Context for Gemini

## Tech Stack
- React Native (Expo) with TypeScript
- Supabase (Auth, Database, Storage)
- Google OAuth via Supabase
- React Navigation v6
- Feature-based Clean Architecture

## Project Goal
Community-based task completion and earning app.
V1 scope: Production-grade app with Google Sign-in and Sign-out only.

## Architecture Rules
- Feature-based folder structure under src/features/
- Shared reusable code under src/shared/
- All Supabase calls go through src/shared/services/supabase.ts
- TypeScript strict mode always
- No business logic in screens — use hooks
- Navigation split: AuthStack (logged out) / AppStack (logged in)

## Environment
- Secrets in .env (never commit)
- Use .env.example with placeholder values

## Git Rules
- Feature branches: feature/xxx
- Never commit .env or node_modules
