export const hasProperty = (actual: {}, expected: string): boolean => {
  return actual !== undefined && expected in actual;
};

export const isEmpty = (value: string): boolean => {
  return value === undefined || value === '';
};

export const isObjectEmpty = (obj: {}): boolean => {
  return Object.keys(obj).length === 0;
};

const isPostcodeEnteredValid = (postcode: string): boolean => {
  const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
};

const postcodeIsScottish = (postcode: string): boolean => {
  const regex = /^(ZE|KW|IV|HS|PH|AB|DD|PA|FK|G|KY|KA|DG|TD|EH|ML)/i;
  return regex.test(postcode);
};

const postcodeIsNorthernIreland = (postcode: string): boolean => {
  const regex = /^(BT)/i;
  return regex.test(postcode);
};

export const isPostcodeValid = (postcode: string, serviceArea: string): string => {
  if (isEmpty(postcode)){
    return 'blankPostcode';
  } else if (!isPostcodeEnteredValid(postcode)) {
    return 'invalidPostcode';
  } else if (postcodeIsScottish(postcode)) {
    if (serviceArea === 'childcare-arrangements') {
      return 'scottishChildrenPostcode';
    }
    return 'scottishPostcode';
  } else if (postcodeIsNorthernIreland(postcode)) {
    return 'northernIrelandPostcode';
  } else {
    return '';
  }
};
