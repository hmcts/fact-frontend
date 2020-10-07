import { healthOptions } from '../../../../main/utils/healthOptions';
import config from 'config';

const mockResponseGood = () => {
  const res: any = {
    body: {
      status: 'good',
    },
  };
  return res;
};

const mockResponseNotGood = () => {
  const res: any = {
    body: {
      status: 'not good',
    },
  };
  return res;
};

describe('healthOptions', () => {
  test('Should return health options if status is good', async () => {
    const res: any = mockResponseGood();
    const results: any = healthOptions();
    expect(results).toBeTruthy();
    expect(results.timeout).toBe(config.get('health.timeout'));
    expect(results.deadline).toBe(config.get('health.deadline'));

    console.log = jest.fn();
    const healthResponse: string = await results.callback(null, res);
    expect(healthResponse).toStrictEqual({ status: 'UP' });
  });

  test('Should return health options with error', async () => {
    const res: any = mockResponseGood();
    const results: any = healthOptions();
    expect(results).toBeTruthy();
    expect(results.timeout).toBe(config.get('health.timeout'));
    expect(results.deadline).toBe(config.get('health.deadline'));

    console.log = jest.fn();
    await results.callback(new Error('error'), res);
    expect(console.log).toBeCalledWith('Health check failed!');
  });

  test('Should return health check down if status is not good', async () => {
    const res: any = mockResponseNotGood();
    const results: any = healthOptions();
    expect(results).toBeTruthy();
    expect(results.timeout).toBe(config.get('health.timeout'));
    expect(results.deadline).toBe(config.get('health.deadline'));

    console.log = jest.fn();
    const healthResponse: string = await results.callback(null, res);
    expect(healthResponse).toStrictEqual({ status: 'DOWN' });
  });
});
