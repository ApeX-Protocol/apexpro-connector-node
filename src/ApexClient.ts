import { ClientConfig, ENV, PROD } from './Constant';

import { asEcKeyPair, asSimpleKeyPair, setConfig, setConfigV2, setCurrency, setCurrencyV2, setPerpetual, setSymbols, setSymbolsV2 } from './starkex-lib';
import {
  AccountObject,
  AccountsItem,
  ApiKeyCredentials,
  ApiTool,
  Clock,
  CurrencyObject,
  getPrecision,
  KeyPair,
  PerpetualContractObject,
  PerpetualCurrencyObject,
  SymbolInfoObject,
  UserObject,
} from './apexpro';
import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';

const genSymbolInfo = (groupSymbols, currency, symbols) => {
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
};

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
    setPerpetual('');
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
    this.checkAccountId();
    this.checkStarkKey();
    await this.initSymbol();
  }

  private async initSymbol() {
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

  private checkAccountId() {
    if (this.account.id !== this.clientConfig.accountId) {
      throw new Error('Account Id is not match, please check your account id.');
    }
  }

  private checkStarkKey() {
    let accountStarkPublicKey = this.account.starkKey.toLowerCase();
    if (!accountStarkPublicKey.startsWith('0x')) {
      accountStarkPublicKey = '0x' + accountStarkPublicKey;
    }
    let publicKey = this.clientConfig.starkKeyPair.publicKey;
    if (!publicKey.startsWith('0x')) {
      publicKey = '0x' + publicKey;
    }
    if (accountStarkPublicKey.toLowerCase() !== publicKey.toLowerCase()) {
      throw new Error('Stark Key is not match, please check your stark private key.');
    }
  }
}

export class ApexClientV2 {
  apiTool: ApiTool;
  publicApi: PublicApi;
  privateApi: PrivateApi;
  clientConfig: ClientConfig;
  env: ENV;
  user: UserObject;
  account: AccountObject;
  symbols: { [key: string]: SymbolInfoObject };
  currency: PerpetualCurrencyObject;

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

    setPerpetual('USDC')
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
    // update v2
    this.account = await this.privateApi.getAccountV2(this.clientConfig.accountId, this.user.ethereumAddress);
    this.checkAccountId();
    this.checkStarkKey();
    await this.initSymbol();
  }

  private async initSymbol() {
    const symbols: { [key: string]: PerpetualContractObject } = {};
    // update v2
    const { usdcConfig, usdtConfig } = await this.publicApi.symbolsV2();

    const {
      perpetualContract: usdcGroupSymbols = [],
      currency: usdcCurrency,
      multiChain: usdcMultichain,
      global: usdcGlobal,
    } = usdcConfig;
    const {
      perpetualContract: usdtGroupSymbols = [],
      currency: usdtCurrency,
      multiChain: usdtMultichain,
      global: usdtGlobal,
    } = usdtConfig;

    if (usdcGroupSymbols.length) {
      genSymbolInfo(usdcGroupSymbols, usdcCurrency, symbols);
    }

    if (usdcGroupSymbols.length) {
      genSymbolInfo(usdtGroupSymbols, usdtCurrency, symbols);
    }

    this.symbols = symbols;
    this.currency = {
      usdc: usdcCurrency,
      usdt: usdtCurrency,
    };
    setSymbolsV2(symbols);
    setCurrencyV2({ usdc: usdcCurrency, usdt: usdtCurrency });
    setConfigV2({
      usdc: {
        multichain: usdcMultichain,
        global: usdcGlobal,
        currency: usdcCurrency,
      },
      usdt: {
        multichain: usdtMultichain,
        global: usdtGlobal,
        currency: usdtCurrency,
      },
    });
  }

  private checkAccountId() {
    if (this.account.id !== this.clientConfig.accountId) {
      throw new Error('Account Id is not match, please check your account id.');
    }
  }

  private checkStarkKey() {
    let accountStarkPublicKey = this.account.starkKey.toLowerCase();
    if (!accountStarkPublicKey.startsWith('0x')) {
      accountStarkPublicKey = '0x' + accountStarkPublicKey;
    }

    console.log('this.clientConfig', this.clientConfig);
    let publicKey = this.clientConfig.starkKeyPair.publicKey;
    if (!publicKey.startsWith('0x')) {
      publicKey = '0x' + publicKey;
    }

    console.log('accountStarkPublicKey', accountStarkPublicKey, publicKey);
    if (accountStarkPublicKey.toLowerCase() !== publicKey.toLowerCase()) {
      throw new Error('Stark Key is not match, please check your stark private key.');
    }
  }
}
