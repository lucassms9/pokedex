import { QueryKey } from 'react-query';

export const createPaginationKey = (offset): QueryKey => [
  'usePaginationList',
  offset
];
