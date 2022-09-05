export class PaginationInput {
  page: number;
  limit: number;
}

export const setDefaultPagination = (
  paging: PaginationInput,
): PaginationInput => {
  if (paging.page <= 0) {
    paging.page = 1;
  }
  if (paging.limit <= 0) {
    paging.limit = 10;
  }
  return paging;
};
