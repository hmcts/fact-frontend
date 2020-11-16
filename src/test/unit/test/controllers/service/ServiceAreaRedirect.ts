import { ServiceAreaResult } from '../../../../../main/interfaces/ServiceAreasData';
import { Catchment } from '../../../../../main/utils/Catchment';
import { ServiceAreaRedirect } from '../../../../../main/controllers/service/ServiceAreaRedirect';
import { Action } from '../../../../../main/utils/Action';

describe('ServiceAreaRedirect', () => {
  const redirect = new ServiceAreaRedirect();

  test('Should redirect an area with all types to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'no-example',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.National, slug: 'court-1' },
        { catchmentType: Catchment.Regional, slug: 'court-2' },
        { catchmentType: Catchment.Local, slug: 'court-3' }
      ]
    } as any;

    expect(redirect.getUrl('no-example', serviceArea, Action.Nearest)).toBe('/services/no-example/no-example/search-by-postcode');
    expect(redirect.getUrl('no-example', serviceArea, Action.SendDocuments)).toBe('/services/no-example/no-example/search-by-postcode');
    expect(redirect.getUrl('no-example', serviceArea, Action.Update)).toBe('/services/no-example/no-example/search-results');
    expect(redirect.getUrl('no-example', serviceArea, Action.NotListed)).toBe('/services/no-example/no-example/search-results');
  });

  test('Should redirect probate to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'probate',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [{ catchmentType: Catchment.National, slug: 'court-1' }]
    } as any;

    expect(redirect.getUrl('probate', serviceArea, Action.Nearest)).toBe('/services/probate/probate/search-results');
    expect(redirect.getUrl('probate', serviceArea, Action.SendDocuments)).toBe('/services/probate/probate/search-results');
    expect(redirect.getUrl('probate', serviceArea, Action.Update)).toBe('/services/probate/probate/search-results');
    expect(redirect.getUrl('probate', serviceArea, Action.NotListed)).toBe('/services/probate/probate/search-results');
  });

  test('Should redirect SSCS to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'sscs',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.National, slug: 'court-1' },
        { catchmentType: Catchment.Local, slug: 'court-2' }
      ]
    } as any;

    expect(redirect.getUrl('sscs', serviceArea, Action.Nearest)).toBe('/services/sscs/sscs/search-by-postcode');
    expect(redirect.getUrl('sscs', serviceArea, Action.SendDocuments)).toBe('/services/sscs/sscs/search-results');
    expect(redirect.getUrl('sscs', serviceArea, Action.Update)).toBe('/services/sscs/sscs/search-results');
    expect(redirect.getUrl('sscs', serviceArea, Action.NotListed)).toBe('/services/sscs/sscs/search-results');
  });

  test('Should redirect divorce to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'divorce',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.National, slug: 'court-1' },
        { catchmentType: Catchment.Regional, slug: 'court-2' }
      ]
    } as any;

    expect(redirect.getUrl('divorce', serviceArea, Action.Nearest)).toBe('/services/divorce/divorce/search-by-postcode');
    expect(redirect.getUrl('divorce', serviceArea, Action.SendDocuments)).toBe('/services/divorce/divorce/search-by-postcode');
    expect(redirect.getUrl('divorce', serviceArea, Action.Update)).toBe('/services/divorce/divorce/search-results');
    expect(redirect.getUrl('divorce', serviceArea, Action.NotListed)).toBe('/services/divorce/divorce/search-results');
  });

  test('Should redirect finrem to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'finrem',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.Regional, slug: 'court-1' }
      ]
    } as any;

    expect(redirect.getUrl('finrem', serviceArea, Action.Nearest)).toBe('/services/finrem/finrem/search-by-postcode');
    expect(redirect.getUrl('finrem', serviceArea, Action.SendDocuments)).toBe('/services/finrem/finrem/search-by-postcode');
    expect(redirect.getUrl('finrem', serviceArea, Action.Update)).toBe('/services/finrem/finrem/search-by-postcode');
    expect(redirect.getUrl('finrem', serviceArea, Action.NotListed)).toBe('/services/finrem/finrem/search-by-postcode');
  });

  test('Should redirect a regional and local area to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'no-example2',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.Regional, slug: 'court-1' },
        { catchmentType: Catchment.Local, slug: 'court-2' }
      ]
    } as any;

    expect(redirect.getUrl('no-example2', serviceArea, Action.Nearest)).toBe('/services/no-example2/no-example2/search-by-postcode');
    expect(redirect.getUrl('no-example2', serviceArea, Action.SendDocuments)).toBe('/services/no-example2/no-example2/search-by-postcode');
    expect(redirect.getUrl('no-example2', serviceArea, Action.Update)).toBe('/services/no-example2/no-example2/search-by-postcode');
    expect(redirect.getUrl('no-example2', serviceArea, Action.NotListed)).toBe('/services/no-example2/no-example2/search-by-postcode');
  });

  test('Should redirect adoption to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'adoption',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.Local, slug: 'court-1' }
      ]
    } as any;

    expect(redirect.getUrl('adoption', serviceArea, Action.Nearest)).toBe('/services/adoption/adoption/search-by-postcode');
    expect(redirect.getUrl('adoption', serviceArea, Action.SendDocuments)).toBe('/services/adoption/adoption/search-by-postcode');
    expect(redirect.getUrl('adoption', serviceArea, Action.Update)).toBe('/services/adoption/adoption/search-by-postcode');
    expect(redirect.getUrl('adoption', serviceArea, Action.NotListed)).toBe('/services/adoption/adoption/search-by-postcode');
  });

});
