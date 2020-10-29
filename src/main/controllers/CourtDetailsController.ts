import { FactRequest } from '../interfaces/FactRequest';
import { NextFunction, Response } from 'express';
import { FactApi } from '../utils/FactApi';
import { isEmpty, isObjectEmpty } from '../utils/validation';
import autobind from 'autobind-decorator';
import { Enquiries } from '../interfaces/Enquiries';
import { CourtDetailsData, CourtDetailsResult } from '../interfaces/CourtDetailsData';
import config from 'config';

@autobind
export class CourtDetailsController {

  //TODO this comes into place when the user comes from a no name court search
  private regionalCentre = false;

  constructor(
      private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response, next: NextFunction) {
    const slug: string = req.params.slug as string;
    const data: CourtDetailsData = {
      ...req.i18n.getDataByLanguage(req.lng)['court-details'],
      path: '/courts/' + slug,
      results: {},
    };

    if (!isEmpty(slug)) {
      const courts: CourtDetailsResult = await this.api.court(slug);
      if (!isObjectEmpty(courts)) {
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
        if (courts['in_person']) {
          return res.render('court-details/in-person-court', data);
        } else {
          return res.render('court-details/not-in-person-court', data);
        }
      }
    }
    next();
  }
  
  private getCatchmentArea(regionalCentre: boolean, area: { area1: string; area2: string }) {
    return regionalCentre ? area.area1 : area.area2;
  }
}
