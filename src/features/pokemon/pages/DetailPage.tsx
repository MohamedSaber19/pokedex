import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import PokemonDetailCard from "../components/PokemonDetailCard";
import { usePokemonDetail } from "../hooks/usePokemonDetail";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePokemonDetail(id);

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <ArrowLeft className="size-4" />
          Back to List
        </Link>

        {isError ? (
          <ErrorState
            message="Couldn't load this Pokémon."
            onRetry={() => refetch()}
          />
        ) : isLoading || !data ? (
          <DetailSkeleton />
        ) : (
          <PokemonDetailCard pokemon={data} />
        )}
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="size-8 animate-spin text-gray-400" />
    </div>
  );
}
