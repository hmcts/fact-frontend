import { Request } from 'express';

export interface FactRequest extends Request {
  i18n?: {
    getDataByLanguage: (lng: string) => {
      search: {
        option: {};
        location: {};
        results: {};
      };
    };
  };
  lng?: string;
}
