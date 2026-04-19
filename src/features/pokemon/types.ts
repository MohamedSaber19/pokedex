export type ListItem = {
  name: string;
  url: string;
};

export type ListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListItem[];
};

export type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: { name: string; url: string };
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": { front_default: string | null };
    };
  };
};
