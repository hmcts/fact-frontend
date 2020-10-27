import config from 'config';
import * as propertiesVolume from '@hmcts/properties-volume';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {

  enableFor(server: Application) {
    if (server.locals.ENV !== 'development') {
      propertiesVolume.addTo(config);

      set(config, 'applicationInsights.instrumentationKey', get(config, 'secrets.fact.AppInsightsInstrumentationKey'));
    }
  }
}
