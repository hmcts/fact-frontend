import { Logger } from '../interfaces/Logger';
import { AxiosInstance } from 'axios';
import { SearchResult } from '../interfaces/SearchResultsData';

export class FactApi {

  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: Logger
  ) { }

  public search(query: string): Promise<SearchResult[]> {
    return this.axios
      .get(`/courts?q=${query}`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public court(slug: string): Promise<SearchResult[]> {
    return this.axios
      .get(`/courts/${slug}`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {};
      });
  }
}
