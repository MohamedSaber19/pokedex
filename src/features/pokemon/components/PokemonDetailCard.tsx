import { cn } from "@/lib/utils";
import { Ruler, Weight, Zap, type LucideIcon } from "lucide-react";
import type { PokemonDetail } from "../types";
import { getSpriteUrl } from "../utils";
import { PokemonStats } from "./PokemonStats";
import { PokemonTypeBadge } from "./PokemonTypeBadge";

export default function DetailCard({ pokemon }: { pokemon: PokemonDetail }) {
  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default ??
    getSpriteUrl(pokemon.id);

  return (
    <article className="overflow-hidden rounded-md bg-white shadow-sm">
      <div className="bg-linear-to-r from-purple-500 to-pink-500 px-6 py-8 text-center text-white">
        <h1 className="inline-flex items-center gap-2 text-2xl font-bold capitalize">
          <Zap className="size-6" />
          {pokemon.name}
        </h1>
        <p className="mt-1 text-white/80">
          #{String(pokemon.id).padStart(3, "0")}
        </p>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-[1fr_1.3fr] md:p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="grid size-48 place-items-center rounded-full bg-gray-50 md:size-64">
            <img
              src={sprite}
              alt={pokemon.name}
              className="size-3/4 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/pokemon-placeholder.svg";
              }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.types.map((t) => (
              <PokemonTypeBadge key={t.type.name} name={t.type.name} />
            ))}
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <StatBox
              icon={Ruler}
              label="Height"
              value={`${(pokemon.height / 10).toFixed(1)} m`}
            />
            <StatBox
              icon={Weight}
              label="Weight"
              value={`${(pokemon.weight / 10).toFixed(1)} kg`}
            />
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="mb-3 text-lg font-bold text-gray-900">Base Stats</h2>
            <PokemonStats stats={pokemon.stats} />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-gray-900">Abilities</h2>
            {pokemon.abilities.length === 0 ? (
              <p className="text-sm text-gray-500">—</p>
            ) : (
              <div className="space-y-2">
                {pokemon.abilities.map((a) => (
                  <div key={a.ability.name} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs text-gray-700",
                        a.is_hidden
                          ? "bg-gray-100"
                          : "border border-gray-200 bg-white",
                      )}
                    >
                      {a.ability.name.replace(/-/g, " ")}
                    </span>
                    {a.is_hidden && (
                      <span className="text-xs text-gray-400">(Hidden)</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-gray-900">
              Base Experience
            </h2>
            <p className="text-2xl font-bold text-purple-600">
              {pokemon.base_experience != null
                ? `${pokemon.base_experience} XP`
                : "—"}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}

function StatBox({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 text-center">
      <p className="inline-flex items-center gap-1 text-xs text-gray-500">
        <Icon className="size-3" />
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}
