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

    await expect(api.search( null ,'en')).resolves.toEqual({null: [], error: true});
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

    await expect(api.services('en')).resolves.toEqual({null: [], error: true});
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

    await expect(api.getService('slug', 'en')).resolves.toEqual({null: {}, error: true});
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

    await expect(api.serviceAreas('Money','en')).resolves.toEqual({null: [], error: true});
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

    await expect(api.court( null ,'en')).resolves.toEqual({null: [], error: true});
    await expect(api.getServiceArea('service-area' , 'en')).resolves.toEqual({null: [], error: true});
    await expect(spy).toBeCalled();
  });

  test('Should return list of court from postcode and aol search', async () => {
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

    await expect(api.postcodeServiceAreaSearch('AA9 9AA', 'aol', '','en')).resolves.toEqual(results.data);
  });

  test('Should return no courts and log error', async () => {
    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.postcodeServiceAreaSearch('AA9 9AA', 'aol', '','en')).resolves.toEqual({ courts: [], error: true });
    await expect(spy).toBeCalled();
  });

  test('Should return list of court from a postcode search', async () => {
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

    await expect(api.postcodeAreaSearch('AA9 9AA', 'en')).resolves.toEqual(results.data);
  });

  test('Should return no courts from a postcode search and log error', async () => {
    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.postcodeAreaSearch('AA9 9AA', 'en')).resolves.toEqual({ courts: [], error: true });
    await expect(spy).toBeCalledTimes(1);
  });

  test('Should return list of court from a court name prefix search', async () => {
    const results = {
      data: [
        {
          name: 'Yarl\'s Wood Immigration and Asylum Hearing Centre',
          slug: 'yarls-wood-immigration-and-asylum-hearing-centre',
          updatedAt: '11 Feb 2021'
        },
        {
          name: 'Yeovil County, Family and Magistrates\' Court',
          slug: 'yeovil-county-family-and-magistrates-court',
          updatedAt: '26 Feb 2021'
        }
      ]
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.courtPrefixSearch('Y')).resolves.toEqual(results.data);
  });

  test('Should return no courts from a court name prefix search and log error', async () => {
    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.courtPrefixSearch('A')).resolves.toEqual({ results: [], error: true });
    await expect(spy).toBeCalledTimes(1);
  });

  test('Should return list of court from a court types search', async () => {

    const results = {
      data: [
        {
          name: 'London',
          slug: 'London',
          address: 'Address Street',
          'townName': 'AAA',
          postcode: 'AAA AAA',
          types: [
            'Family Court',
            'County Court'
          ]
        },
        {
          name: 'Birmingham',
          slug: 'Birmingham',
          address: 'Address Street',
          'townName': 'AAA',
          postcode: 'AAA AAA',
          types: [
            'Family Court',
            'County Court'
          ]
        }
      ]
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.courtTypesSearch('family,county')).resolves.toEqual(results.data);
  });

  test('Should return no courts from a court types search and log error', async () => {
    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.courtTypesSearch('')).resolves.toEqual({ courts: [], error: true});
    await expect(spy).toBeCalledTimes(1);
  });


});
