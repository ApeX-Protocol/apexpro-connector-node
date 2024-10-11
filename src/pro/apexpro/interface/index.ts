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

export interface KeyPair {
  publicKey: string; // Required x-coordinate.
  publicKeyYCoordinate?: string; // Optional y-coordinate.
  privateKey: string;
}

export type ISO8601 = string | number;

export interface ApiKeyCredentials {
  key: string;
  secret: string;
  passphrase: string;
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}
export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  CONDITION = 'CONDITION',
}

interface OrderParamsBase {
  positionId: string;
  humanSize: string;
  limitFee: string; // Max fee fraction, e.g. 0.01 is a max 1% fee.
  symbol: string;
  side: OrderSide;
  expirationIsoTimestamp: string;
}
interface WithClientId {
  clientId: string;
  nonce?: undefined;
}
export interface WithPrice {
  humanPrice: string;
  humanQuoteAmount?: undefined;
}

export type OrderWithClientId = OrderParamsBase & WithPrice & WithClientId;

export * from './public';
export * from './private';
