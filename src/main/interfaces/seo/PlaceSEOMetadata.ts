export interface ThingSEOMetadata {
  '@context': string;
  '@type': string;
  '@id': string;
  'name': string;
}

export interface PlaceSEOMetadata extends ThingSEOMetadata {
  'image': string[];
  'address': {
    '@type': string;
    'streetAddress': string;
    'addressLocality': string;
    'postalCode': string;
    'addressCountry': string;
  };
}
