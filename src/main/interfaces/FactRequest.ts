import { Request } from 'express';
import { SearchResultsData } from './SearchResultsData';
import { ServicesData } from './ServicesData';
import { CourtDetailsData } from './CourtDetailsData';
import { ServiceAreasData } from './ServiceAreasData';
import { ServiceSearchResults } from './ServiceSearchResults';
import { PostcodeSearchData } from './PostcodeSearchData';
import { PostcodeResultsData } from './PostcodeResultsData';
import {CourtResultsData} from './CourtResultsData';

export interface FactRequest extends Request {
  i18n?: {
    getDataByLanguage: (lng: string) => {
      search: {
        option: {};
        location: SearchResultsData;
        'prefix-search': CourtResultsData;
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
      'postcode-search': PostcodeSearchData;
      'postcode-results': PostcodeResultsData;
    };
  };
  lng?: string;
}
