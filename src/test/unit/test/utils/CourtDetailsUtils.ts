import {decideCatchmentArea} from '../../../../main/utils/CourtDetailsUtils';

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
});
