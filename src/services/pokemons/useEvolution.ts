import { useQuery } from 'react-query';
import { PokemonClient } from './client';

import { createEvolutionKey } from './keys';

const useEvolution = (pokemonId: number) => {
  const pokemonClient = new PokemonClient();

  const { data, isLoading } = useQuery(
    createEvolutionKey(pokemonId),
    () => pokemonClient.getEvolution(pokemonId),
    {
      enabled: Boolean(pokemonId)
    }
  );
  return {
    evolutions: data,
    isLoading
  };
};

export { useEvolution };
