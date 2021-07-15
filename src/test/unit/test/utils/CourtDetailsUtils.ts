import {
  filterAdditionalLinks,
  decideCatchmentArea,
  formatAreasOfLaw
} from '../../../../main/utils/CourtDetailsUtils';
import {AdditionalLink} from '../../../../main/interfaces/CourtDetailsData';

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

  describe('filterAdditionalLinks', () => {
    const url1 = 'www.test1.com';
    const url2 = 'www.test2.com';
    const url3 = 'www.test3.com';

    const thisLocationHandles = 'This location handles';
    const findOutMoreAbout = 'Find out more about';

    test('Should filter additional Links on location', () => {
      const additionalLinks: AdditionalLink[] = [
        {
          url: url1,
          description: 'description1',
          location: thisLocationHandles
        },
        {
          url: url2,
          description: 'description2',
          location: findOutMoreAbout
        },
        {
          url: url3,
          description: 'description3',
          location: thisLocationHandles
        }
      ];

      const results: AdditionalLink[] = filterAdditionalLinks(additionalLinks, thisLocationHandles);
      expect(results.length).toEqual(2);
      expect(results[0].url).toEqual(url1);
      expect(results[1].url).toEqual(url3);
    });

    test('Should set flag for \'Financial Remedy\' description', () => {
      const additionalLinks: AdditionalLink[] = [
        {
          url: url1,
          description: 'Financial Remedy',
          location: findOutMoreAbout
        },
        {
          url: url2,
          description: 'Something else',
          location: findOutMoreAbout
        }
      ];

      const results: AdditionalLink[] = filterAdditionalLinks(additionalLinks, findOutMoreAbout);
      expect(results.length).toEqual(2);
      expect(results[0].isFinancialRemedy).toBeTruthy();
      expect(results[1].isFinancialRemedy).toBeUndefined();
    });
  });
});
