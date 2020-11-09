import { PageData } from './PageData';

export interface ServiceAreasData extends PageData {
  results: ServiceAreaResult[] | {};
  title: string;
  question: string;
  error: {
    text: string;
  };
}

export interface ServiceAreaResult {
  name: string;
  description: string;
  slug: string;
  serviceAreaType: string;
  onlineUrl: string;
  onlineText: string;
  serviceAreaCourts: ServiceAreaCourt[];
}

export interface ServiceAreaCourt {
  slug: string;
  catchmentType: string;
  courtName: string;
}
