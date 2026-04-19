import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import InfinitePokemonList from "../components/InfinitePokemonList";
import PaginatedPokemonList from "../components/PaginatedPokemonList";
import PokedexHeader from "../components/PokedexHeader";

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
          <PaginatedPokemonList
            page={page}
            onChange={(p) => setParams({ view, page: String(p) })}
          />
        ) : (
          <InfinitePokemonList />
        )}
      </main>
    </div>
  );
}
