import { PaginationInput } from '../../common/pagination';

export class ListHotelsInput {
  paging: PaginationInput;
  orderBy: string;
  name: string;
  address: string;
}
