import {PageData} from './PageData';

export interface CourtResultsData extends PageData {
  results: CourtReference[] | [];
}

export interface CourtReference {
  name: string;
  slug: string;
  updatedAt: string;
}
