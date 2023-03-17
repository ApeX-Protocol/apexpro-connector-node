import { ClientConfig, ENV, PROD } from './Constant';

import { asEcKeyPair, asSimpleKeyPair, setConfig, setCurrency, setSymbols } from './starkex-lib';
import {
  AccountObject,
  ApiKeyCredentials,
  ApiTool,
  Clock,
  CurrencyObject,
  getPrecision,
  KeyPair,
  PerpetualContractObject,
  SymbolInfoObject,
  UserObject,
} from './apexpro';
import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';

export class ApexClient {
  apiTool: ApiTool;
  publicApi: PublicApi;
  privateApi: PrivateApi;
  clientConfig: ClientConfig;
  env: ENV;
  user: UserObject;
  account: AccountObject;
  symbols: { [key: string]: SymbolInfoObject };
  currency: CurrencyObject[];

  constructor(env: ENV = PROD) {
    this.apiTool = new ApiTool(env);
    this.publicApi = new PublicApi(this.apiTool);
    this.env = env;
  }

  async init(apiKeyCredentials: ApiKeyCredentials, startPrivateKey: string | KeyPair, accountId: string) {
    const clientConfig = new ClientConfig();
    clientConfig.apiTool = this.apiTool;
    clientConfig.networkId = this.env.networkId;
    clientConfig.accountId = accountId;
    clientConfig.apiKeyCredentials = apiKeyCredentials;
    clientConfig.starkKeyPair = asSimpleKeyPair(asEcKeyPair(startPrivateKey));
    clientConfig.clock = new Clock();
    this.privateApi = new PrivateApi(clientConfig);

    await this.initClock(clientConfig);
    await this.initConfig();
  }

  private async initClock(clientConfig: ClientConfig) {
    this.clientConfig = clientConfig;
    const { time } = await this.publicApi.time();
    this.clientConfig.clock.setTimestampAdjustment(time - new Date().getTime());
  }

  private async initConfig() {
    this.user = await this.privateApi.user();
    this.account = await this.privateApi.getAccount(this.clientConfig.accountId, this.user.ethereumAddress);
    const symbols: { [key: string]: PerpetualContractObject } = {};
    const { perpetualContract: groupSymbols = [], currency, multiChain, global } = await this.publicApi.symbols();
    if (groupSymbols.length) {
      groupSymbols.forEach((obj: PerpetualContractObject, idx: number) => {
        const symbolInfo: SymbolInfoObject = {
          ...obj,
        };
        symbolInfo.rankIdx = idx;
        symbolInfo.pricePrecision = getPrecision(obj.tickSize);
        symbolInfo.priceStep = Number(obj.tickSize);
        symbolInfo.sizePrecision = getPrecision(obj.stepSize);
        symbolInfo.sizeStep = Number(obj.stepSize);
        symbolInfo.baseCoin = obj.settleCurrencyId;
        symbolInfo.currentCoin = obj.underlyingCurrencyId;
        const baseCoinInfo: CurrencyObject =
          currency.find((item: CurrencyObject) => item.id === symbolInfo.baseCoin) || ({} as CurrencyObject);
        const currentCoinInfo: CurrencyObject =
          currency.find((item: CurrencyObject) => item.id === symbolInfo.currentCoin) || ({} as CurrencyObject);
        symbolInfo.baseCoinPrecision = Math.abs(Math.log10(Number(baseCoinInfo.showStep) || 1));
        symbolInfo.baseCoinRealPrecision = Math.abs(Math.log10(Number(baseCoinInfo.stepSize) || 1));
        symbolInfo.currentCoinPrecision = Math.abs(Math.log10(Number(currentCoinInfo.stepSize) || 1));
        symbolInfo.baseCoinIcon = baseCoinInfo.iconUrl;
        symbolInfo.currentCoinIcon = currentCoinInfo.iconUrl;
        symbols[obj.symbol] = symbolInfo;
      });
    }
    this.symbols = symbols;
    this.currency = currency;
    setSymbols(symbols);
    setCurrency(currency);
    setConfig({
      multiChain,
      global,
      currency,
    });
  }
}
