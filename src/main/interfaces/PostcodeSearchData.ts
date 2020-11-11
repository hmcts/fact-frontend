import { PageData } from './PageData';
import { CourtDetailsWithDistanceResult } from './CourtDetailsData';

export interface PostcodeSearchData extends PageData {
  hint: string;
  errorType: string;
  multipleResultsHint: string;
  results: CourtDetailsWithDistanceResult[];
}

export type PostcodeSearchQuery = {
  error: string;
  postcode: string;
  noResults: string;
  aol: string;
  serviceAreaType: string;
}
