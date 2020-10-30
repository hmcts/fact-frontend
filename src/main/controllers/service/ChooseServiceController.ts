import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { ServicesData } from '../../interfaces/ServicesData';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { cloneDeep } from 'lodash';

@autobind
export class ChooseServiceController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const data: ServicesData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['choose-service']),
      path: '/services',
      results: [],
    };

    const areasOfLaw = await this.api.services();
    if (!isObjectEmpty(areasOfLaw)) {
      data.results = areasOfLaw;
    }
    res.render('choose-service', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'chooseService')) {
      const data: PageData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['choose-service']),
        path: '/services',
        errors: true,
        results: [],
      };

      const chosenService = await this.api.services();
      if (!isObjectEmpty(chosenService)) {
        data.results = chosenService;
      }
      return res.render('choose-service', data);
    }

    if (req.body.chooseService as string === 'serviceChosen1') {
      return res.redirect('/services/Money/service-areas');
    } else if (req.body.chooseService as string === 'serviceChosen2') {
      return res.redirect('/services/Probate, divorce or ending civil partnerships/service-areas');
    } else if (req.body.chooseService as string === 'serviceChosen3') {
      return res.redirect('/services/Childcare and parenting/service-areas');
    } else if (req.body.chooseService as string === 'serviceChosen4') {
      return res.redirect('/services/Harm and abuse/service-areas');
    } else if (req.body.chooseService as string === 'serviceChosen6') {
      return res.redirect('/services/Crime/service-areas');
    } else {
      return res.redirect('/');
    }
  }
}
