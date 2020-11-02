import { Request } from 'express';
import { SearchResultsData } from './SearchResultsData';
import { ServicesData, ServicesResult } from './ServicesData';
import { CourtDetailsData } from './CourtDetailsData';
import { ServiceData } from './ServiceData';

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
      'choose-service': ServicesData;
      service: ServiceData;
      oneService: ServicesResult;
      [property: string]: {};
    };
  };
  lng?: string;
}
