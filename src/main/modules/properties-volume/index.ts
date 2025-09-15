import { spawnSync } from 'child_process';
import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(server: Application): void {
    if (server.locals.ENV !== 'development') {
      propertiesVolume.addTo(config);
      
      console.log('First IF: ' + server.locals.ENV);

      this.setSecret('secrets.fact.AppInsightsInstrumentationKey-ai', 'appInsights.instrumentationKey');
    } else {
      console.log('Second IF: ' + server.locals.ENV);
      
      this.setLocalSecret('AppInsightsInstrumentationKey-ai', 'appInsights.instrumentationKey');
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
