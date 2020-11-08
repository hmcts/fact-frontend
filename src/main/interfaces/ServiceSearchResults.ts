import { PageData } from './PageData';

export interface ServiceSearchResults extends PageData {
  hint: string;
  nameOfCourt: string;
  slug: string;
  regionStatement: string;
  onlineText: string;
  onlineUrl: string;
}
