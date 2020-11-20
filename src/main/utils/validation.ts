const postcodeRegex = {
  validPostcode: /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i,
  scottish: /^(ZE|KW|IV|HS|PH|AB|DD|PA|FK|G|KY|KA|DG|TD|EH|ML)/i,
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
