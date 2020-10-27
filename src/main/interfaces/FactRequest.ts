import { Request } from 'express';
import { SearchResultsData } from './SearchResultsData';
import { AreaOfLawData } from './AreaOfLawData';

export interface FactRequest extends Request {
  i18n?: {
    getDataByLanguage: (lng: string) => {
      search: {
        option: {};
        location: SearchResultsData;
        results: {};
      };
      home: {};
      'choose-action': {};
      template: {};
      'choose-area-of-law': AreaOfLawData;
      'money-area-of-law': {};
      'family-area-of-law': {};
      'childcare-and-parenting-area-of-law': {};
    };
  };
  lng?: string;
}
