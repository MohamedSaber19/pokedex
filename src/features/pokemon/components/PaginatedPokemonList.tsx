import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { Pagination } from "../components/Pagination";
import { PokemonGrid } from "../components/PokemonGrid";
import { PAGE_SIZE, usePokemonList } from "../hooks/usePokemonList";

export default function PaginatedPokemonList({
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
