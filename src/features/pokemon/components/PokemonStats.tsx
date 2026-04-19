import type { PokemonStat } from "../types";

const LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

// most pokemon stats cap around 150 — bars clamp above that
const MAX = 150;

export function PokemonStats({ stats }: { stats: PokemonStat[] }) {
  return (
    <div className="space-y-3">
      {stats.map(({ stat, base_stat }) => {
        const pct = Math.min(100, (base_stat / MAX) * 100);
        return (
          <div key={stat.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 font-medium">
                {LABELS[stat.name] ?? stat.name}
              </span>
              <span className="font-semibold text-gray-900">{base_stat}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-l-full bg-gray-900"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
