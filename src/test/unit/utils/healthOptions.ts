import { healthOptions } from '../../../main/utils/healthOptions';
import config from 'config';

describe('healthOptions', () => {
  test('Should return health options', async () => {
    const results: any = healthOptions();
    expect(results).toBeTruthy();
    expect(results.timeout).toBe(config.get('health.timeout'));
    expect(results.deadline).toBe(config.get('health.deadline'));
  });
});
