import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';
import { ClientConfig, ENV, PROD } from './Constant';
import { Clock } from './tool/Clock';
import { AccountObject, ApiKeyCredentials, UserObject } from './interface';
import { ApiTool } from './tool/ApiTool';
import {ZkLinkSigner, getZkLinkSigner, initZk} from '../ZKProxy';
import { getSymbolsWithBaseInfo } from './tool/Tool';

export class ApexClientOmni {
  apiTool: ApiTool;
  publicApi: PublicApi;
  privateApi: PrivateApi;
  clientConfig: ClientConfig;
  env: ENV;
  user: UserObject;
  account: AccountObject;
  signer: ZkLinkSigner;
  symbols: { [key: string]: any };

  private seed: string

  constructor(env: ENV = PROD) {
    this.env = env;
    this.apiTool = new ApiTool(env);
    this.publicApi = new PublicApi(this.apiTool);
  }

  async init(apiKeyCredentials: ApiKeyCredentials, seed: string) {
    const clientConfig = new ClientConfig();
    clientConfig.apiTool = this.apiTool;
    clientConfig.networkId = this.env.networkId;
    clientConfig.clock = new Clock();
    clientConfig.apiKeyCredentials = apiKeyCredentials;
    clientConfig.client = this

    this.clientConfig = clientConfig;
    this.seed = seed;
    await initZk();
    this.initZkSigner()

    this.privateApi = new PrivateApi(clientConfig);

    await this.initClock(clientConfig);
    await this.initConfig(clientConfig);
  }

  public initZkSigner() {
    const signer = getZkLinkSigner().ethSig(this.seed);
    this.signer = signer
    this.clientConfig.signer = this.signer

    return signer
  }

  private async initClock(clientConfig: ClientConfig) {
    const { time } = await this.publicApi.time();
    this.clientConfig.clock.setTimestampAdjustment(time - new Date().getTime());
  }

  private async initConfig(clientConfig: ClientConfig) {
    this.user = await this.privateApi.user();
    if(!this.user?.ethereumAddress) throw new Error('Ethereum address is not found');
    this.account = await this.privateApi.getAccount(this.clientConfig.accountId, this.user?.ethereumAddress);
    clientConfig.zkAccountId = this.account.spotAccount.zkAccountId
    clientConfig.accountId = this.account.id;

    this.checkAccountId();
    // this.checkL2Key();
    await this.initSymbol();
  }

  private checkAccountId() {
    if (this.account.id !== this.clientConfig.accountId) {
      throw new Error('Account Id is not match, please check your account id.');
    }
  }

  private checkL2Key() {
    // todo

  }

  private async initSymbol() {
    const { contractConfig } = await this.publicApi.symbols();
    const {
      perpetualContract: perpetual = [],
      tokens: tokens_contract,
      assets: assets_contract,
    } = contractConfig;
    const symbols_perpetual = getSymbolsWithBaseInfo(perpetual, assets_contract, tokens_contract, 'perpetual');

    this.symbols = symbols_perpetual
    return symbols_perpetual
  }

}
