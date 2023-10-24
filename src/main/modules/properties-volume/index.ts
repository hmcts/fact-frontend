import { execSync } from 'child_process';
import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);

      this.setSecret('secrets.fact.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
    } else {
      this.setLocalSecret('AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

  private setLocalSecret(secret: string, toPath: string): void {
    // Load a secret from the AAT vault using azure cli
    const result = execSync('az keyvault secret show --vault-name fact-aat -o tsv --query value --name ' + secret);
    set(config, toPath, result.toString().replace('\n', ''));
  }
}
