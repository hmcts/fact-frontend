import { Logger } from '../interfaces/Logger';
import { AxiosInstance } from 'axios';
import { SearchResult } from '../interfaces/SearchResultsData';
import { CourtDetailsResult } from '../interfaces/CourtDetailsData';
import { ServicesData } from '../interfaces/ServicesData';
import { ServiceData } from '../interfaces/ServiceData';

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

  public court(slug: string): Promise<CourtDetailsResult> {
    return this.axios
      .get(`/courts/${slug}`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {};
      });
  }

  public services(): Promise<ServicesData[]> {
    return this.axios
      .get('/services')
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public serviceAreas(service: string): Promise<ServiceData[]> {
    return this.axios
      .get(`/services/${service}/service-areas`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

}
