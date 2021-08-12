import {
  decideCatchmentArea,
  formatAreasOfLaw
} from '../../../../main/utils/CourtDetailsUtils';

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
      const areasOfLaw: any = [
        {name: 'Money', 'display_name': null}
      ];

      expect(formatAreasOfLaw(areasOfLaw)).toEqual('money');
    });

    test('Should return dual formatted areas', () => {
      const areasOfLaw: any = [
        {name: 'Money', 'display_name': null},
        {name: 'Civil Protection', 'display_name': null}
      ];

      expect(formatAreasOfLaw(areasOfLaw)).toEqual('money and civil protection');
    });

    test('Should return list of formatted areas', () => {
      const areasOfLaw: any = [
        {name: 'Money', 'display_name': null},
        {name: 'Civil Protection', 'display_name': null},
        {name: 'Divorce', 'display_name': null}
      ];

      expect(formatAreasOfLaw(areasOfLaw)).toEqual('money, civil protection and divorce');
    });

    test('Should return empty string', () => {
      const areasOfLaw: any = [];

      expect(formatAreasOfLaw(areasOfLaw)).toEqual('');
    });
  });
});
