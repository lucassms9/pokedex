import { useInfiniteQuery } from 'react-query';

import { createPaginationKey } from './keys';
import { PokemonClient } from './client';
import { PokemonEntity } from './types';
import { useMemo } from 'react';

const usePaginationList = (offset = 0) => {
  const {
    data,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage
  } = useInfiniteQuery(
    createPaginationKey(offset),
    ({ pageParam }) =>
      new PokemonClient().getPaginationPokemon(pageParam?.offset),
    {
      retry: false
    }
  );

  const pagesItems = useMemo<PokemonEntity[] | undefined>(() => {
    const newData = data?.pages.filter((page) => page).flatMap((item) => item);
    return newData;
  }, [data?.pages]);

  const rows = data?.pages?.[0]?.length ?? 0;
  const hasNextPage = Boolean(rows >= 8);

  return {
    pokemons: pagesItems,
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage
  };
};

export default usePaginationList;
