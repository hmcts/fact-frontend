import { Logger } from '../interfaces/Logger';
import { AxiosInstance } from 'axios';
import { SearchResult } from '../interfaces/SearchResultsData';
import { CourtDetailsResult } from '../interfaces/CourtDetailsData';
import { AreaOfLawData } from '../interfaces/AreaOfLawData';
import { MoneyAreaOfLawData } from '../interfaces/MoneyAreaOfLawData';
import { FamilyAreaOfLawData } from '../interfaces/FamilyAreaOfLawData';

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

  public services(): Promise<AreaOfLawData[]> {
    return this.axios
      .get('/services')
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public moneyAreaOfLaw(): Promise<MoneyAreaOfLawData[]> {
    return this.axios
      .get('/services/money/service-areas')
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public familyAreaOfLaw(): Promise<FamilyAreaOfLawData[]> {
    return this.axios
      .get('/services/family/service-areas')
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }
}
