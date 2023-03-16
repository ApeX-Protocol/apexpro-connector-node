import { ClientConfig, ENV, PROD } from './Constant';

import { asEcKeyPair, asSimpleKeyPair, setConfig, setCurrency, setSymbols } from './starkex-lib';
import { ApiKeyCredentials, ApiTool, Clock, CurrencyObject, getPrecision, KeyPair } from './apexpro';
import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';

export class ApexClient {
  apiTool: ApiTool;
  publicApi: PublicApi;
  privateApi: PrivateApi;
  clientConfig: ClientConfig;
  env: ENV;

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
    const symbols: { [key: string]: any } = {};
    const { perpetualContract: groupSymbols = [], currency, multiChain, global } = await this.publicApi.symbols();
    if (groupSymbols.length) {
      groupSymbols.forEach((obj: { [key: string]: any }, idx: number) => {
        const symbolInfo: { [key: string]: any } = {
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
    setSymbols(symbols);
    setCurrency(currency);
    setConfig({
      multiChain,
      global,
      currency,
    });
  }
}
