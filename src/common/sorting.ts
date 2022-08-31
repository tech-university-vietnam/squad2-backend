enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortingInput {
  sortBy: string;
  sortOrder: Order;
}
