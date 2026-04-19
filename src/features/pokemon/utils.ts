export function extractIdFromUrl(url: string): number {
  // url sample: "https://pokeapi.co/api/v2/pokemon/25/"
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? Number(match[1]) : 0;
}

export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
