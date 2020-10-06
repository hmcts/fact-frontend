import { I18next } from '../../../../main/modules/i18next';
import { app } from '../../../../main/app';

describe('i18next', () => {
  describe('enableFor', () => {
    test('Should', async () => {
      const spy = jest.spyOn(app, 'use');
      new I18next().enableFor(app);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
