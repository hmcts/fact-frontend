import {hasProperty, isArrayEmpty, isEmpty, isPostcodeValid} from '../../../../main/utils/validation';

describe('validation', () => {
  describe('hasProperty', () => {
    test('Should return true if object has the property', async () => {
      const object: {} = {
        a: 'b',
      };
      const property = 'a';
      const results = hasProperty(object, property);
      expect(results).toBe(true);
    });

    test('Should return false if object does not have the property', async () => {
      const object: {} = {
        a: 'b',
      };
      const property = 'c';
      const results = hasProperty(object, property);
      expect(results).toBe(false);
    });

    test('Should return false if object is undefined', async () => {
      const object: any = undefined;
      const property = 'c';
      const results = hasProperty(object, property);
      expect(results).toBe(false);
    });

    test('Should return false if property is undefined', async () => {
      const object: {} = {
        a: 'b',
      };
      const property: any = undefined;
      const results = hasProperty(object, property);
      expect(results).toBe(false);
    });
  });

  describe('isEmpty', () => {
    test('Should return true if string is empty', async () => {
      const string = '';
      const results = isEmpty(string);
      expect(results).toBe(true);
    });

    test('Should return false if string is not empty', async () => {
      const string = 'test';
      const results = isEmpty(string);
      expect(results).toBe(false);
    });

    test('Should return true if string is undefined', async () => {
      const string: any = undefined;
      const results = isEmpty(string);
      expect(results).toBe(true);
    });
  });

  describe('isArrayEmpty', () => {
    test('Should return true if array is empty', async () => {
      const array: any[] = [];
      const results = isArrayEmpty(array);
      expect(results).toBe(true);
    });

    test('Should return false if string is not empty', async () => {
      const array = ['test'];
      const results = isArrayEmpty(array);
      expect(results).toBe(false);
    });

    test('Should return true if string is undefined', async () => {
      const array: any[] = undefined;
      const results = isArrayEmpty(array);
      expect(results).toBe(true);
    });
  });

  describe('isPostcodeValid', () => {
    test('Should return true if postcode is valid', async () => {
      const postcode = 'E8 1DY';
      const serviceArea = 'tax';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('');
    });

    test('Should return invalidPostcode if postcode is invalid', async () => {
      const postcode = 'isPostcodeValid';
      const serviceArea = 'tax';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('invalidPostcode');
    });

    test('Should return blankPostcode if postcode is empty', async () => {
      const postcode = '';
      const serviceArea = 'tax';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('blankPostcode');
    });

    test('Should return scottishChildrenPostcode if postcode is scottish and serviceArea is children arrangement', async () => {
      const postcode = 'AB10 1WP';
      const serviceArea = 'childcare-arrangements';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('scottishChildrenPostcode');
    });

    test('Should return scottishPostcode if postcode is scottish and serviceArea is not children arrangement', async () => {
      const postcode = 'AB10 1WP';
      const serviceArea = 'tax';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('scottishPostcode');
    });

    test('Should return northernIrelandPostcode if postcode is scottish and serviceArea is not children arrangement', async () => {
      const postcode = 'BT1 3LL';
      const serviceArea = 'tax';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('northernIrelandPostcode');
    });

    test('Should return invalidPostcode if postcode is channel islands postcode', async () => {
      const postcode = 'JE2 3QQ';
      const serviceArea = 'tax';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('invalidPostcode');
    });

    test('Should return invalidPostcode if postcode is isle of man postcode', async () => {
      const postcode = 'IM1 3AR';
      const serviceArea = 'tax';
      const results = isPostcodeValid(postcode, serviceArea);
      expect(results).toBe('invalidPostcode');
    });
  });
});
