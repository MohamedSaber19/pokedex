import { Link } from "react-router-dom";
import type { ListItem } from "../types";
import { extractIdFromUrl, getSpriteUrl } from "../utils";

export function PokemonCard({ item }: { item: ListItem }) {
  const id = extractIdFromUrl(item.url);
  const sprite = getSpriteUrl(id);

  return (
    <Link
      to={`/pokemon/${id}`}
      className="group rounded-md bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3 grid aspect-square place-items-center overflow-hidden rounded-xl bg-gray-100">
        <img
          src={sprite}
          alt={item.name}
          loading="lazy"
          className="h-3/4 object-contain transition-transform group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/pokemon-placeholder.svg";
          }}
        />
      </div>
      <h3 className="text-center font-semibold text-gray-900 capitalize">
        {item.name}
      </h3>
      <p className="mt-1 text-center text-sm text-gray-400">
        #{String(id).padStart(3, "0")}
      </p>
    </Link>
  );
}
