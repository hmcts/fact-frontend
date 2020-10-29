import { PageData } from './PageData';

export interface ServiceData extends PageData {
  results: ServiceResult[] | {};
}

export interface ServiceResult {
  name: string;
  description: string;
}
