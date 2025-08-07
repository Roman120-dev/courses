# Chess MVP (Expo + TypeScript)

Cross-platform chess app template for iOS, Android and Web using Expo, React Native, expo-router, chess.js, Zustand, Reanimated. Includes stubs for Supabase and Edge Functions.

## Prerequisites
- Node.js 18+
- npm or pnpm or yarn
- Expo CLI (`npm i -g expo` optional)

## Getting started
```bash
npm install
npm run start
```
- Press `w` to open Web, or run `npm run android` / `npm run ios`.

## Env
Create `.env` from example:
```
cp .env.example .env
```
Fill `SUPABASE_URL` and `SUPABASE_ANON_KEY` if you plan to use online features.

## Project structure
```
app/                 # expo-router routes
  _layout.tsx
  index.tsx          # Home screen
  game/index.tsx     # Local game screen
  online/index.tsx   # Online play (stub)
  settings/index.tsx # Settings (AI level)

src/
  components/chess/Board.tsx   # Simple board component
  services/chessEngine.ts      # chess.js wrapper
  services/ai.ts               # naive AI (stub)
  services/supabase.ts         # Supabase client
  state/gameStore.ts           # Zustand store

supabase/            # Stubs for schema and edge functions
  schema.sql
  functions/
    validate-move/index.ts
    ai-move/index.ts
    rate-game/index.ts
```

## Notes
- Skia and Reanimated are preconfigured. The board uses basic RN views initially; you can switch to Skia rendering later.
- This is an MVP template: minimal, typed, and ready to extend with realtime and rating.