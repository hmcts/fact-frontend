import { PageData } from './PageData';

export interface SearchResultsData extends PageData {
  search: string;
  results: SearchResult[];
  foundResults: string;
}

export interface SearchResult {
  address: string;
  name: string;
  postcode: string;
  slug: string;
  town_name: string;
}
