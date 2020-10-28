import { PageData } from './PageData';

export interface ChildcareAndParentingAreaOfLawData extends PageData {
  results: ChildcareAndParentingAreaOfLawResult[] | {};
}

export interface ChildcareAndParentingAreaOfLawResult {
  name: string;
  description: string;
}
