import { PageData } from './PageData';

export interface ServiceSearchResults extends PageData {
  hint: string;
  nameOfCourt: string;
  slug: string;
  regionStatement: string;
  applyOnline: string;
  applyOnlineUrl: string;
}
