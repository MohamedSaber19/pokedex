import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { Pagination } from "../components/Pagination";
import PokedexHeader from "../components/PokedexHeader";
import { PokemonGrid } from "../components/PokemonGrid";
import { useInfinitePokemon } from "../hooks/useInfinitePokemon";
import { PAGE_SIZE, usePokemonList } from "../hooks/usePokemonList";
import type { ListItem } from "../types";

export function ListPage() {
  const [params, setParams] = useSearchParams();
  const view = params.get("view") === "scroll" ? "scroll" : "pages";
  const page = Math.max(1, Number(params.get("page") ?? "1"));

  return (
    <div
      className={cn(
        "min-h-screen px-4 pb-12 md:px-8",
        view === "scroll" ? "bg-emerald-50" : "bg-indigo-50",
      )}
    >
      <PokedexHeader view={view} />
      <main className="mx-auto max-w-6xl">
        {view === "pages" ? (
          <PaginatedView
            page={page}
            onChange={(p) => setParams({ view, page: String(p) })}
          />
        ) : (
          <InfiniteView />
        )}
      </main>
    </div>
  );
}

function PaginatedView({
  page,
  onChange,
}: {
  page: number;
  onChange: (page: number) => void;
}) {
  const { data, isLoading, isError, refetch } = usePokemonList(page);

  if (isError) {
    return (
      <ErrorState message="Couldn't load Pokémon." onRetry={() => refetch()} />
    );
  }

  if (data && data.results.length === 0) {
    return <EmptyState message="No Pokémon found on this page." />;
  }

  const items = data?.results ?? [];
  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  return (
    <>
      <PokemonGrid items={items} showSkeletons={isLoading ? PAGE_SIZE : 0} />
      {data && (
        <div className="mt-8 space-y-2">
          <Pagination page={page} totalPages={totalPages} onChange={onChange} />
          <p className="text-center text-sm text-gray-700">
            Page {page} of {totalPages} ({items.length} Pokemon shown)
          </p>
        </div>
      )}
    </>
  );
}

function InfiniteView() {
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
