export interface TournamentPokemon {
  id: number;
  name: string;
  type: string;
  baseExperience: number;
  wins: number;
  losses: number;
  ties: number;
  winRate: number;
  image: string;
}

export const TYPE_ADVANTAGE: Record<string, string> = {
  water: 'fire',
  fire: 'grass',
  grass: 'electric',
  electric: 'water',
  ghost: 'psychic',
  psychic: 'fighting',
  fighting: 'dark',
  dark: 'ghost'
};