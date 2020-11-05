import { Logger } from '../interfaces/Logger';
import { AxiosInstance } from 'axios';
import { SearchResult } from '../interfaces/SearchResultsData';
import { CourtDetailsResult } from '../interfaces/CourtDetailsData';
import { ServiceResult } from '../interfaces/ServicesData';
import { ServiceAreaResult } from '../interfaces/ServiceAreasData';

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

  public services(): Promise<ServiceResult[]> {
    return this.axios
      .get('/services')
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public getService(slug: string): Promise<ServiceResult> {
    return this.axios
      .get(`/services/${slug}`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {};
      });
  }

  public serviceAreas(service: string): Promise<ServiceAreaResult[]> {
    return this.axios
      .get(`/services/${service}/service-areas`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public courtsInServiceAreas(service: string, serviceArea: string): Promise<CourtDetailsResult[]> {
    return this.axios
      .get(`/courts/${service}/${serviceArea}`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public getServiceArea(service: string, serviceArea: string): Promise<ServiceAreaResult> {
    return this.axios
      .get(`/services/${service}/${serviceArea}`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

}
