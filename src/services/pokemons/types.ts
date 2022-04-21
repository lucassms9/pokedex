export type PokemonEntity = {
  id: number;
  name: string;
  description: string;
  image: string;
  genera: string;
  pokedex_number: string;
  base_experience: number;
  types: Type[];
  stats: Stat[];
  height: number;
  weight: number;
  abilites: Ability[];
  gender_rate: number;
  egg_groups: EggGroup[];
};

export type Result = {
  name: string;
  url: string;
};

export type PokemonApiResult = {
  count: number;
  next?: string;
  previous?: string;
  results: Result[];
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Form = {
  name: string;
  url: string;
};

export type GameIndice = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

export type Move = {
  move: {
    name: string;
    url: string;
  };
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name:
      | 'hp'
      | 'attack'
      | 'defense'
      | 'special-attack'
      | 'special-defense'
      | 'speed';
    url: string;
  };
};

export type Type = {
  slot?: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Stat[];
  types: Type[];
  weight: number;
};

//pokemon species

export type EggGroup = {
  name: string;
  url: string;
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};

export type Genera = {
  genus: string;
  language: {
    name: string;
    url: string;
  };
};

export type Name = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

export type PokemonSpecie = {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: EggGroup[];
  flavor_text_entries: FlavorTextEntry[];
  gender_rate: number;
  genera: Genera[];
  names: Name[];
  order: number;
  evolution_chain: {
    url: string;
  };
};

export type EvolutionDetails = {
  gender: string;
  held_item: string;
  item: string;
  known_move: string;
  known_move_type: string;
  location: string;
  min_affection: string;
  min_beauty: string;
  min_happiness: string;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: string;
  party_type: string;
  relative_physical_stats: string;
  time_of_day: string;
  trade_species: string;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
};

export type EvolvesTo = {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
  species: {
    name: string;
    url: string;
  };
};

export type EvolutionChain = {
  baby_trigger_item: string;
  chain: {
    evolution_details: EvolutionDetails[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
  };
  id: number;
};
