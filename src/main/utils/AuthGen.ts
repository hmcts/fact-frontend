import config from 'config';
import {DefaultAzureCredential} from '@azure/identity';

export class AuthGen {
  private serviceAppRegId: string = config.get('services.api.app-id');

  public async generateTokenUsingDefaultAzureCredential(): Promise<string> {
    const cred = new DefaultAzureCredential();
    const token = await cred.getToken(`api://${this.serviceAppRegId}/.default`);
    return token.token;
  }
}
