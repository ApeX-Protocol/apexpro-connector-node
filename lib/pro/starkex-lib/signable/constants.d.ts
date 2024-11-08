import BN from 'bn.js';
export declare const TRANSFER_FEE_ASSET_ID_BN: BN;
export declare const STARK_ORDER_SIGNATURE_EXPIRATION_BUFFER_HOURS = 0;
export declare const ORACLE_PRICE_DECIMALS = 18;
export declare const ORDER_FIELD_BIT_LENGTHS: {
    assetIdSynthetic: number;
    assetIdCollateral: number;
    assetIdFee: number;
    quantumsAmount: number;
    nonce: number;
    positionId: number;
    expirationEpochHours: number;
};
export declare const WITHDRAWAL_FIELD_BIT_LENGTHS: {
    assetId: number;
    positionId: number;
    nonce: number;
    quantumsAmount: number;
    expirationEpochHours: number;
};
export declare const TRANSFER_FIELD_BIT_LENGTHS: {
    assetId: number;
    receiverPublicKey: number;
    positionId: number;
    nonce: number;
    quantumsAmount: number;
    expirationEpochHours: number;
};
export declare const CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS: {
    condition: number;
    assetId: number;
    receiverPublicKey: number;
    positionId: number;
    nonce: number;
    quantumsAmount: number;
    expirationEpochHours: number;
};
export declare const ORACLE_PRICE_FIELD_BIT_LENGTHS: {
    assetName: number;
    oracleName: number;
    price: number;
    timestampEpochSeconds: number;
};
