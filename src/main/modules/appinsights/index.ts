import config from 'config';
const appInsights = require('applicationinsights');

export class AppInsights {

  enableFor(): void {
    if (config.get('appInsights.instrumentationKey')) {
      appInsights.setup(config.get('appInsights.instrumentationKey'))
        .setSendLiveMetrics(true)
        .start();

      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'Frontend';
      appInsights.defaultClient.trackTrace({message: 'App insights activated'});
    }
  }
}
