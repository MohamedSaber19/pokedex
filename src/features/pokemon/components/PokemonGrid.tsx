import type { ListItem } from "../types";
import { PokemonCard } from "./PokemonCard";

type Props = {
  items: ListItem[];
  showSkeletons?: number;
};

export function PokemonGrid({ items, showSkeletons = 0 }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {items.map((item) => (
        <PokemonCard key={item.url} item={item} />
      ))}
      {Array.from({ length: showSkeletons }).map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 aspect-square animate-pulse rounded-xl bg-gray-100" />
      <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-gray-100" />
      <div className="mx-auto mt-2 h-3 w-1/3 animate-pulse rounded bg-gray-100" />
    </div>
  );
}
