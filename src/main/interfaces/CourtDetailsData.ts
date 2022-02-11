import { PageData } from './PageData';
import { ApplicationUpdate } from './ApplicationUpdate';

export interface CourtDetailsData extends PageData {
  results: CourtDetailsResult | {};
  notInPersonP1: string;
  title: string;
  catchmentArea: {
    area1: string;
    area2: string;
  };
}

export interface CourtDetailsResult {
  name: string;
  slug: string;
  catchment: string;
  info: string;
  open: boolean;
  directions: string;
  image_file: string;
  lat: number;
  lon: number;
  urgent_message: string;
  crown_location_code: number;
  county_location_code: number;
  magistrates_location_code: number;
  areas_of_law: [];
  types: [];
  emails: [];
  contacts: [];
  application_updates: ApplicationUpdate[];
  opening_times: [];
  facilities: [];
  addresses: any[];
  gbs: string;
  dx_number: [];
  service_area: string[];
  in_person: boolean;
  additional_links: AdditionalLink[];
  service_centre: ServiceCentre;
}

export interface ServiceCentre {
  is_a_service_centre: boolean;
  intro_paragraph: string;
  intro_paragraph_cy: string;
}

export interface AdditionalLink {
  url: string;
  description: string;
  location: string;
}
