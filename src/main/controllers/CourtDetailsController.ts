import { FactRequest } from '../interfaces/FactRequest';
import { Response } from 'express';
import { FactApi } from '../utils/FactApi';
import { isEmpty } from '../utils/validation';
import autobind from 'autobind-decorator';
import { Enquiries } from '../interfaces/Enquiries';
import { CourtDetailsData } from '../interfaces/CourtDetailsData';
import config from 'config';

@autobind
export class CourtDetailsController {

  //TODO this comes into place when the user comes from a no name court search
  private regionalCentre = false;

  constructor(
      private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const slug: string = req.params.slug as string;
    const data: CourtDetailsData = {
      ...req.i18n.getDataByLanguage(req.lng)['court-details'],
      path: '/individual-location-pages/courts',
      results: [],
      errors: false,
    };

    if (!isEmpty(slug)) {
      const courts: any = await this.api.court(slug);
      if (courts) {
        const enquiries: Enquiries = {
          phone: [],
          email: {},
          fax: {}
        };
        enquiries.phone = courts.contacts.filter((contact: { description: string }) => contact.description.toLowerCase() === 'enquiries');
        enquiries.email = courts.emails.find((email: { description: string }) => email.description.toLowerCase() === 'enquiries');
        enquiries.fax = courts.contacts.find((contact: { description: string }) => contact.description.toLowerCase() === 'fax');
        courts['image_file'] = `${config.get('services.image-store.url')}/${courts['image_file']}`;
        data.notInPersonP1 = data.notInPersonP1
          .replace('{catchmentArea}', this.getCatchmentArea(this.regionalCentre, data.catchmentArea))
          .replace('{serviceArea}', courts['service_area']);
        data.results = { ...courts, enquiries };
      }
    } else {
      data.errors = true;
    }
    if (('in_person' in data.results) && data.results['in_person']) {
      return res.render('court-details/in-person-court', data);
    } else {
      return res.render('court-details/not-in-person-court', data);
    }
  }
  
  private getCatchmentArea(regionalCentre: boolean, area: { area1: string; area2: string }) {
    return regionalCentre ? area.area1 : area.area2;
  }
}
