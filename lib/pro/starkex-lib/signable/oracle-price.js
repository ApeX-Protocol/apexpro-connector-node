"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignableOraclePrice = void 0;
const big_js_1 = __importDefault(require("big.js"));
const helpers_1 = require("../helpers");
const lib_1 = require("../lib");
const util_1 = require("../lib/util");
const constants_1 = require("./constants");
const stark_signable_1 = require("./stark-signable");
/**
 * Wrapper object to hash, sign, and verify an oracle price.
 */
class SignableOraclePrice extends stark_signable_1.StarkSignable {
    static fromPriceWithMarket(params, networkId) {
        if (typeof params.symbol !== 'string') {
            throw new Error('SignableOraclePrice.fromPrice: market must be a string');
        }
        const assetName = (0, helpers_1.getSignedAssetName)(params.symbol);
        return SignableOraclePrice.fromPriceWithAssetName({
            ...params,
            assetName,
        }, networkId);
    }
    static fromPriceWithAssetName(params, networkId) {
        if (typeof params.assetName !== 'string') {
            throw new Error('SignableOraclePrice.fromPrice: assetName must be a string');
        }
        if (typeof params.oracleName !== 'string') {
            throw new Error('SignableOraclePrice.fromPrice: oracleName must be a string');
        }
        if (typeof params.humanPrice !== 'string') {
            throw new Error('SignableOraclePrice.fromPrice: humanPrice must be a string');
        }
        if (typeof params.isoTimestamp !== 'string') {
            throw new Error('SignableOraclePrice.fromPrice: isoTimestamp must be a string');
        }
        const signedAssetId = (0, helpers_1.getSignedAssetId)(params.assetName, params.oracleName);
        const signedPrice = new big_js_1.default(params.humanPrice);
        signedPrice.e += constants_1.ORACLE_PRICE_DECIMALS;
        if (!signedPrice.mod(1).eq(0)) {
            throw new Error('SignableOraclePrice.fromPrice: humanPrice can have at most 18 decimals of precision');
        }
        const expirationEpochSeconds = (0, helpers_1.isoTimestampToEpochSeconds)(params.isoTimestamp);
        return new SignableOraclePrice({
            signedAssetId,
            signedPrice: signedPrice.toFixed(0),
            expirationEpochSeconds,
        }, networkId);
    }
    async calculateHash() {
        const priceBn = (0, util_1.decToBn)(this.message.signedPrice);
        const timestampEpochSecondsBn = (0, util_1.intToBn)(this.message.expirationEpochSeconds);
        const signedAssetId = (0, util_1.hexToBn)(this.message.signedAssetId);
        if (priceBn.bitLength() > constants_1.ORACLE_PRICE_FIELD_BIT_LENGTHS.price) {
            throw new Error('SignableOraclePrice: price exceeds max value');
        }
        if (timestampEpochSecondsBn.bitLength() > constants_1.ORACLE_PRICE_FIELD_BIT_LENGTHS.timestampEpochSeconds) {
            throw new Error('SignableOraclePrice: timestampEpochSeconds exceeds max value');
        }
        const priceAndTimestamp = priceBn
            .iushln(constants_1.ORACLE_PRICE_FIELD_BIT_LENGTHS.timestampEpochSeconds)
            .iadd(timestampEpochSecondsBn);
        return (0, lib_1.getPedersenHash)(signedAssetId, priceAndTimestamp);
    }
}
exports.SignableOraclePrice = SignableOraclePrice;
