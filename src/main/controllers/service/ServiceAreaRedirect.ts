import { ServiceAreaResult } from '../../interfaces/ServiceAreasData';
import { Action } from '../../utils/Action';
import { Catchment } from '../../utils/Catchment';

export class ServiceAreaRedirect {

  private readonly actionOrdering = {
    [Action.Nearest]:       [Catchment.Local, Catchment.Regional, Catchment.National],
    [Action.SendDocuments]: [Catchment.Regional, Catchment.National, Catchment.Local],
    [Action.Update]:        [Catchment.National, Catchment.Regional, Catchment.Local],
    [Action.NotListed]:     [Catchment.National, Catchment.Regional, Catchment.Local],
  };
  /**
   * GET /getUrl/:service/:serviceArea/:action
   * @returns redirect a service area to the correct page.
   * @param {string} service
   * @param {ServiceAreaResult}serviceArea
   * @param {Action} action
   */
  public getUrl(service: string, serviceArea: ServiceAreaResult, action: Action): string {
    const serviceAreaCatchments = serviceArea.serviceAreaCourts.map(c => c.catchmentType);
    const sortFunction = this.getSortForAction(action);
    const preferredCourts = [...serviceAreaCatchments].sort(sortFunction);

    if (preferredCourts[0] === Catchment.National) {
      return `/services/${service}/${serviceArea.slug}/search-results`;
    } else {
      return `/services/${service}/${serviceArea.slug}/${action}/search-by-postcode`;
    }
  }
  /**
   * GET /getSortForAction/:action
   * @returns redirect a service area to the correct page.
   * @param {Action} action
   */
  private getSortForAction(action: Action) {
    return (a: Catchment, b: Catchment) => {
      return this.actionOrdering[action].indexOf(a) -  this.actionOrdering[action].indexOf(b);
    };
  }

}
