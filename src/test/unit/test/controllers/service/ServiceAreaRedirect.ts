import { ServiceAreaResult } from '../../../../../main/interfaces/ServiceAreasData';
import { Catchment } from '../../../../../main/utils/Catchment';
import { ServiceAreaRedirect } from '../../../../../main/controllers/service/ServiceAreaRedirect';
import { Action } from '../../../../../main/utils/Action';
import { Logger } from '../../../../../main/interfaces/Logger';

describe('ServiceAreaRedirect', () => {
  const mockLogger = {} as any;
  const redirect = new ServiceAreaRedirect(
    mockLogger
  );

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

    expect(redirect.getUrl('no-example', serviceArea, Action.Nearest)).toBe('/services/no-example/no-example/nearest/search-by-postcode');
    expect(redirect.getUrl('no-example', serviceArea, Action.SendDocuments)).toBe('/services/no-example/no-example/documents/search-by-postcode');
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

    expect(redirect.getUrl('sscs', serviceArea, Action.Nearest)).toBe('/services/sscs/sscs/nearest/search-by-postcode');
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

    expect(redirect.getUrl('divorce', serviceArea, Action.Nearest)).toBe('/services/divorce/divorce/nearest/search-by-postcode');
    expect(redirect.getUrl('divorce', serviceArea, Action.SendDocuments)).toBe('/services/divorce/divorce/documents/search-by-postcode');
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

    expect(redirect.getUrl('finrem', serviceArea, Action.Nearest)).toBe('/services/finrem/finrem/nearest/search-by-postcode');
    expect(redirect.getUrl('finrem', serviceArea, Action.SendDocuments)).toBe('/services/finrem/finrem/documents/search-by-postcode');
    expect(redirect.getUrl('finrem', serviceArea, Action.Update)).toBe('/services/finrem/finrem/update/search-by-postcode');
    expect(redirect.getUrl('finrem', serviceArea, Action.NotListed)).toBe('/services/finrem/finrem/not-listed/search-by-postcode');
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

    expect(redirect.getUrl('no-example2', serviceArea, Action.Nearest)).toBe('/services/no-example2/no-example2/nearest/search-by-postcode');
    expect(redirect.getUrl('no-example2', serviceArea, Action.SendDocuments)).toBe('/services/no-example2/no-example2/documents/search-by-postcode');
    expect(redirect.getUrl('no-example2', serviceArea, Action.Update)).toBe('/services/no-example2/no-example2/update/search-by-postcode');
    expect(redirect.getUrl('no-example2', serviceArea, Action.NotListed)).toBe('/services/no-example2/no-example2/not-listed/search-by-postcode');
  });

  test('Should redirect adoption to the correct endpoints', async () => {
    const serviceArea: ServiceAreaResult = {
      slug: 'adoption',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.Local, slug: 'court-1' }
      ]
    } as any;

    expect(redirect.getUrl('adoption', serviceArea, Action.Nearest)).toBe('/services/adoption/adoption/nearest/search-by-postcode');
    expect(redirect.getUrl('adoption', serviceArea, Action.SendDocuments)).toBe('/services/adoption/adoption/documents/search-by-postcode');
    expect(redirect.getUrl('adoption', serviceArea, Action.Update)).toBe('/services/adoption/adoption/update/search-by-postcode');
    expect(redirect.getUrl('adoption', serviceArea, Action.NotListed)).toBe('/services/adoption/adoption/not-listed/search-by-postcode');
  });

  test('Should return /not-found and log an error for an invalid action', () => {
    const mockLogger = { error: jest.fn() } as unknown as Logger;
    const redirect = new ServiceAreaRedirect(mockLogger);

    const serviceArea: ServiceAreaResult = {
      slug: 'some-area',
      areaOfLawName: 'SomeAol',
      serviceAreaCourts: [
        { catchmentType: Catchment.Local, slug: 'some-court' }
      ]
    } as any;

    const invalidAction = 'invalid-action' as any;

    const result = redirect.getUrl('some-service', serviceArea, invalidAction);

    expect(result).toBe('/not-found');
    expect(mockLogger.error).toHaveBeenCalledWith(
      "Invalid action 'invalid-action' found in ServiceAreaRedirect getURL."
    );
  });


});
