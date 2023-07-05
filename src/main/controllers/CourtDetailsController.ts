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
  /**
   * GET /get
   * redirects to the court details page.
   * @params slug string,
   */
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

          this.imageHandler(courtDetails);

          viewData.seoMetadata = generatePlaceMetadata(courtDetails);
          viewData.seoMetadataDescription = (viewData.seoMetadataDescription as string).replace('{courtName}', courtDetails.name);
          viewData.results = {...courtDetails, enquiries};

          if (courtDetails['in_person']) {
            return res.render('court-details/in-person-court', viewData);
          } else {
            this.setNotInPersonP1(req, courtDetails, viewData);
            return res.render('court-details/not-in-person-court', viewData);
          }
        } else {
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
  /**
   * GET /imageHandler
   * retrieves the court image.
   * @params courtDetails CourtDetailsResult,
   */
  private imageHandler(courtDetails: CourtDetailsResult): void {
    if (courtDetails['image_file']) {
      courtDetails['image_file'] = config.get('services.image-store.url') + '/' + courtDetails['image_file'];
    }
  }
  /**
   * getIntroParagraph
   * retrieves the court image.
   * @params courtDetails CourtDetailsResult,
   */
  private getIntroParagraph(req: FactRequest, courtDetails: CourtDetailsResult): string {
    return req.lng == 'en' ? courtDetails.service_centre.intro_paragraph : courtDetails.service_centre.intro_paragraph_cy;
  }
  /**
   * replaceCatchmentAndServiceArea
   * replaces the catchmentArea and serviceArea with the relevant types.
   * @params viewData CourtDetailsData, courtDetails CourtDetailsResult,
   */
  private replaceCatchmentAndServiceArea(viewData: CourtDetailsData, courtDetails: CourtDetailsResult): string {
    return viewData.notInPersonP1
      .replace('{catchmentArea}', decideCatchmentArea(this.regionalCentre, viewData.catchmentArea))
      .replace('{serviceArea}', formatAreasOfLaw(courtDetails['areas_of_law']));
  }
  /**
   * setNotInPersonP1
   * set the relevant not in person flags for the court.
   * @params viewData CourtDetailsData, courtDetails CourtDetailsResult,
   */
  public setNotInPersonP1(req: FactRequest, courtDetails: CourtDetailsResult, viewData: CourtDetailsData): void {
    if (courtDetails['service_centre']) {
      if (courtDetails.service_centre.intro_paragraph.length > 0) {
        viewData.notInPersonP1 = this.getIntroParagraph(req, courtDetails);
      } else {
        viewData.notInPersonP1 = this.replaceCatchmentAndServiceArea(viewData, courtDetails);
      }
    } else {
      viewData.notInPersonP1 = this.replaceCatchmentAndServiceArea(viewData, courtDetails);
    }
  }
}
