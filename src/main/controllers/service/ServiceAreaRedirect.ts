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
   * redirect a service area to the correct page.
   * @params service String, serviceArea ServiceAreaResult, action Action
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
   * redirect a service area to the correct page.
   * @params action Action
   */
  private getSortForAction(action: Action) {
    return (a: Catchment, b: Catchment) => {
      return this.actionOrdering[action].indexOf(a) -  this.actionOrdering[action].indexOf(b);
    };
  }

}
