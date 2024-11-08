"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignableOrder = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const helpers_1 = require("../helpers");
const lib_1 = require("../lib");
const util_1 = require("../lib/util");
const types_1 = require("../types");
const constants_1 = require("./constants");
const hashes_1 = require("./hashes");
const stark_signable_1 = require("./stark-signable");
const LIMIT_ORDER_WITH_FEES = 3;
const ORDER_PADDING_BITS = 17;
/**
 * Wrapper object to convert an order, and hash, sign, and verify its signature.
 */
class SignableOrder extends stark_signable_1.StarkSignable {
    static fromOrderWithClientId(order, networkId) {
        // Make the nonce by hashing the client-provided ID.
        // const nonce = nonceFromClientId(order.clientId);
        const nonce = (0, helpers_1.clientIdToNonce)(order.clientId);
        return SignableOrder.fromOrderWithNonce({
            ...order,
            clientId: undefined,
            nonce,
        }, networkId);
    }
    static fromOrderWithNonce(order, networkId) {
        const nonce = order.nonce;
        const positionId = order.positionId;
        // Within the Starkware system, there is currently only one order type.
        const orderType = types_1.StarkwareOrderType.LIMIT_ORDER_WITH_FEES;
        // Need to be careful that the (size, price) -> (amountBuy, amountSell) function is
        // well-defined and applied consistently.
        let { quantumsAmountSynthetic, quantumsAmountCollateral, assetIdSynthetic, assetIdCollateral, isBuyingSynthetic } = (0, helpers_1.getStarkwareAmounts)(order, networkId);
        // The limitFee is a fraction, e.g. 0.01 is a 1% fee. It is always paid in the collateral asset.
        const quantumsAmountFee = (0, helpers_1.getStarkwareLimitFeeAmount)(order.limitFee, order.symbol);
        // Convert to a Unix timestamp (in hours) and add buffer to ensure signature is valid on-chain.
        const expirationEpochHours = (0, helpers_1.addOrderExpirationBufferHours)((0, helpers_1.isoTimestampToEpochHours)(order.expirationIsoTimestamp));
        return new SignableOrder({
            orderType,
            nonce,
            quantumsAmountSynthetic,
            quantumsAmountCollateral,
            quantumsAmountFee,
            assetIdSynthetic,
            assetIdCollateral,
            assetIdFee: assetIdCollateral,
            positionId,
            isBuyingSynthetic,
            expirationEpochHours,
        }, networkId);
    }
    async calculateHash() {
        let message = this.message;
        const assetIdSyntheticBn = (0, util_1.hexToBn)(message.assetIdSynthetic);
        const assetIdCollateralBn = (0, util_1.hexToBn)(message.assetIdCollateral);
        const assetIdFeeBn = (0, util_1.hexToBn)(message.assetIdFee);
        const quantumsAmountSyntheticBn = (0, util_1.decToBn)(message.quantumsAmountSynthetic);
        const quantumsAmountCollateralBn = (0, util_1.decToBn)(message.quantumsAmountCollateral);
        const quantumsAmountFeeBn = (0, util_1.decToBn)(message.quantumsAmountFee);
        const nonceBn = (0, util_1.decToBn)(message.nonce);
        const positionIdBn = (0, util_1.decToBn)(message.positionId);
        const expirationEpochHours = (0, util_1.intToBn)(message.expirationEpochHours);
        const [assetIdSellBn, assetIdBuyBn] = message.isBuyingSynthetic
            ? [assetIdCollateralBn, assetIdSyntheticBn]
            : [assetIdSyntheticBn, assetIdCollateralBn];
        const [quantumsAmountSellBn, quantumsAmountBuyBn] = message.isBuyingSynthetic
            ? [quantumsAmountCollateralBn, quantumsAmountSyntheticBn]
            : [quantumsAmountSyntheticBn, quantumsAmountCollateralBn];
        if (assetIdSyntheticBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.assetIdSynthetic) {
            throw new Error('SignableOrder: assetIdSynthetic exceeds max value');
        }
        if (assetIdCollateralBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.assetIdCollateral) {
            throw new Error('SignableOrder: assetIdCollateral exceeds max value');
        }
        if (assetIdFeeBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.assetIdFee) {
            throw new Error('SignableOrder: assetIdFee exceeds max value');
        }
        if (quantumsAmountSyntheticBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.quantumsAmount) {
            throw new Error('SignableOrder: quantumsAmountSynthetic exceeds max value');
        }
        if (quantumsAmountCollateralBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.quantumsAmount) {
            throw new Error('SignableOrder: quantumsAmountCollateral exceeds max value');
        }
        if (quantumsAmountFeeBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.quantumsAmount) {
            throw new Error('SignableOrder: quantumsAmountFee exceeds max value');
        }
        if (nonceBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.nonce) {
            throw new Error('SignableOrder: nonce exceeds max value');
        }
        if (positionIdBn.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.positionId) {
            throw new Error('SignableOrder: positionId exceeds max value');
        }
        if (expirationEpochHours.bitLength() > constants_1.ORDER_FIELD_BIT_LENGTHS.expirationEpochHours) {
            throw new Error('SignableOrder: expirationEpochHours exceeds max value');
        }
        const orderPart1 = new bn_js_1.default(quantumsAmountSellBn.toString(), 10)
            .iushln(constants_1.ORDER_FIELD_BIT_LENGTHS.quantumsAmount)
            .iadd(quantumsAmountBuyBn)
            .iushln(constants_1.ORDER_FIELD_BIT_LENGTHS.quantumsAmount)
            .iadd(quantumsAmountFeeBn)
            .iushln(constants_1.ORDER_FIELD_BIT_LENGTHS.nonce)
            .iadd(nonceBn);
        const orderPart2 = new bn_js_1.default(LIMIT_ORDER_WITH_FEES)
            .iushln(constants_1.ORDER_FIELD_BIT_LENGTHS.positionId)
            .iadd(positionIdBn) // Repeat (1/3).
            .iushln(constants_1.ORDER_FIELD_BIT_LENGTHS.positionId)
            .iadd(positionIdBn) // Repeat (2/3).
            .iushln(constants_1.ORDER_FIELD_BIT_LENGTHS.positionId)
            .iadd(positionIdBn) // Repeat (3/3).
            .iushln(constants_1.ORDER_FIELD_BIT_LENGTHS.expirationEpochHours)
            .iadd(expirationEpochHours)
            .iushln(ORDER_PADDING_BITS);
        const assetsBn = await (0, hashes_1.getCacheablePedersenHash)(await (0, hashes_1.getCacheablePedersenHash)(assetIdSellBn, assetIdBuyBn), assetIdFeeBn);
        const hash = await (0, lib_1.getPedersenHash)(await (0, lib_1.getPedersenHash)(assetsBn, orderPart1), orderPart2);
        return hash;
    }
    toStarkware() {
        return this.message;
    }
}
exports.SignableOrder = SignableOrder;
SignableOrder.fromOrder = SignableOrder.fromOrderWithClientId; // Alias.
