import { PageData } from './PageData';

export interface SearchResultsData extends PageData {
  search: string;
  results: SearchResult[];
  foundResults: string;
  foundResult: string;
}

export interface SearchResult {
  address: string;
  name: string;
  postcode: string;
  slug: string;
  townName: string;
}

export interface SearchCourtHistoryResult {
  name: string;
  slug: string;
  historicalName: string;
}
