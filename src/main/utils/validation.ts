const postcodeRegex = {
  validPostcode: /^[A-Z]{1,2}\d{1,2}[A-Z]? ?\d[A-Z]{2}$/i,
  scottish: /^(ZE|KW|IV|HS|PH|AB|DD|PA|FK|G\d|KY|KA|DG|TD|EH|ML)/i,
  ni: /^(BT)/i,
  channelIsland: /^(JE|GY)/i,
  isleOfMan: /^(IM)/i
};

export const hasProperty = (actual: {}, expected: string): boolean => {
  return actual !== undefined && expected in actual;
};

export const isEmpty = (value: string): boolean => {
  return value === undefined || value === '';
};

export const isArrayEmpty = (value: Array<any>): boolean => {
  return value === undefined || value.length === 0;
};

export const isObjectEmpty = (obj: {}): boolean => {
  return Object.keys(obj).length === 0;
};

const testPostcodeValidation = (postcode: string, regex: RegExp): boolean => {
  return regex.test(postcode);
};

export const isPostcodeValid = (postcode: string, serviceArea: string): string => {
  if (isEmpty(postcode)){
    return 'blankPostcode';
  } else if (!testPostcodeValidation(postcode, postcodeRegex.validPostcode)
    || testPostcodeValidation(postcode, postcodeRegex.isleOfMan)
    || testPostcodeValidation(postcode, postcodeRegex.channelIsland)) {
    return 'invalidPostcode';
  } else if (testPostcodeValidation(postcode, postcodeRegex.scottish)) {
    if (serviceArea === 'childcare-arrangements') {
      return 'scottishChildrenPostcode';
    } else if (!(['immigration','benefits','claims-against-employers'].includes(serviceArea))) {
      return 'scottishPostcode';
    }
  } else if (testPostcodeValidation(postcode, postcodeRegex.ni)) {
    return 'northernIrelandPostcode';
  }
  return '';
};

export const hasErrors = (obj: {}): boolean => {
  return hasProperty(obj, 'error');
};
