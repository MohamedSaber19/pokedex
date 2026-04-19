# Pokédex

A responsive Pokémon browser built against the [PokéAPI](https://pokeapi.co/). Includes two list views (page controls and infinite scroll) and a dedicated detail page for each Pokémon.

**Live:** https://pokedex-five-roan.vercel.app

## Stack

- Vite + React 19 + TypeScript
- TanStack Query for data fetching and caching
- React Router v7
- Tailwind CSS v4

## Running locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Notes

- Detail route at `/pokemon/:id`
- List view toggles via `?view=pages` / `?view=scroll`
- SPA rewrites handled by `vercel.json`
