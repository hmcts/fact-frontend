import { FactRequest } from '../interfaces/FactRequest';
import { NextFunction, Response } from 'express';
import { FactApi } from '../utils/FactApi';
import {
  decideCatchmentArea,
  filterAdditionalLinks,
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
import { SidebarLocation } from '../utils/SidebarLocation';

@autobind
export class CourtDetailsController {

  //TODO this comes into place when the user comes from a no name court search
  private regionalCentre = false;

  constructor(
      private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response, next: NextFunction) {
    const slug: string = req.params.slug as string;

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

          if (courtDetails['image_file']) {
            courtDetails['image_file'] = config.get('services.image-store.url') + '/' + courtDetails['image_file'];
          }

          viewData.seoMetadata = generatePlaceMetadata(courtDetails);
          viewData.seoMetadataDescription = (viewData.seoMetadataDescription as string).replace('{courtName}', courtDetails.name);
          const additionalLinks = {
            thisLocationHandles: filterAdditionalLinks(courtDetails.additional_links, SidebarLocation.ThisLocationHandles),
            findOutMoreAbout: filterAdditionalLinks(courtDetails.additional_links, SidebarLocation.FindOutMoreAbout)
          };
          viewData.results = { ...courtDetails, enquiries, additionalLinks };

          if (courtDetails['in_person']) {
            return res.render('court-details/in-person-court', viewData);
          } else {
            viewData.notInPersonP1 = viewData.notInPersonP1
              .replace('{catchmentArea}', decideCatchmentArea(this.regionalCentre, viewData.catchmentArea))
              .replace('{serviceArea}', formatAreasOfLaw(courtDetails['areas_of_law']));

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
}
