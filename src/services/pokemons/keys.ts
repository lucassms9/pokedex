import { QueryKey } from 'react-query';

export const createPaginationKey = (offset): QueryKey => [
  'usePaginationList',
  offset
];

export const createEvolutionKey = (pokemonId): QueryKey => [
  'useEvolution',
  pokemonId
];
