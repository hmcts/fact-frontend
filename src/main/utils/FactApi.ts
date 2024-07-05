import { Logger } from '../interfaces/Logger';
import { AxiosInstance } from 'axios';
import { SearchCourtHistoryResult, SearchResult } from '../interfaces/SearchResultsData';
import { CourtDetailsResult } from '../interfaces/CourtDetailsData';
import { CourtWithDistance, PostcodeSearchResultsData } from '../interfaces/PostcodeResultsData';
import { ServiceResult } from '../interfaces/ServicesData';
import { ServiceAreaResult } from '../interfaces/ServiceAreasData';
import {CourtReference} from '../interfaces/CourtResultsData';

export class FactApi {

  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: Logger
  ) { }

  public search(query: string, lng: string): Promise<SearchResult[]> {
    return this.axios
      .get(`/courts?q=${query}`, {  headers: {'Accept-Language': lng}})
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
      .get(`/courts/court-history/search?q=${query}`, { headers: {'Accept-Language': lng}})
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
      .get(`/courts/${slug}`,{  headers: {'Accept-Language': lng}})
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
      .get('/services', {  headers: {'Accept-Language': lng}})
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
      .get(`/services/${slug}`, {  headers: {'Accept-Language': lng}})
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
      .get(`/services/${service}/service-areas`, {  headers: {'Accept-Language': lng}})
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
      .get(`/service-areas/${serviceArea}`, {  headers: {'Accept-Language': lng}})
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
      .get(`search/results?postcode=${postcode}&serviceArea=${serviceAreaSlug}&action=${action}`, {  headers: {'Accept-Language': lng}})
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
      .get(`search/results/${postcode}`, {  headers: {'Accept-Language': lng}})
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
