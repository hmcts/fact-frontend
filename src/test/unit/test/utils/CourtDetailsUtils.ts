import {decideCatchmentArea, formatServiceAreas} from '../../../../main/utils/CourtDetailsUtils';

describe('CourtDetailsUtils', () => {
  describe('decideCatchmentArea', () => {
    test('Should return catchment area 1', async () => {
      const catchmentArea: { area1: string; area2: string } = {
        area1: 'area1',
        area2: 'area2'
      };

      expect(decideCatchmentArea(true, catchmentArea)).toEqual(catchmentArea.area1);
    });

    test('Should return catchment area 2', async () => {
      const catchmentArea: { area1: string; area2: string } = {
        area1: 'area1',
        area2: 'area2'
      };

      expect(decideCatchmentArea(false, catchmentArea)).toEqual(catchmentArea.area2);
    });
  });

  describe('formatServiceAreas', () => {
    test('Should return single formatted area', () => {
      const serviceAreas: string[] = ['Money'];

      expect(formatServiceAreas(serviceAreas)).toEqual('money');
    });

    test('Should return dual formatted areas', () => {
      const serviceAreas: string[] = ['Money', 'Civil Protection'];

      expect(formatServiceAreas(serviceAreas)).toEqual('money and civil protection');
    });

    test('Should return list of formatted areas', () => {
      const serviceAreas: string[] = ['Money', 'Civil Protection', 'Divorce'];

      expect(formatServiceAreas(serviceAreas)).toEqual('money, civil protection and divorce');
    });

    test('Should return empty string', () => {
      const serviceAreas: string[] = ['Money', 'Civil Protection', 'Divorce'];

      expect(formatServiceAreas(serviceAreas)).toEqual('money, civil protection and divorce');
    });
  });
});
