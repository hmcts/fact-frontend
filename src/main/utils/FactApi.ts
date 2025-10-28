import {Logger} from '../interfaces/Logger';
import {AxiosInstance} from 'axios';
import {SearchCourtHistoryResult, SearchResult} from '../interfaces/SearchResultsData';
import {CourtDetailsResult} from '../interfaces/CourtDetailsData';
import {CourtWithDistance, PostcodeSearchResultsData} from '../interfaces/PostcodeResultsData';
import {ServiceResult} from '../interfaces/ServicesData';
import {ServiceAreaResult} from '../interfaces/ServiceAreasData';
import {CourtReference} from '../interfaces/CourtResultsData';
import {AuthGen} from './AuthGen';

export class FactApi {

  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: Logger
  ) {
  }

  private jwtDecode(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Invalid JWT token', error);
      return {aud: 'failed'};
    }
  }

  public async secureCallTestMI(auth: AuthGen): Promise<string> {
    const jwt = await auth.generateTokenFromMI();
    console.log(`aud: ${this.jwtDecode(jwt).aud}`);
    return this.axios
      .get('/secure/admin', {headers: {'Authorization': `Bearer ${jwt}`}})
      .then(result => result.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: {},
          error: true
        };
      });
  }

  // public async secureCallTestCS(auth: AuthGen): Promise<string> {
  //   const jwt = await auth.generateTokenFromClientSecret();
  //   return this.axios
  //     .get('/secure/admin', {headers: {'Authorization': `Bearer ${jwt}`}})
  //     .then(result => result.data)
  //     .catch(err => {
  //       this.logger.error(err);
  //       return {
  //         null: {},
  //         error: true
  //       };
  //     });
  // }


  public search(query: string, lng: string): Promise<SearchResult[]> {
    return this.axios
      .get(`/courts?q=${query}`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: [],
          error: true
        };
      });
  }

  public searchCourtNameHistory(query: string, lng: string): Promise<SearchCourtHistoryResult> {
    return this.axios
      .get(`/courts/court-history/search?q=${query}`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: [],
          error: true
        };
      });
  }

  public court(slug: string, lng: string): Promise<CourtDetailsResult> {
    return this.axios
      .get(`/courts/${slug}`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: [],
          error: true
        };
      });
  }

  public services(lng: string): Promise<ServiceResult[]> {
    return this.axios
      .get('/services', {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: [],
          error: true
        };
      });
  }

  public getService(slug: string, lng: string): Promise<ServiceResult> {
    return this.axios
      .get(`/services/${slug}`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: {},
          error: true
        };
      });
  }

  public serviceAreas(service: string, lng: string): Promise<ServiceAreaResult[]> {
    return this.axios
      .get(`/services/${service}/service-areas`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: [],
          error: true
        };
      });
  }

  public getServiceArea(serviceArea: string, lng: string): Promise<ServiceAreaResult> {
    return this.axios
      .get(`/service-areas/${serviceArea}`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          null: [],
          error: true
        };
      });
  }

  public postcodeServiceAreaSearch(postcode: string, serviceAreaSlug: string, action: string, lng: string): Promise<PostcodeSearchResultsData> {
    return this.axios
      .get(`search/results?postcode=${postcode}&serviceArea=${serviceAreaSlug}&action=${action}`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          courts: [],
          error: true
        };
      });
  }

  public postcodeAreaSearch(postcode: string, lng: string): Promise<Array<CourtWithDistance>> {
    return this.axios
      .get(`search/results/${postcode}`, {headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          courts: [],
          error: true
        };
      });
  }

  public courtPrefixSearch(prefix: string): Promise<Array<CourtReference>> {
    return this.axios
      .get(`courts/search?prefix=${prefix}`)
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          results: [],
          error: true
        };
      });
  }
}
