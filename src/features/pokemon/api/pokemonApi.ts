import type { ListResponse, PokemonDetail } from "../types";

const BASE = "https://pokeapi.co/api/v2";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchPokemonList(params: { limit: number; offset: number }) {
  const { limit, offset } = params;
  return request<ListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
}

export function fetchPokemonById(id: string | number) {
  return request<PokemonDetail>(`/pokemon/${id}`);
}
