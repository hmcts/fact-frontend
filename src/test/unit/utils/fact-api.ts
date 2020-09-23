import { FactApi } from '../../../main/utils/fact-api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FactApi', () => {
  test('Should return results from get request', async () => {
    const results: { data: {}[]} = {
      data: [{
        name: 'London',
        slug: 'London',
        address: 'Address Street',
        'town_name': 'AAA',
        postcode: 'AAA AAA',
      }],
    };
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(results));

    await expect(FactApi.search('London')).resolves.toEqual(results.data);
  });
});
