import {spawnSync} from 'child_process';
import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import {Application} from 'express';
import {get, set} from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);
      this.setSecret('secrets.fact.AppInsightsInstrumentationKey-ai', 'appInsights.instrumentationKey');
      this.setSecret('secrets.fact.poc-service-app-reg-id', 'poc.serviceAppRegId');
      this.setSecret('secrets.fact.poc-client-app-reg-id', 'poc.clientAppRegId');
      this.setSecret('secrets.fact.poc-client-app-secret', 'poc.clientAppSecret');
    } else {
      this.setLocalSecret('AppInsightsInstrumentationKey-ai', 'appInsights.instrumentationKey');
      // a custom env should be able to set this stuff up rather than polluting aat with secrets
      // this.setLocalSecret('poc-service-app-reg-id', 'poc.serviceAppRegId');
      // this.setLocalSecret('poc-client-app-reg-id', 'poc.clientAppRegId');
      // this.setLocalSecret('poc-client-app-secret', 'poc.clientAppSecret');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

  private setLocalSecret(secret: string, toPath: string): void {
    // Load a secret from the AAT vault using azure cli
    const result = spawnSync('az', ['keyvault', 'secret', 'show', '--vault-name', 'fact-aat', '-o', 'tsv', '--query', 'value', '--name', secret], {encoding: 'utf8'});
    set(config, toPath, encodeURI(result.stdout.replace('\n', '')));
  }
}
