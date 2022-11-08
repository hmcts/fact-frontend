import { FactRequest } from '../interfaces/FactRequest';
import { NextFunction, Response } from 'express';
import { FactApi } from '../utils/FactApi';
import {
  decideCatchmentArea,
  filterByDescription,
  formatAreasOfLaw
} from '../utils/CourtDetailsUtils';
import { isEmpty, isObjectEmpty } from '../utils/validation';
import autobind from 'autobind-decorator';
import { Enquiries } from '../interfaces/Enquiries';
import { CourtDetailsData, CourtDetailsResult } from '../interfaces/CourtDetailsData';
import config from 'config';
import { cloneDeep } from 'lodash';
import { generatePlaceMetadata } from '../utils/SEOMetadata';
@autobind
export class CourtDetailsController {

  private regionalCentre = false;

  constructor(
      private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response, next: NextFunction) {
    const slug: string = req.params.slug;

    if(!isEmpty(slug)) {
      const courtDetails: CourtDetailsResult = await this.api.court(slug, req.lng);

      if(!isObjectEmpty(courtDetails)) {
        if (courtDetails.open) {
          const viewData: CourtDetailsData = cloneDeep(req.i18n.getDataByLanguage(req.lng)['court-details']) as CourtDetailsData;
          viewData.title = viewData.title.replace('{courtName}', courtDetails.name);
          viewData.path = '/courts/' + slug;

          const enquiries: Enquiries = {
            phone: filterByDescription(courtDetails.contacts, ['enquiries', 'ymholidau']),
            welshPhone: filterByDescription(courtDetails.contacts, ['welsh', 'cymraeg']),
            emails: filterByDescription(courtDetails.emails, ['enquiries', 'ymholidau']),
            fax: filterByDescription(courtDetails.contacts, ['fax', 'ffacs']),
            sendDocumentsEmail: filterByDescription(courtDetails.emails, ['send documents', 'anfon dogfennau']),
          };

          this.handleImageFile(courtDetails);

          viewData.seoMetadata = generatePlaceMetadata(courtDetails);
          viewData.seoMetadataDescription = (viewData.seoMetadataDescription as string).replace('{courtName}', courtDetails.name);
          viewData.results = {...courtDetails, enquiries};

          this.handleRender(req, res, viewData, courtDetails);
        }
        else {
          const viewData: any = cloneDeep(req.i18n.getDataByLanguage(req.lng)['closed-court']);
          viewData.title = viewData.title.replace('{courtName}', courtDetails.name);
          viewData.name = courtDetails.name;
          viewData.path = '/courts/' + slug;
          return res.render('court-details/closed-court',  viewData);
        }
      }
    }
    next();
  }

  private handleRender(req: FactRequest, res: Response, viewData: CourtDetailsData, courtDetails: CourtDetailsResult): void {
    if (courtDetails['in_person']) {
      return res.render('court-details/in-person-court', viewData);
    }
    else
    {
      courtDetails['service_centre'] ?
        viewData.notInPersonP1 = courtDetails.service_centre.intro_paragraph.length > 0 ?
          this.chooseLanguage(req, courtDetails) :
          this.replaceCatchmentAndServiceArea(viewData, courtDetails) :
        viewData.notInPersonP1 = this.replaceCatchmentAndServiceArea(viewData, courtDetails);

      return res.render('court-details/not-in-person-court', viewData);
    }
  }

  private handleImageFile(courtDetails: CourtDetailsResult): void {
    if (courtDetails['image_file']) {
      courtDetails['image_file'] = config.get('services.image-store.url') + '/' + courtDetails['image_file'];
    }
  }

  private chooseLanguage(req: FactRequest, courtDetails: CourtDetailsResult): string {
    return req.lng == 'en' ? courtDetails.service_centre.intro_paragraph : courtDetails.service_centre.intro_paragraph_cy;
  }

  private replaceCatchmentAndServiceArea(viewData: CourtDetailsData, courtDetails: CourtDetailsResult): string {
    return viewData.notInPersonP1
      .replace('{catchmentArea}', decideCatchmentArea(this.regionalCentre, viewData.catchmentArea))
      .replace('{serviceArea}', formatAreasOfLaw(courtDetails['areas_of_law']));
  }
}
