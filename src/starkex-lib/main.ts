export enum ApexAsset {
  USDC = 'USDC',
  USDT = 'USDT',
  BTC = 'BTC',
  ETH = 'ETH',
  LINK = 'LINK',
  AAVE = 'AAVE',
  UNI = 'UNI',
  SUSHI = 'SUSHI',
  SOL = 'SOL',
  YFI = 'YFI',
  ONEINCH = '1INCH',
  AVAX = 'AVAX',
  SNX = 'SNX',
  CRV = 'CRV',
  UMA = 'UMA',
  DOT = 'DOT',
  DOGE = 'DOGE',
  MATIC = 'MATIC',
  MKR = 'MKR',
  FIL = 'FIL',
  ADA = 'ADA',
  ATOM = 'ATOM',
  COMP = 'COMP',
  BCH = 'BCH',
  LTC = 'LTC',
  EOS = 'EOS',
  ALGO = 'ALGO',
  ZRX = 'ZRX',
  XMR = 'XMR',
  ZEC = 'ZEC',
  ENJ = 'ENJ',
  ETC = 'ETC',
  XLM = 'XLM',
  TRX = 'TRX',
  XTZ = 'XTZ',
  HNT = 'HNT',
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum WalletWay {
  MetaMask = 'injected',
  CoinbaseWallet = 'coinbaseWallet',
  Walletconnect = 'walletConnect',
}

export interface TokenInfo {
  decimals: number;
  iconUrl: string;
  token: string;
  tokenAddress: string;
  pullOff: boolean;
}
export interface ChainInfo {
  chain: string;
  chainIconUrl: string;
  chainId: number;
  contractAddress: string;
  depositGasFeeLess: boolean;
  feeLess: boolean;
  feeRate: string | number;
  gasLess: boolean;
  gasToken: string;
  minFee: string | number;
  rpcUrl: string;
  withdrawGasFeeLess: boolean;
  tokens: TokenInfo[];
}
export interface MultiChain {
  chains: ChainInfo[];
  currency: string;
  maxWithdraw: string | number;
  minDeposit: string | number;
  minWithdraw: string | number;
}

export const enum ConnectStatus {
  Success = 'success',
  Progress = 'progress',
  Error = 'error',
}
interface SymbolInfo {
  // 接口返回
  symbol: string; //'BTC-USDT'
  underlying_currency_id: string;
  base_currency_id: string;
  tick_size: string;
  step_size: string;
  baseline_position_value: string;
  incremental_initial_margin_rate: string;
  incremental_maintenance_margin_rate: string;
  incremental_position_value: string;
  initial_margin_rate: string;
  maintenance_margin_rate: string;
  max_order_size: string;
  max_position_size: string;
  min_order_size: string;
  // END 接口返回
  // 处理
  pricePrecision: number; // 价格精度
  priceStep: number; // 价格最小单位
  sizePrecision: number; // 数量精度
  sizeStep: number; // 数量最小单位
  minOrderSize: number; // 最小订单
  baseCoin: string; // 基础币类型
  currentCoin: string; // 当前币类型
}

export interface ACCOUNT {
  accountNumber: string;
  adminSignature: string;
  createdAt: string;
  id: string;
  openPositions: string;
  pendingDeposits: string;
  pendingWithdrawals: string;
  positionId: string;
  quoteBalance: string;
  starkKey: string;
  wallets: string;
}

export interface APIKEY {
  key: string;
  passphrase: string;
  secret: string;
}

export interface USER {
  apexTokenBalance: string;
  country: string;
  email: string;
  emailNotifyGeneralEnable: boolean;
  emailNotifyTradingEnable: boolean;
  emailNotifyAccountEnable: boolean;
  ethereumAddress: string;
  fees30D: string;
  id: string;
  isEmailVerified: string;
  isRegistered: string;
  isSharingAddress: string;
  isSharingUsername: string;
  makerFeeRate: string;
  makerVolume30D: string;
  referredByAffiliateLink: string;
  stakedApexTokenBalance: string;
  takerFeeRate: string;
  takerVolume30D: string;
  userData: object;
  username: string;
}

export interface USERINFO {
  account: ACCOUNT;
  apiKey: APIKEY;
  user: USER;
}

interface Currency {
  id: string;
  stark_ex_asset_id: string;
  starkExResolution: string;
  step_size: string;
}


// V1
// 币对信息
let symbols: any = [];

const setSymbols = (data: any) => {
  symbols = data;
};
const getSymbols = () => {
  return symbols;
};
// 价值信息
let currency: Currency[] = [];
const setCurrency = (data: any) => {
  currency = data;
};
const getCurrency = () => {
  return currency;
};
// config
let config = {};
const setConfig = (data: any) => {
  config = data;
};
const getConfig = () => {
  return config;
};


// V2
// 合约对信息
let perpetual: 'USDC' | 'USDT' | string = '';
const setPerpetual = (data: 'USDC' | 'USDT' | string) => {
  perpetual = data;
};
const getPerpetual = (): 'USDC' | 'USDT' | string => {
  return perpetual;
};

// 币对信息
let symbolsV2: any = [];

const setSymbolsV2 = (data: any) => {
  symbols = data;
};
const getSymbolsV2 = () => {
  return symbols;
};

// 价值信息
let currencyV2: { usdc: Currency[]; usdt: Currency[] } = { usdc: [], usdt: [] };

const setUSDCCurrency = (data: any) => {
  currencyV2.usdc = data;
};
const getUSDCCurrency = () => {
  return currencyV2?.usdc;
};
const setUSDTCurrency = (data: any) => {
  currencyV2.usdt = data;
};
const getUSDTCurrency = () => {
  return currencyV2?.usdt;
};
const setCurrencyV2 = (data: any) => {
  currencyV2 = data;
};
const getCurrencyV2 = () => {
  const currentPerpetual = getPerpetual()?.toLowerCase?.();
  if (currentPerpetual) {
    return currencyV2?.[currentPerpetual];
  }
  return currencyV2;
};

// config
let configV2 = { usdc: {}, usdt: {} };
const setUSDCConfig = (data) => {
  configV2.usdc = data;
};
const getUSDCConfig = () => {
  return configV2?.usdc;
};
const setUSDTConfig = (data) => {
  configV2.usdt = data;
};
const getUSDTConfig = () => {
  return configV2?.usdt;
};
const setConfigV2 = (data: any) => {
  configV2 = data;
};
const getConfigV2 = () => {
  const currentPerpetual = getPerpetual()?.toLowerCase?.();
  if (currentPerpetual) {
    return configV2?.[currentPerpetual];
  }
  return configV2;
};
export {
  setUSDCConfig,
  getUSDCConfig,
  setUSDTConfig,
  getUSDTConfig,
  setUSDCCurrency,
  getUSDCCurrency,
  setUSDTCurrency,
  getUSDTCurrency,
  setPerpetual,
  getPerpetual,
  setSymbols,
  getSymbols,
  setCurrency,
  getCurrency,
  setConfig,
  getConfig,
  setSymbolsV2,
  getSymbolsV2,
  setCurrencyV2,
  getCurrencyV2,
  setConfigV2,
  getConfigV2,


};
