import { FactApi } from '../../../../main/utils/FactApi';

describe('FactApi', () => {
  test('Should return results from get request', async () => {
    const results = {
      data: [{
        name: 'London',
        slug: 'London',
        address: 'Address Street',
        'townName': 'AAA',
        postcode: 'AAA AAA',
      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.search('London' ,'en')).resolves.toEqual(results.data);
  });

  test('Should return no result and log error from get request', async () => {

    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.search( null ,'en')).resolves.toEqual([]);
    await expect(spy).toBeCalled();

  });

  test('Should return court details result', async () => {
    const results = {
      data: [{
        name: 'London',
        slug: 'London',
        address: 'Address Street',
        'townName': 'AAA',
        postcode: 'AAA AAA',
      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.court('London', 'en')).resolves.toEqual(results.data);
  });

  test('Should return no result and log error from get request', async () => {

    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.court( null , 'en')).resolves.toEqual({});
    await expect(spy).toBeCalled();

  });

  test('Should return services result', async () => {
    const results = {
      data: [{
        name: 'Money',
        description: 'Money claims, rent or mortgage disputes, bankruptcy, job disputes related to pay, appealing a tax or benefits decision.',
        slug: 'money'

      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.services('en')).resolves.toEqual(results.data);
  });

  test('Should return no result and log error from services', async () => {
    const mockAxios = {
      get: async () => {
        throw new Error('Error');
      }
    } as any;
    const mockLogger = {
      error: async (message: string) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.services('en')).resolves.toEqual([]);
    await expect(spy).toBeCalled();
  });

  test('Should return service result', async () => {
    const results = {
      data: [{
        name: 'name',
        description: 'description',
        slug: 'slug'
      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.getService('slug', 'en')).resolves.toEqual(results.data);
  });

  test('Should return no service result and log error', async () => {
    const mockAxios = {
      get: async () => {
        throw new Error('Error');
      }
    } as any;
    const mockLogger = {
      error: async (message: string) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.getService('slug', 'en')).resolves.toEqual({});
    await expect(spy).toBeCalled();
  });

  test('Should return service areas result', async () => {
    const results = {
      data: [{
        name: 'Money claims',
        description: 'Claims for when you are owed money or responding to money claims against you.'

      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.serviceAreas('Money', 'en')).resolves.toEqual(results.data);
  });

  test('Should return no result and log error from service areas', async () => {
    const mockAxios = {
      get: async () => {
        throw new Error('Error');
      }
    } as any;
    const mockLogger = {
      error: async (message: string) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.serviceAreas('Money','en')).resolves.toEqual([]);
    await expect(spy).toBeCalled();
  });

  test('Should return service area', async () => {
    const results = {
      data: [{
        'name': 'service area',
        'description': 'description.',
        'slug': 'service-area',
        'applyOnline': 'Apply to service area online',
        'applyOnlineUrl': 'https://www.gov.uk/make-service-area'
      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.getServiceArea('service-area', 'en')).resolves.toEqual(results.data);
  });

  test('Should return no service area and log error', async () => {
    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.court( null ,'en')).resolves.toEqual({});
    await expect(api.getServiceArea('service-area' , 'en')).resolves.toEqual([]);
    await expect(spy).toBeCalled();
  });

});
