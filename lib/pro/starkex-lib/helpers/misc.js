"use strict";
/**
 * Other helper functions for converting data for Starkware.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonceFromClientId = nonceFromClientId;
exports.clientIdToNonce = clientIdToNonce;
exports.isoTimestampToEpochSeconds = isoTimestampToEpochSeconds;
exports.isoTimestampToEpochHours = isoTimestampToEpochHours;
exports.addOrderExpirationBufferHours = addOrderExpirationBufferHours;
exports.getSignedAssetName = getSignedAssetName;
exports.getSignedAssetId = getSignedAssetId;
const crypto_js_1 = __importDefault(require("crypto-js"));
const bn_js_1 = __importDefault(require("bn.js"));
const util_1 = require("../lib/util");
const constants_1 = require("../signable/constants");
const MAX_NONCE = new bn_js_1.default(2).pow(new bn_js_1.default(constants_1.ORDER_FIELD_BIT_LENGTHS.nonce));
const ONE_SECOND_MS = 1000;
const ONE_HOUR_MS = 60 * 60 * ONE_SECOND_MS;
/**
 * Generate a nonce deterministically from an arbitrary string provided by a client.
 */
function nonceFromClientId(clientId) {
    const hash = crypto_js_1.default.SHA256(clientId);
    return (0, util_1.hexToBn)(hash.toString(crypto_js_1.default.enc.Hex)).mod(MAX_NONCE).toString();
}
function clientIdToNonce(clientId) {
    let hash = crypto_js_1.default.SHA256(clientId);
    hash = hash.toString(crypto_js_1.default.enc.Hex);
    let s = hash.slice(0, 8);
    s = (0, util_1.hexToBn)('0x' + s).toNumber();
    return s;
}
/**
 * Convert an ISO timestamp to an epoch timestamp in seconds, rounding down.
 */
function isoTimestampToEpochSeconds(isoTimestamp) {
    return Math.floor(new Date(isoTimestamp).getTime() / ONE_SECOND_MS);
}
/**
 * Convert an ISO timestamp to an epoch timestamp in hours, rounding up.
 */
function isoTimestampToEpochHours(isoTimestamp) {
    return Math.ceil(new Date(Number(isoTimestamp)).getTime() / ONE_HOUR_MS);
}
/**
 * Add expiration buffer to ensure an order signature is valid when it arrives on-chain.
 */
function addOrderExpirationBufferHours(expirationEpochHours) {
    return expirationEpochHours + constants_1.STARK_ORDER_SIGNATURE_EXPIRATION_BUFFER_HOURS;
}
/**
 * Get the asset name to be signed by a price oracle. It is the market name with the hyphen removed.
 */
function getSignedAssetName(market) {
    return market.replace('-', '');
}
/**
 * Get the asset ID to be signed by a price oracle. It consists of an asset name and oracle name.
 */
function getSignedAssetId(assetName, oracleName) {
    const assetNameBn = (0, util_1.utf8ToBn)(assetName, constants_1.ORACLE_PRICE_FIELD_BIT_LENGTHS.assetName);
    const oracleNameBn = (0, util_1.utf8ToBn)(oracleName, constants_1.ORACLE_PRICE_FIELD_BIT_LENGTHS.oracleName);
    const signedAssetIdBn = assetNameBn.iushln(constants_1.ORACLE_PRICE_FIELD_BIT_LENGTHS.oracleName).iadd(oracleNameBn);
    return signedAssetIdBn.toString(16);
}
