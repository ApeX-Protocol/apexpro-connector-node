import BN from 'bn.js';
import elliptic from 'elliptic';
import { ApexAsset, OrderSide } from './main';
export declare enum NetworkId {
    MAINNET = 1,
    GOERLI = 5
}
export declare enum StarkwareOrderType {
    LIMIT_ORDER_WITH_FEES = "LIMIT_ORDER_WITH_FEES"
}
export type SyntheticAsset = Exclude<ApexAsset, ApexAsset.USDC>;
export interface KeyPair {
    publicKey: string;
    publicKeyYCoordinate?: string;
    privateKey: string;
}
export interface KeyPairWithYCoordinate extends KeyPair {
    publicKeyYCoordinate: string;
}
export interface SignatureStruct {
    r: string;
    s: string;
}
export type HashFunction = (a: BN, b: BN) => BN | Promise<BN>;
export type SigningFunction = (key: elliptic.ec.KeyPair, message: BN) => elliptic.ec.Signature | Promise<elliptic.ec.Signature>;
export type VerificationFunction = (key: elliptic.ec.KeyPair, message: BN, signature: SignatureStruct) => boolean | Promise<boolean>;
interface WithdrawalParamsBase {
    positionId: string;
    humanAmount: string;
    expirationIsoTimestamp: string;
    fee?: number;
    ethAddress?: string;
}
interface WithClientId {
    clientId: string;
    nonce?: undefined;
}
interface WithNonce {
    clientId?: undefined;
    nonce: string;
}
export type WithdrawalWithClientId = WithdrawalParamsBase & WithClientId;
export type WithdrawalWithNonce = WithdrawalParamsBase & WithNonce;
export interface StarkwareWithdrawal {
    positionId: string;
    quantumsAmount: string;
    nonce: string;
    expirationEpochHours: number;
    ethAddress: string;
}
export interface TransferParams {
    senderPositionId: string;
    receiverPositionId: string;
    receiverPublicKey: string;
    humanAmount: string;
    clientId: string;
    expirationIsoTimestamp: string;
    asset?: string;
    erc20Address?: string;
    chainId?: string | number;
    fee?: string | number;
    lpAccountId?: string;
}
export interface ConditionalTransferParams extends TransferParams {
    factRegistryAddress: string;
    fact: string;
}
export interface StarkwareTransfer {
    senderPositionId: string;
    receiverPositionId: string;
    receiverPublicKey: string;
    quantumsAmount: string;
    nonce: string;
    expirationEpochHours: number;
}
export interface StarkwareConditionalTransfer extends StarkwareTransfer {
    condition: string;
}
interface OrderParamsBase {
    positionId: string;
    humanSize: string;
    limitFee: string;
    symbol: string;
    side: OrderSide;
    expirationIsoTimestamp: string;
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
export type OrderWithNonce = OrderParamsBase & WithPrice & WithNonce;
export type OrderWithClientIdAndQuoteAmount = OrderParamsBase & WithQuoteAmount & WithClientId;
export type OrderWithNonceAndQuoteAmount = OrderParamsBase & WithQuoteAmount & WithNonce;
export interface StarkwareAmounts {
    quantumsAmountSynthetic: string;
    quantumsAmountCollateral: string;
    assetIdSynthetic: string;
    assetIdCollateral: string;
    isBuyingSynthetic: boolean;
}
export interface StarkwareOrder extends StarkwareAmounts {
    orderType: StarkwareOrderType;
    quantumsAmountFee: string;
    assetIdFee: string;
    positionId: string;
    nonce: string;
    expirationEpochHours: number;
}
export declare enum ApiMethod {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    DELETE = "DELETE"
}
export interface ApiRequestParams {
    isoTimestamp: string;
    method: ApiMethod;
    requestPath: string;
    body: string;
}
export interface OraclePriceWithAssetName {
    assetName: string;
    oracleName: string;
    humanPrice: string;
    isoTimestamp: string;
}
export interface OraclePriceWithMarket {
    symbol: string;
    oracleName: string;
    humanPrice: string;
    isoTimestamp: string;
}
export interface StarkwareOraclePrice {
    signedAssetId: string;
    signedPrice: string;
    expirationEpochSeconds: number;
}
export {};
