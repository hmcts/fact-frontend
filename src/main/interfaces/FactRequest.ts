import { Request } from 'express';
import { SearchResultsData } from './SearchResultsData';
import { CourtDetailsData } from './CourtDetailsData';

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
      'court-details': CourtDetailsData;
    };
  };
  lng?: string;
}
