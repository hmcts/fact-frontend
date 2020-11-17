import { PageData } from './PageData';

export interface PostcodeResultsData extends PageData {
  hint: string;
  errorType: string;
  multipleResultsHint: string;
  results: PostcodeResultsData | {};
}

export interface PostcodeSearchResultsData {
  name: string;
  onlineUrl: string;
  onlineText: string;
  courts: CourtWithDistance[];
}

export interface CourtWithDistance {
  name: string;
  slug: string;
  distance: number;
}
