import { FactRequest } from '../interfaces/FactRequest';
import { Response } from 'express';
import { FactApi } from '../utils/FactApi';
import { isEmpty } from '../utils/validation';
import autobind from 'autobind-decorator';
import { PageData } from '../interfaces/PageData';
import { Enquiries } from '../interfaces/Enquiries';

@autobind
export class CourtDetailsController {

  constructor(
      private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const slug: string = req.params.slug as string;
    const data: PageData = {
      ...req.i18n.getDataByLanguage(req.lng)['court-details'],
      path: '/individual-location-pages/courts',
      results: [],
      errors: false,
    };

    if (!isEmpty(slug)) {
      const courts: any = await this.api.court(slug);
      if (courts) {
        const enquiries: Enquiries = {
          phone: '',
          email: ''
        };
        enquiries.email = courts.emails.find((email: { description: string }) => email.description.toLowerCase() === 'enquiries');
        enquiries.phone = courts.contacts.find((contact: { description: string }) => contact.description.toLowerCase() === 'enquiries');
        data.results = { ...courts, enquiries };
      }
    } else {
      data.errors = true;
    }

    res.render('court-details', data);
  }
}
