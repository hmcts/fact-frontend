import { PageData } from './PageData';

export interface ServiceData extends PageData {
  results: ServiceResult[] | {};
  title: string;
  question: string;
  error: {
    text: string;
  };
}

export interface ServiceResult {
  name: string;
  description: string;
}
