"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORACLE_PRICE_FIELD_BIT_LENGTHS = exports.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS = exports.TRANSFER_FIELD_BIT_LENGTHS = exports.WITHDRAWAL_FIELD_BIT_LENGTHS = exports.ORDER_FIELD_BIT_LENGTHS = exports.ORACLE_PRICE_DECIMALS = exports.STARK_ORDER_SIGNATURE_EXPIRATION_BUFFER_HOURS = exports.TRANSFER_FEE_ASSET_ID_BN = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
exports.TRANSFER_FEE_ASSET_ID_BN = new bn_js_1.default(0); // Same for conditional transfers.
exports.STARK_ORDER_SIGNATURE_EXPIRATION_BUFFER_HOURS = 0; // Seven days.
exports.ORACLE_PRICE_DECIMALS = 18;
exports.ORDER_FIELD_BIT_LENGTHS = {
    assetIdSynthetic: 128,
    assetIdCollateral: 250,
    assetIdFee: 250,
    quantumsAmount: 64,
    nonce: 32,
    positionId: 64,
    expirationEpochHours: 32,
};
exports.WITHDRAWAL_FIELD_BIT_LENGTHS = {
    assetId: 250,
    positionId: 64,
    nonce: 32,
    quantumsAmount: 64,
    expirationEpochHours: 32,
};
exports.TRANSFER_FIELD_BIT_LENGTHS = {
    assetId: 250,
    receiverPublicKey: 251,
    positionId: 64,
    nonce: 32,
    quantumsAmount: 64,
    expirationEpochHours: 32,
};
exports.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS = {
    ...exports.TRANSFER_FIELD_BIT_LENGTHS,
    condition: 250,
};
exports.ORACLE_PRICE_FIELD_BIT_LENGTHS = {
    assetName: 128,
    oracleName: 40,
    price: 120,
    timestampEpochSeconds: 32,
};
