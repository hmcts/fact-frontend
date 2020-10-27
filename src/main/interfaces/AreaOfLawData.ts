import { PageData } from './PageData';

export interface AreaOfLawData extends PageData {
  results: AreaOfLawResult[] | {};
}

export interface AreaOfLawResult {
  name: string;
  description: string;
}
