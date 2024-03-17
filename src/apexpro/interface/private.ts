import { ISO8601, Market, OrderSide, OrderType } from './index';

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
  userId: string;
  accountId: string;
  symbol: string;
  status: string;
  side: string;
  size: string;
  maxSize: string;
  entryPrice: string;
  exitPrice: string;
  unrealizedPnl: string;
  realizedPnl: string;
  createdAt: number;
  updatedTime: number;
  netFunding: string;
  sumOpen: string;
  sumClose: string;
  fee: string;
  fundingFee: string;
  lightNumbers: string;
  customInitialMarginRate: string;
}

export interface AccountsItem {
  createdAt: number,
  takerFeeRate: string,
  makerFeeRate: string,
  minInitialMarginRate: string,
  status: string,
  token: string,
  unrealizePnlPriceType: string
}
export interface AccountObject {
  starkKey: string;
  positionId: string;
  quoteBalance: string;
  pendingDeposits: string;
  pendingWithdrawals: string;
  createdAt: number;
  accountNumber: string;
  adminSignature: string;
  ethereumAddress: string;
  id: string;
  takerFeeRate: string;
  makerFeeRate: string;
  wallets: WalletObject[];
  openPositions: OpenPositionObject[];
  accounts?: AccountsItem[];
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
export interface CreateOrderOptionsObject {
  clientOrderId: string;
  positionId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'MARKET' | 'STOP_LIMIT' | 'STOP_MARKET' | 'TAKE_PROFIT_LIMIT' | 'TAKE_PROFIT_MARKET';
  size: string;
  price: string;
  limitFee: string;
  timeInForce?: 'GOOD_TIL_CANCEL' | 'FILL_OR_KILL' | 'IMMEDIATE_OR_CANCEL' | 'POST_ONLY';
  triggerPrice?: string;
  trailingPercent?: string;
  reduceOnly?: boolean;
  brokerId?: string;
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

export interface OrderResponseObject {
  id: string;
  clientId?: string;
  accountId: string;
  symbol: Market;
  side: OrderSide;
  price: string;
  triggerPrice?: string | null;
  trailingPercent?: string | null;
  size: string;
  remainingSize: string;
  type: OrderType;
  createdAt: ISO8601;
  unfillableAt?: ISO8601 | null;
  expiresAt?: ISO8601;
  status: OrderStatus;
  timeInForce: TimeInForce;
  postOnly: boolean;
  cancelReason?: string | null;
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
export interface AccountBalanceObject {
  totalEquityValue: string;
  availableBalance: string;
  initialMargin: string;
  maintenanceMargin: string;
}
