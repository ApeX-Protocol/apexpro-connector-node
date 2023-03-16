import { KeyPair } from './starkex-lib';
import { ApiKeyCredentials, ApiTool, Clock } from './apexpro';

export class ClientConfig {
  public apiKeyCredentials: ApiKeyCredentials;
  public starkKeyPair: KeyPair;
  public clock: Clock;
  public apiTool: ApiTool;
  public networkId: number;
  public accountId: string;
}

export class ENV {
  url: string;
  networkId: number;

  constructor(url: string, networkId: number) {
    this.url = url;
    this.networkId = networkId;
  }
}

export const PROD = new ENV('https://pro.apex.exchange', 1);

export const QA = new ENV('https://qa.pro.apex.exchange', 5);
