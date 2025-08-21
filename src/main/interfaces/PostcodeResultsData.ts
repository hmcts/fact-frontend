import { PageData } from './PageData';

export interface PostcodeResultsData extends PageData {
  hint: string;
  errorType: string;
  postcodeSearchResultsHint: string;
  multipleResultsHint: string;
  singleResultsHint: string;
  secondHint: string;
  results: PostcodeResultsData | {};
  isDivorceOrCivil: boolean;
  serviceArea: string;
}

export interface PostcodeSearchResultsData {
  name: string;
  slug: string;
  onlineUrl: string;
  onlineText: string;
  courts: CourtWithDistance[];
}

export interface CourtWithDistanceResultsData extends PageData {
  postcodeSearchResultsHint: string;
  postcodeOnlySearch: boolean;
  results: CourtData | {};
}

export interface CourtData {
  courts: CourtWithDistance[];
}

export interface CourtWithDistance {
  name: string;
  slug: string;
  distance: number;
}
