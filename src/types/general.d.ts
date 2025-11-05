type PaginatedListResponse<T> = {
  data: T[];
  count: number;
  offset: number;
  limit: number;
};

type Page = {
  label: string;
  href: string;
  disabled: boolean;
};
