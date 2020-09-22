import axios, { AxiosResponse, AxiosError } from 'axios';
import config from 'config';

export class FactApi {
  static search(query: string): Promise<[]> {
    const fixedUrl = `${config.get('services.api.url')}/courts?search=${query}`;
    return axios
      .get(fixedUrl)
      .then((results: AxiosResponse) => {
        return results.data;
      })
      .catch((err: AxiosError) => {
        console.log(err);
        return [];
      });
  }
}
