import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { Pagination } from "../components/Pagination";
import PokedexHeader from "../components/PokedexHeader";
import { PokemonGrid } from "../components/PokemonGrid";
import { PAGE_SIZE, usePokemonList } from "../hooks/usePokemonList";

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
        <PaginatedView
          page={page}
          onChange={(p) => setParams({ view, page: String(p) })}
        />
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
