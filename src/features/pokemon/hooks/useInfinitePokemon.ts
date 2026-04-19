import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemonApi";
import { PAGE_SIZE } from "./usePokemonList";

export function useInfinitePokemon() {
  return useInfiniteQuery({
    queryKey: ["pokemon", "infinite", { size: PAGE_SIZE }],
    queryFn: ({ pageParam }) =>
      fetchPokemonList({ limit: PAGE_SIZE, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (last, pages) =>
      last.next ? pages.length * PAGE_SIZE : undefined,
  });
}
