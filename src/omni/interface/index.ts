export type ObjectType = { [key: string]: any };

export enum ApexMarket {
  BTC_USDT = 'BTC-USDT',
  BTC_USDC = 'BTC-USDC',
  BTC_USD = 'BTC-USD',
  ETH_USD = 'ETH-USD',
  ETH_USDC = 'ETH-USDC',
  LINK_USD = 'LINK-USD',
  AAVE_USD = 'AAVE-USD',
  UNI_USD = 'UNI-USD',
  SUSHI_USD = 'SUSHI-USD',
  SOL_USD = 'SOL-USD',
  YFI_USD = 'YFI-USD',
  ONEINCH_USD = '1INCH-USD',
  AVAX_USD = 'AVAX-USD',
  SNX_USD = 'SNX-USD',
  CRV_USD = 'CRV-USD',
  UMA_USD = 'UMA-USD',
  DOT_USD = 'DOT-USD',
  DOGE_USD = 'DOGE-USD',
  MATIC_USD = 'MATIC-USD',
  MKR_USD = 'MKR-USD',
  FIL_USD = 'FIL-USD',
  ADA_USD = 'ADA-USD',
  ATOM_USD = 'ATOM-USD',
  COMP_USD = 'COMP-USD',
  BCH_USD = 'BCH-USD',
  LTC_USD = 'LTC-USD',
  EOS_USD = 'EOS-USD',
  ALGO_USD = 'ALGO-USD',
  ZRX_USD = 'ZRX-USD',
  XMR_USD = 'XMR-USD',
  ZEC_USD = 'ZEC-USD',
  ENJ_USD = 'ENJ-USD',
  ETC_USD = 'ETC-USD',
  XLM_USD = 'XLM-USD',
  TRX_USD = 'TRX-USD',
  XTZ_USD = 'XTZ-USD',
  HNT_USD = 'HNT-USD',
}

export type Market = ApexMarket;
export const Market = ApexMarket;

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}
export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  CONDITION = 'CONDITION',
}

export enum TimeInForce {
  GTT = 'GTT',
  FOK = 'FOK',
  IOC = 'IOC',
}
export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  UNTRIGGERED = 'UNTRIGGERED',
}

export interface KeyPair {
  publicKey: string;
}

export interface ApiKeyCredentials {
  key: string;
  secret: string;
  passphrase: string;
}

export type ISO8601 = string | number;

export interface UserObject {
  ethereumAddress: string;
  isRegistered: boolean;
  email: string;
  username: string;
  referredByAffiliateLink: string;
  affiliateLink: string;
  makerVolume30D: string;
  takerVolume30D: string;
  fees30D: string;
  userData?: any;
  apexTokenBalance: string;
  stakedApexTokenBalance: string;
  isEmailVerified: boolean;
  isSharingUsername: boolean;
  isSharingAddress: boolean;
  country: string;
  id: string;
  avatarUrl: string;
  emailNotifyGeneralEnable: boolean;
  emailNotifyTradingEnable: boolean;
  emailNotifyAccountEnable: boolean;
}

export interface AccountObject {
  l2Key: string;
  ethereumAddress: string;
  id: string;
  positions: OpenPositionObject[];
  spotAccount: {
    createdAt: number;
    status: string;
    unrealizePnlPriceType: string;
    ethAddress: string;
    defaultSubAccountId: string;
    zkAccountId: string;
    nonce: number;
    subAccounts: {
      subAccountId: string;
      l2Key: string;
      nonce: number;
      nonceVersion: number;
      changePubKeyStatus: string;
    }[];
    updatedAt: number;
  };
  contractAccount: {
    createdAt: number;
    takerFeeRate: string;
    makerFeeRate: string;
    minInitialMarginRate: string;
    status: string;
    unrealizePnlPriceType: string;
  };
  [key: string]: any;
}

export interface WalletObject {
  userId: string;
  accountId: string;
  balance: string;
  asset: string;
  pendingDepositAmount: string;
  pendingWithdrawAmount: string;
  pendingTransferOutAmount: string;
  pendingTransferInAmount: string;
}

export interface OpenPositionObject {
  token: string;
  symbol: string;
  status: string;
  side: string;
  size: string;
  entryPrice: string;
  exitPrice: string;
  createdAt: number;
  updatedTime: number;
  fee: string;
  fundingFee: string;
  lightNumbers: string;
  customInitialMarginRate: string;
}

export interface AccountsItem {
  createdAt: number;
  takerFeeRate: string;
  makerFeeRate: string;
  minInitialMarginRate: string;
  status: string;
  token: string;
  unrealizePnlPriceType: string;
}

export interface OrderObject {
  id: string;
  clientId: string;
  clientOrderId: string;
  accountId: string;
  symbol: string;
  side: string;
  price: string;
  limitFee: string;
  fee: string;
  liquidateFee: string;
  size: string;
  type: string;
  direction: string;
  createdAt: number;
  updatedTime: number;
  status: string;
  timeInForce: string;
  matchFillId: string;
  reduceOnly: boolean;
  isPositionTpsl: boolean;
  orderId: string;
  orderType: string;
  exitType: string;
  latestMatchFillPrice: string;
  cumMatchFillSize: string;
  cumMatchFillValue: string;
  cumMatchFillFee: string;
  cumSuccessFillSize: string;
  cumSuccessFillValue: string;
  cumSuccessFillFee: string;
  triggerPriceType: string;
  isOpenTpslOrder: boolean;
  isSetOpenTp: boolean;
  isSetOpenSl: boolean;
  openTpParam: any;
  openSlParam: any;
}
export interface WorstPriceObject {
  worstPrice: string;
  bidOnePrice: string;
  askOnePrice: string;
}

export interface FundingRateObject {
  id: string;
  symbol: string;
  rate: string;
  positionSize: string;
  price: string;
  fundingTime: number;
  side: string;
  fundingValue: string;
  status: string;
  transactionId: string;
}

export interface HistoricalPNLObject {
  symbol: string;
  size: string;
  exitPrice: string;
  price: string;
  side: string;
  totalPnl: string;
  createdAt: number;
  type: string;
  isLiquidate: boolean;
  isDeleverage: boolean;
  fee: string;
  closeSharedOpenFee: string;
  liquidateFee: string;
}


export interface AccountBalanceObject {
  totalEquityValue: string;
  availableBalance: string;
  initialMargin: string;
  maintenanceMargin: string;
}

export interface CreateOrderOptions {
  pairId: string;
  makerFeeRate: string;
  takerFeeRate: string;
  symbol: string;
  side: string; // 'BUY' | 'SELL'
  type: string; // 'LIMIT' | 'MARKET' | 'STOP_LIMIT' | 'STOP_MARKET' | 'TAKE_PROFIT_LIMIT' | 'TAKE_PROFIT_MARKET'
  size: string;
  price: string;
  limitFee: number | string;
  triggerPriceWithType?: number; // 触发价格对应类型的最新价格 （当前为：markPrice, indexPrice)
  triggerPrice?: string;
  timeInForce?: string; // 'GOOD_TIL_CANCEL' | 'FILL_OR_KILL' | 'IMMEDIATE_OR_CANCEL' | 'POST_ONLY'
  reduceOnly?: boolean;
  trailingPercent?: string;
  expiration?: number; // Date.now() + 30 * 24 * 60 * 60 * 1000, // 暂定1个月有效期

  sPositionTpsl?: boolean;

  isOpenTpslOrder?: boolean;
  isSetOpenTp?: boolean;
  isSetOpenSl?: boolean;

  tpSide?: string;
  tpPrice?: string;
  tpSize?: string;
  tpLimitFee?: string;
  tpClientOrderId?: string;
  tpTriggerPrice?: string;
  tpTriggerPriceType?: string;
  tpSignature?: string;
  tpExpiration?: number;

  slSide?: string;
  slPrice?: string;
  slSize?: string;
  slLimitFee?: string;
  slClientOrderId?: string;
  slTriggerPrice?: string;
  slTriggerPriceType?: string;
  slExpiration?: number;
  slSignature?: string;

  leverage?: string;
  clientId?: string;
  signature?: string;
  [key: string]: any;
}

export interface Metadata {
  spotConfig: {
    assets: any[];
    global: {
      defaultRegisterTransferToken: string;
      defaultRegisterTransferTokenId: string;
      defaultRegisterSubAccountId: string;
      defaultChangePubKeyZklinkChainId: string;
      defaultChangePubKeyFeeTokenId: string;
      defaultChangePubKeyFeeToken: string;
      defaultChangePubKeyFee: string;
      registerTransferLpAccountId: string;
      registerTransferLpSubAccount: string;
      registerTransferLpSubAccountL2Key: string;
      perpLpAccountId: string;
      perpLpSubAccount: string;
      perpLpSubAccountL2Key: string;
      contractAssetPoolAccountId: string;
      contractAssetPoolZkAccountId: string;
      contractAssetPoolSubAccount: string;
      contractAssetPoolL2Key: string;
      contractAssetPoolEthAddress: string;
      vaultAccountId: string;
      vaultZkAccountId: string;
      vaultSubAccount: string;
      vaultL2Key: string;
      vaultEthAddress: string;
      migrateUsdtPoolAccountId: string;
      migrateUsdtPoolZkAccountId: string;
      migrateUsdtPoolSubAccount: string;
      migrateUsdtPoolL2Key: string;
      migrateUsdtPoolEthAddress: string;
      omniSwapPoolAccountId: string;
      omniSwapPoolZkAccountId: string;
      omniSwapPoolSubAccount: string;
      omniSwapPoolL2Key: string;
      omniSwapPoolEthAddress: string;
      omniSwapFeeAccountId: string;
      omniSwapFeeZkAccountId: string;
      omniSwapFeeSubAccount: string;
      omniSwapFeeL2Key: string;
      omniSwapFeeEthAddress: string;
    };
    spot: [];
    multiChain: { chains: any[] };
    web3TokenConfig: { fromTokenList: any[]; toTokenList: any[] };
    tokens: any[];
  };
  contractConfig: {
    assets: any[];
    tokens: any[];
    global: {
      feeAccountId: string;
      feeAccountL2Key: string;
      contractAssetPoolAccountId: string;
      contractAssetPoolL2Key: string;
      contractAssetPoolEthAddress: string;
      operationAccountId: string;
      operationL2Key: string;
      experienceMoneyAccountId: string;
      experienceMoneyL2Key: string;
      experienceMoneyZkAccountId: string;
      experienceMoneyEthAddress: string;
      agentAccountId: string;
      agentL2Key: string;
      finxFeeAccountId: string;
      finxFeeL2Key: string;
      negativeRateAccountId: string;
      negativeRateL2Key: string;
      brokerAccountId: string;
      brokerL2Key: string;
    };
    perpetualContract: any[];
    prelaunchContract: [];
    maxMarketBalanceBuffer: string;
  };
  omniSwapConfig: {
    omniLiquidityTokens: any[];
    multiChains: any[];
    generalSwapConfigs: {
      minSwapUsdtAmount: string;
      maxSwapUsdtAmount: string;
      defaultSwapSlippage: string;
    };
  };
}


export interface DepthObject {
  a: string[][];
  b: string[][];
  s: string;
  u: number;
}

export interface TradeObject {
  i: string;
  p: string;
  S: string;
  v: string;
  s: string;
  t: number;
}

export interface KlineObject {
  s: string;
  i: string;
  t: number;
  c: string;
  h: string;
  l: string;
  o: string;
  v: string;
  tr: string;
}

export interface TickerObject {
  fundingRate: string;
  highPrice24h: string;
  indexPrice: string;
  lastPrice: string;
  lowPrice24h: string;
  nextFundingTime: string;
  openInterest: string;
  oraclePrice: string;
  predictedFundingRate: string;
  price24hPcnt: string;
  symbol: string;
  tradeCount: string;
  turnover24h: string;
  volume24h: string;
}

export interface HistoryFundingObject {
  symbol: string;
  rate: string;
  price: string;
  fundingTime: number;
  fundingTimestamp: number;
}
