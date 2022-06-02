export interface Filter {
  search?: string,
  minDate?: string,
  maxDate?: string,
  minPlayers?: number,
  maxPlayers?: number,
  city?: string,
}

export interface SortBy {
  name?: string,
  field?: string,
  asc?: boolean,
}