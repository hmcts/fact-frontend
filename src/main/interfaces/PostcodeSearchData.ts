import { PageData } from './PageData';

export interface PostcodeSearchData extends PageData {
  hint: string;
  errorType: string;
}

export type PostcodeSearchQuery = {
  error: string;
  postcode: string;
  noResults: string;
};
