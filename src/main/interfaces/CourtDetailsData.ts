import { PageData } from './PageData';

export interface CourtDetailsData extends PageData {
  results: CourtDetailsResult | {};
  notInPersonP1: string;
  catchmentArea: {
    area1: string;
    area2: string;
  };
}

export interface CourtDetailsResult {
  name: string;
  slug: string;
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
  opening_times: [];
  facilities: [];
  addresses: [];
  gbs: string;
  dx_number: [];
  service_area: string;
  in_person: boolean;
}
