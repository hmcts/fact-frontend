export interface PageData {
  path: string;
  [property: string]: string | {};
}

export interface SearchResultsData extends PageData {
  search: string;
  results: {}[];
  foundResults?: string;
}
