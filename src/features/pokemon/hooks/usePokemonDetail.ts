import { useQuery } from "@tanstack/react-query";
import { fetchPokemonById } from "../api/pokemonApi";

export function usePokemonDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["pokemon", "detail", id],
    queryFn: () => fetchPokemonById(id!),
    enabled: Boolean(id),
  });
}
