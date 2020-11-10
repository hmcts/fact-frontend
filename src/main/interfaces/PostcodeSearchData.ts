import { PageData } from './PageData';
import { CourtDetailsWithDistanceResult } from './CourtDetailsData';

export interface PostcodeSearchData extends PageData {
  hint: string;
  errorType: string;
  multipleResultsHint: string;
  results: CourtDetailsWithDistanceResult[];
}
