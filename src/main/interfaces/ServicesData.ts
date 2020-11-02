import { PageData } from './PageData';

export interface ServicesData extends PageData {
  results: ServicesResult[] | {};
}

export interface ServicesResult {
  name: string;
  description: string;
  slug: string;
}
