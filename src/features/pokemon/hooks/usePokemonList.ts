import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemonApi";

export const PAGE_SIZE = 20;

export function usePokemonList(page: number) {
  const offset = (page - 1) * PAGE_SIZE;
  return useQuery({
    queryKey: ["pokemon", "list", { page, size: PAGE_SIZE }],
    queryFn: () => fetchPokemonList({ limit: PAGE_SIZE, offset }),
    placeholderData: keepPreviousData,
  });
}
