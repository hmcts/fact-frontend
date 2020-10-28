import { PageData } from './PageData';

export interface FamilyAreaOfLawData extends PageData {
  results: FamilyAreaOfLawResult[] | {};
}

export interface FamilyAreaOfLawResult {
  name: string;
  description: string;
}
