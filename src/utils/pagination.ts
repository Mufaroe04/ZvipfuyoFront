import { AppDispatch } from '../redux/store';
import { PaginatedResponse } from '../types/types';

/**
 * Global helper to handle fetching the next page of results
 */
export const handleLoadMore = <T>(
  dispatch: AppDispatch,
  action: any,
  data: PaginatedResponse<T>,
  loading: boolean,
  extraParams: object = {}
) => {
  if (data.next && !loading) {
    dispatch(action({ url: data.next, ...extraParams }));
  }
};