import { HttpProvider, IpcProvider, WebsocketProvider } from "web3-core";
import BigNumber from "bignumber.js";

export type { Account as EthereumAccount } from "web3-core";
export type BigNumberable = BigNumber | string | number;

export enum ApexMarket {
  BTC_USDT = "BTC-USDT",
  BTC_USDC = "BTC-USDC",
  BTC_USD = "BTC-USD",
  ETH_USD = "ETH-USD",
  ETH_USDC = "ETH-USDC",
  LINK_USD = "LINK-USD",
  AAVE_USD = "AAVE-USD",
  UNI_USD = "UNI-USD",
  SUSHI_USD = "SUSHI-USD",
  SOL_USD = "SOL-USD",
  YFI_USD = "YFI-USD",
  ONEINCH_USD = "1INCH-USD",
  AVAX_USD = "AVAX-USD",
  SNX_USD = "SNX-USD",
  CRV_USD = "CRV-USD",
  UMA_USD = "UMA-USD",
  DOT_USD = "DOT-USD",
  DOGE_USD = "DOGE-USD",
  MATIC_USD = "MATIC-USD",
  MKR_USD = "MKR-USD",
  FIL_USD = "FIL-USD",
  ADA_USD = "ADA-USD",
  ATOM_USD = "ATOM-USD",
  COMP_USD = "COMP-USD",
  BCH_USD = "BCH-USD",
  LTC_USD = "LTC-USD",
  EOS_USD = "EOS-USD",
  ALGO_USD = "ALGO-USD",
  ZRX_USD = "ZRX-USD",
  XMR_USD = "XMR-USD",
  ZEC_USD = "ZEC-USD",
  ENJ_USD = "ENJ-USD",
  ETC_USD = "ETC-USD",
  XLM_USD = "XLM-USD",
  TRX_USD = "TRX-USD",
  XTZ_USD = "XTZ-USD",
  HNT_USD = "HNT-USD",
}
export enum ApexAsset {
  USDC = "USDC",
  USDT = "USDT",
  BTC = "BTC",
  ETH = "ETH",
  LINK = "LINK",
  AAVE = "AAVE",
  UNI = "UNI",
  SUSHI = "SUSHI",
  SOL = "SOL",
  YFI = "YFI",
  ONEINCH = "1INCH",
  AVAX = "AVAX",
  SNX = "SNX",
  CRV = "CRV",
  UMA = "UMA",
  DOT = "DOT",
  DOGE = "DOGE",
  MATIC = "MATIC",
  MKR = "MKR",
  FIL = "FIL",
  ADA = "ADA",
  ATOM = "ATOM",
  COMP = "COMP",
  BCH = "BCH",
  LTC = "LTC",
  EOS = "EOS",
  ALGO = "ALGO",
  ZRX = "ZRX",
  XMR = "XMR",
  ZEC = "ZEC",
  ENJ = "ENJ",
  ETC = "ETC",
  XLM = "XLM",
  TRX = "TRX",
  XTZ = "XTZ",
  HNT = "HNT",
}

export enum TransferAsset {
  USDC = "USDC",
  USDT = "USDT",
}

export type Market = ApexMarket;

export type Asset = ApexAsset;

interface ApiStarkwareSigned {
  signature: string;
  expiration: string;
}

export enum SigningMethod {
  Compatibility = "Compatibility", // picks intelligently between UnsafeHash and Hash
  UnsafeHash = "UnsafeHash", // raw hash signed
  Hash = "Hash", // hash prepended according to EIP-191
  TypedData = "TypedData", // order hashed according to EIP-712
  MetaMask = "MetaMask", // order hashed according to EIP-712 (MetaMask-only)
  MetaMaskLatest = "MetaMaskLatest", // ... according to latest version of EIP-712 (MetaMask-only)
  CoinbaseWallet = "CoinbaseWallet", // ... according to latest version of EIP-712 (CoinbaseWallet)
  Personal = "Personal", // message signed with personal_sign
  Personal2 = "Personal2", // message signed with personal_sign
}
export enum SignatureTypes {
  NO_PREPEND = 0,
  DECIMAL = 1,
  HEXADECIMAL = 2,
  PERSONAL = 3,
}

export interface OnboardingAction {
  action: string;
  onlySignOn?: string;
}

export interface KeyPair {
  publicKey: string; // Required x-coordinate.
  publicKeyYCoordinate?: string; // Optional y-coordinate.
  privateKey: string;
}

export interface EthPrivateAction {
  method: string;
  requestPath: string;
  body: string;
  timestamp: string;
}

export type Address = string;

export enum RequestMethod {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE",
}
export enum AccountAction {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}
/**
 * @param LONG
 * @param SHORT
 * */
export enum SideAction {
  LONG = "LONG",
  SHORT = "SHORT",
}
export enum AccountLeaderboardPnlPeriod {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ALL_TIME = "ALL_TIME",
  COMPETITION = "COMPETITION",
  DAILY_COMPETITION = "DAILY_COMPETITION",
  LEAGUES = "LEAGUES",
}

export type ISO8601 = string | number;
export interface AccountLeaderboardPnlResponseObject {
  absolutePnl: string;
  percentPnl: string;
  absoluteRank: number | null;
  percentRank: number | null;
  updatedAt: ISO8601 | null;
  startedAt: ISO8601 | null;
  endsAt: ISO8601 | null;
  accountId: string;
  period: LeaderboardPnlPeriod;
  seasonExpectedOutcome: LeaguesExpectedOutcome | null;
  seasonNumber: number | null;
  hedgieWon: number | null;
  prizeWon: string | null;
}
export enum LeaderboardPnlPeriod {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ALL_TIME = "ALL_TIME",
  COMPETITION = "COMPETITION",
  DAILY_COMPETITION = "DAILY_COMPETITION",
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
}

export enum LeaguesExpectedOutcome {
  PROMOTION = "PROMOTION",
  DEMOTION = "DEMOTION",
  SAME_LEAGUE = "SAME_LEAGUE",

  // deprecated.
  RELEGATION = "RELEGATION",
}

export interface AccountResponseObject {
  starkKey: string;
  positionId: string;
  equity: string;
  freeCollateral: string;
  pendingDeposits: string;
  pendingWithdrawals: string;
  openPositions: PositionsMap;
  accountNumber: string;
  id: string;
  quoteBalance: string;
}
export interface ApiFastWithdrawal extends ApiStarkwareSigned {
  creditAsset: TransferAsset;
  creditAmount: string;
  debitAmount: string;
  toAddress: string;
  lpPositionId: string;
  clientId: string;
  fee: number;
  amount: string;
  asset: string;
  erc20Address: string;
  lpAccountId: string;
}
export type PositionsMap = { [symbol: string]: PositionResponseObject };

export interface PositionResponseObject {
  symbol: Market;
  status: PositionStatus;
  side: string;
  size: string;
  maxSize: string;
  entryPrice: string;
  exitPrice?: string;
  unrealizedPnl: string;
  realizedPnl?: string;
  createdAt: ISO8601;
  closedAt?: ISO8601;
  sumOpen?: string;
  sumClose?: string;
  fundingFee?: string;
}

export enum PositionStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  LIQUIDATED = "LIQUIDATED",
}
export interface ApiFastWithdrawalParams extends ApiFastWithdrawal {
  lpStarkKey: string;
  factRegistryAddress: string;
  tokenAddress: string;
  tokenDecimals: number;
  contractAddress: string;
  asset: string;
  chainId: number;
}

export interface ApiKeyCredentials {
  key: string;
  secret: string;
  passphrase: string;
}
export interface ApiOrder extends ApiStarkwareSigned {
  symbol: Market;
  side: OrderSide;
  type: OrderType;
  size: string;
  price: string;
  clientId: string;
  timeInForce: TimeInForce;
  postOnly: boolean;
  limitFee: string;
  signature: string;
  cancelId?: string;
  triggerPrice?: string;
  trailingPercent?: string;
  reduceOnly?: boolean;

  isPositionTpsl?: boolean;

  isOpenTpslOrder?: boolean;
  isSetOpenTp?: boolean;
  isSetOpenSl?: boolean;

  tpSide?: string; // sell -> tickSize buy -> lastPrice * 10
  tpPrice?: string;
  tpSize?: string;
  tpLimitFee?: string;
  tpClientOrderId?: string;
  tpTriggerPrice?: string;
  tpTriggerPriceType?: string;
  tpExpiration?: string;
  tpSignature?: string;

  slSide?: string; // sell -> tickSize buy -> lastPrice * 10
  slPrice?: string;
  slSize?: string;
  slLimitFee?: string;
  slClientOrderId?: string;
  slTriggerPrice?: string;
  slTriggerPriceType?: string;
  slExpiration?: string;
  slSignature?: string;

}

export interface OrderSignatureOptions {
  symbol: string;
  side: OrderSide;
  size: string;
  price: string;
  limitFee: string;
  expiration: string;
}
export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}
export enum OrderType {
  LIMIT_ORDER_WITH_FEES = "LIMIT_ORDER_WITH_FEES",
}
interface ApiStarkwareSigned {
  signature: string;
  expiration: string;
}
export enum TimeInForce {
  GTT = "GTT",
  FOK = "FOK",
  IOC = "IOC",
}
export interface ApiTransfer extends ApiStarkwareSigned {
  amount: string;
  clientId: string;
  receiverAccountId: string;
}

export interface ApiWithdrawal extends ApiStarkwareSigned {
  amount: string;
  asset: Asset;
  clientId: string;
  fee?: number;
  realAmount?: number;
  ethAddress: string;
}

export type Data = any;
export interface FillResponseObject {
  id: string;
  side: OrderSide;
  liquidity: string;
  type: OrderType;
  symbol: Market;
  price: string;
  size: string;
  fee: string;
  createdAt: ISO8601;
  orderId: string | null | undefined;
}
export interface FundingResponseObject {
  symbol: Market;
  payment: string;
  rate: string;
  positionSize: string;
  price: string;
  effectiveAt: ISO8601;
}
export type GenericParams = { [name: string]: any };

export interface HistoricalPnlResponseObject {
  equity: string;
  totalPnl: string;
  createdAt: ISO8601;
  netTransfers: string;
  accountId: string;
}
export type ISO31661ALPHA2 = string;
export interface LiquidityProviderRewardsResponseObject {
  epoch: number;
  epochStart: ISO8601;
  epochEnd: ISO8601;
  symbols: {
    [symbol: string]: LiquidityRewards;
  };
  stakedApex: StakedAPEX;
}

export interface LiquidityRewards {
  symbol: Market;
  uptime: string;
  score: string;
  totalScore: string;
  totalRewards: string;
  estimatedRewards: string;
}
export interface StakedAPEX {
  averageStakedAPEX: string;
  totalAverageStakedAPEX: string;
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
export enum OrderStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  FILLED = "FILLED",
  CANCELED = "CANCELED",
  UNTRIGGERED = "UNTRIGGERED",
}
export enum OrderRecordType {
  OPEN = "openOrders",
  HISTORY = "historyOrders",
  FILLS = "fills",
  PNL = "historicalPNL",
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Provider = HttpProvider | IpcProvider | WebsocketProvider;
export interface RetroactiveMiningRewardsResponseObject {
  epoch: number;
  epochStart: ISO8601;
  epochEnd: ISO8601;
  retroactiveMining: RetroactiveMiningRewards;
  estimatedRewards: string;
}
export interface RetroactiveMiningRewards {
  allocation: string;
  targetVolume: string;
  volume: string;
}
export interface TradingRewardsResponseObject {
  epoch: number;
  epochStart: ISO8601;
  epochEnd: ISO8601;
  fees: Fees;
  openInterest: OpenInterest;
  weight: Weight;
  stakedDYDX: StakedAPEXIncludingFloor;
  totalRewards: string;
  estimatedRewards: string;
}
export interface Fees {
  feesPaid: string;
  totalFeesPaid: string;
}
export interface OpenInterest {
  averageOpenInterest: string;
  totalAverageOpenInterest: string;
}
export interface Weight {
  weight: string;
  totalWeight: string;
}
export interface StakedAPEXIncludingFloor extends StakedAPEX {
  averageStakedAPEXWithFloor: string;
}
export interface TransferParams extends ApiStarkwareSigned {
  amount: string;
  clientId: string;
  receiverAccountId: string;
  receiverPublicKey: string;
  receiverPositionId: string;
  asset?: string;
  erc20Address?: string;
  chainId: string | number;
  fee?: string | number;
  lpAccountId?: string;
  contractAddress?: string;
  lpPositionId?: string;
}
export interface StarklibTransferParams {
  senderPositionId: string;
  receiverPositionId: string;
  receiverPublicKey: string;
  humanAmount: string;
  clientId: string;
  expirationIsoTimestamp: string;
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
export interface WithQuoteAmount {
  humanPrice?: undefined;
  humanQuoteAmount: string;
}
export type OrderWithClientId = OrderParamsBase & WithPrice & WithClientId;
export interface TransferResponseObject {
  id: string;
  type: string;
  debitAsset: Asset;
  creditAsset: Asset;
  debitAmount: string;
  creditAmount: string;
  transactionHash?: string;
  status: string;
  createdAt: ISO8601;
  confirmedAt?: ISO8601;
  clientId?: string;
  fromAddress?: string;
  toAddress?: string;
  fee: string | number;
}
export interface UserResponseObject {
  ethereumAddress: string;
  isRegistered: boolean;
  email: string | null;
  username: string | null;
  userData: {};
  makerFeeRate: string | null;
  takerFeeRate: string | null;
  makerVolume30D: string | null;
  takerVolume30D: string | null;
  fees30D: string | null;
  referredByAffiliateLink: string | null;
  isSharingUsername: boolean | null;
  isSharingAddress: boolean | null;
  dydxTokenBalance: string;
  stakedDydxTokenBalance: string;
  isEmailVerified: boolean;
  country: ISO31661ALPHA2 | null;
}
export interface ActiveOrderResponseObject {
  id: string;
  accountId: string;
  remainingSize: string;
  price: string;
  symbol: Market;
  side: OrderSide;
}
