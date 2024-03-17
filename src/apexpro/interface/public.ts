import { getPrecision } from '../tool';

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

export interface DepthObject {
  a: string[][];
  b: string[][];
  s: string;
  u: number;
}

export interface GetHistoryFundingOptions {
  symbol: string;
  page?: number;
  beginTimeInclusive?: number;
  endTimeExclusive?: number;
  limit?: number;
}

export interface PerpetualCurrencyObject{
  usdc: CurrencyObject[],
  usdt: CurrencyObject[]
}
export interface CurrencyObject {
  id: string;
  starkExAssetId: string;
  starkExResolution: string;
  stepSize: string;
  showStep: string;
  iconUrl: string;
}

export interface GlobalObject {
  feeAccountId: string;
  feeAccountL2Key: string;
  starkExCollateralCurrencyId: string;
  starkExFundingValidityPeriod: number;
  starkExMaxFundingRate: string;
  starkExOrdersTreeHeight: number;
  starkExPositionsTreeHeight: number;
  starkExPriceValidityPeriod: number;
  starkExContractAddress: string;
  registerEnvId: number;
  crossChainAccountId: string;
  crossChainL2Key: string;
  fastWithdrawAccountId: string;
  fastWithdrawFactRegisterAddress: string;
  fastWithdrawL2Key: string;
  fastWithdrawMaxAmount: string;
  bybitWithdrawAccountId: string;
  bybitWithdrawL2Key: string;
}

export interface PerpetualContractObject {
  baselinePositionValue: string;
  crossId: number;
  crossSymbolId: number;
  crossSymbolName: string;
  digitMerge: string;
  displayMaxLeverage: string;
  displayMinLeverage: string;
  enableDisplay: boolean;
  enableOpenPosition: boolean;
  enableTrade: boolean;
  fundingImpactMarginNotional: string;
  fundingInterestRate: string;
  incrementalInitialMarginRate: string;
  incrementalMaintenanceMarginRate: string;
  incrementalPositionValue: string;
  initialMarginRate: string;
  maintenanceMarginRate: string;
  maxOrderSize: string;
  maxPositionSize: string;
  minOrderSize: string;
  maxMarketPriceRange: string;
  settleCurrencyId: string;
  starkExOraclePriceQuorum: string;
  starkExResolution: string;
  starkExRiskFactor: string;
  starkExSyntheticAssetId: string;
  stepSize: string;
  symbol: string;
  symbolDisplayName: string;
  symbolDisplayName2: string;
  tickSize: string;
  underlyingCurrencyId: string;
  maxMaintenanceMarginRate: string;
  maxPositionValue: string;
}

export interface MultiChainObject {
  chains: any[][];
  currency: string;
  maxWithdraw: string;
  minDeposit: string;
  minWithdraw: string;
}

export interface PerpetualObject {
  usdcConfig: SymbolObject;
  usdtConfig: SymbolObject;
}

export interface SymbolObject {
  currency: CurrencyObject[];
  global: GlobalObject;
  perpetualContract: PerpetualContractObject[];
  multiChain: MultiChainObject;
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

export interface HistoryFundingObject {
  symbol: string;
  rate: string;
  price: string;
  fundingTime: number;
  fundingTimestamp: number;
}
export interface SymbolInfoObject extends PerpetualContractObject {
  rankIdx?: number;
  pricePrecision?: number;
  priceStep?: number;
  sizePrecision?: number;
  sizeStep?: number;
  baseCoin?: string;
  currentCoin?: string;
  baseCoinPrecision?: number;
  baseCoinRealPrecision?: number;
  currentCoinPrecision?: number;
  baseCoinIcon?: string;
  currentCoinIcon?: string;
}
