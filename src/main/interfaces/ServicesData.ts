import { PageData } from './PageData';

export interface ServicesData extends PageData {
  results: ServiceResult[] | {};
}

export interface ServiceResult {
  name: string;
  description: string;
  slug: string;
}
