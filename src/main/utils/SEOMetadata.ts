import { PlaceSEOMetadata } from '../interfaces/seo/PlaceSEOMetadata';
import { CourtDetailsResult } from '../interfaces/CourtDetailsData';
import {hasProperty, isEmpty} from './validation';
import config from 'config';

/**
 * Generates address structure for use in schema.org JSON-LD structured data objects.
 * @param address - address object from CourtDetailsResult object.
 */
const generateAddressStruct = (address: any): any => {
  const addressStruct: any = {
    '@type': 'PostalAddress',
    addressCountry: 'GB'
  };

  if(hasProperty(address, 'address_lines')) {
    addressStruct.streetAddress = address.address_lines.join(', ');
  }

  if(hasProperty(address, 'town')) {
    addressStruct.addressLocality = address.town;
  }

  if(hasProperty(address, 'postcode')) {
    addressStruct.postalCode = address.postcode;
  }

  return addressStruct;
};

/**
 * Generates a JSON object implementing the structure specified in https://schema.org/Place
 * Only incorporates fields required by common SEO engines.
 * @param court - Court to generate schema object for.
 */
export const generatePlaceMetadata = (court: CourtDetailsResult): PlaceSEOMetadata | {} => {
  const placeStruct: any = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOffice'
  };

  if(hasProperty(court, 'name')) {
    placeStruct.name = court.name;
  } else {
    return {};
  }

  if(hasProperty(court, 'slug')) {
    placeStruct['@id'] = config.get('services.frontend.url') + '/courts/' + court.slug;
  } else {
    return {};
  }

  if(hasProperty(court, 'image_file') && !isEmpty(court.image_file) && court.image_file !== null) {
    placeStruct.image = [ court.image_file ] ;
  } else {
    placeStruct.image = [ config.get('services.frontend.url') + '/public/assets/images/hmcts-logo.png' ];
  }

  if(hasProperty(court, 'addresses')) {
    placeStruct.address = generateAddressStruct(court.addresses[0]);
  }

  return placeStruct;
};


