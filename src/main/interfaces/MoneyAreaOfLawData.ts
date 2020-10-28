import { PageData } from './PageData';

export interface MoneyAreaOfLawData extends PageData {
  results: MoneyAreaOfLawResult[] | {};
}

export interface MoneyAreaOfLawResult {
  name: string;
  description: string;
}
