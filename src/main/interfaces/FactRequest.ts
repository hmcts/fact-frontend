import { Request } from 'express';
import { SearchResultsData } from './SearchResultsData';
import { ServicesData } from './ServicesData';
import { CourtDetailsData } from './CourtDetailsData';
import { ServiceAreasData } from './ServiceAreasData';
import { ServiceSearchResults } from './ServiceSearchResults';

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
      service: ServiceAreasData;
      [property: string]: {};
      'service-results': ServiceSearchResults;
    };
  };
  lng?: string;
}
