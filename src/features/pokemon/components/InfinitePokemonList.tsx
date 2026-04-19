import { useMemo } from "react";
import { useInfinitePokemon } from "../hooks/useInfinitePokemon";
import { PAGE_SIZE } from "../hooks/usePokemonList";
import type { ListItem } from "../types";
import { ErrorState } from "./ErrorState";
import { LoadMoreButton } from "./LoadMoreButton";
import { PokemonGrid } from "./PokemonGrid";

export default function InfiniteView() {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfinitePokemon();

  const items = useMemo<ListItem[]>(() => {
    return data ? data.pages.flatMap((page) => page.results) : [];
  }, [data]);

  if (isError) {
    return (
      <ErrorState message="Couldn't load Pokémon." onRetry={() => refetch()} />
    );
  }

  return (
    <>
      <PokemonGrid items={items} showSkeletons={isLoading ? PAGE_SIZE : 0} />
      {data && (
        <div className="mt-2 space-y-1">
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            hasMore={Boolean(hasNextPage)}
          />
          <p className="text-center text-sm text-gray-500">
            Showing {items.length} Pokemon
          </p>
        </div>
      )}
    </>
  );
}
