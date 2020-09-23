import { hasProperty, isEmpty } from '../../../main/utils/validation';

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
});
