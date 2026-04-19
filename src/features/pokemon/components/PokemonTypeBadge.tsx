import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-neutral-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-300",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-amber-700",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-indigo-700",
  dragon: "bg-violet-700",
  dark: "bg-neutral-800",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

export function PokemonTypeBadge({ name }: { name: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize text-white shadow-sm",
        TYPE_COLORS[name] ?? "bg-gray-400",
      )}
    >
      {name}
    </span>
  );
}
