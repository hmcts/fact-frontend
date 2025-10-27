import config from 'config';
import {
  AuthenticationResult,
  ClientCredentialRequest,
  ConfidentialClientApplication,
  Configuration,
  LogLevel,
  ManagedIdentityApplication,
  ManagedIdentityConfiguration,
  ManagedIdentityIdParams,
  ManagedIdentityRequestParams,
  NodeSystemOptions
} from '@azure/msal-node';
import {LoggerOptions} from '@azure/msal-common';


export class AuthGen {
  private AUDIENCE = 'api://AzureADTokenExchange';

  // will be the fact-demo-mi ID
  private azureClientId: string = process.env.AZURE_CLIENT_ID;
  private azureTenantId: string = process.env.AZURE_TENANT_ID;

  // fact-data-api-non-prod app reg id
  private serviceAppRegId: string = config.get('poc.serviceAppRegId');
  // fact-admin-frontend-non-prod app reg id
  private clientAppRegId: string = config.get('poc.clientAppRegId');
  // fact-admin-frontend-non-prod app reg secret
  private clientAppSecret: string = config.get('poc.clientAppSecret');

  public async generateTokenFromMI(): Promise<string> {
    const config: Configuration = await this.createConfig();
    const confidentialClientApplication = new ConfidentialClientApplication(
      config
    );

    const request: ClientCredentialRequest = {
      scopes: [`app://${this.serviceAppRegId}/.default`]/*,
      azureRegion: AZURE_REGION,*/
    };

    // ---------- get token response ----------

    const token = await this.getAccessTokenForServiceApp(
      confidentialClientApplication,
      request
    );

    return token.accessToken;
  }


  public async generateTokenFromClientSecret(): Promise<string> {
    const confidentialClientApplication = new ConfidentialClientApplication({
      auth: {
        clientId: this.clientAppRegId,
        authority: `https://login.microsoftonline.com/${this.azureTenantId}`,
        clientSecret: this.clientAppSecret
      }, system: {
        loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
            if (!containsPii) {
              console.log(message);
            }
          },
          piiLoggingEnabled: false,
          logLevel: LogLevel.Verbose
        }
      }
    });

    const request: ClientCredentialRequest = {
      scopes: [`api://${this.serviceAppRegId}/.default`]/*,
      azureRegion: AZURE_REGION,*/
    };


    // ---------- get token response ----------

    const token = await confidentialClientApplication
      .acquireTokenByClientCredential(request);

    return token.accessToken;
  }


  private async createConfig(): Promise<Configuration> {
    const clientAssertion: string = await this.getAccessTokenFromManagedIdentity();
    return {
      auth: {
        clientId: this.clientAppRegId,
        authority: `https://login.microsoftonline.com/${this.azureTenantId}`,
        clientAssertion: clientAssertion,
      },
    };
  }

  private async getAccessTokenFromManagedIdentity(): Promise<string> {
    const config: ManagedIdentityConfiguration = {
      managedIdentityIdParams: {
        userAssignedClientId: this.azureClientId
        // userAssignedObjectId: this.azureClientId,
        // userAssignedResourceId: this.azureClientId
      } as ManagedIdentityIdParams,
      system: {
        loggerOptions: {
          logLevel: LogLevel.Verbose,
        } as LoggerOptions,
      } as NodeSystemOptions,
    };
    const managedIdentityApplication: ManagedIdentityApplication =
      new ManagedIdentityApplication(config);

    const managedIdentityRequestParams: ManagedIdentityRequestParams = {
      resource: this.AUDIENCE,
    };

    try {
      const tokenResponse: AuthenticationResult =
        await managedIdentityApplication.acquireToken(
          managedIdentityRequestParams
        );

      return tokenResponse.accessToken;
    } catch (error) {
      throw `Error acquiring token from the Managed Identity: ${error}`;
    }
  }

  private async getAccessTokenForServiceApp(
    confidentialClientApplication: ConfidentialClientApplication,
    request: ClientCredentialRequest
  ): Promise<AuthenticationResult> {
    let tokenResponse: AuthenticationResult | null = null;
    try {
      tokenResponse =
        await confidentialClientApplication.acquireTokenByClientCredential(
          request
        );
    } catch (error) {
      `Error acquiring token from the Confidential Client application: ${error}`;
    }

    if (!tokenResponse) {
      throw 'Token was not received from the Confidential Client';
    }

    return tokenResponse;
  }
}
