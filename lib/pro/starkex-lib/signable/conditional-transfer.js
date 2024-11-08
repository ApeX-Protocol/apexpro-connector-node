"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignableConditionalTransfer = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const lib_1 = require("../lib");
const util_1 = require("../lib/util");
const constants_2 = require("./constants");
const hashes_1 = require("./hashes");
const stark_signable_1 = require("./stark-signable");
// Note: Fees are not supported for conditional transfers.
const MAX_AMOUNT_FEE_BN = new bn_js_1.default(0);
const CONDITIONAL_TRANSFER_PREFIX = 5;
const CONDITIONAL_TRANSFER_PADDING_BITS = 81;
/**
 * Wrapper object to convert a conditional transfer, and hash, sign, and verify its signature.
 */
class SignableConditionalTransfer extends stark_signable_1.StarkSignable {
    static fromTransfer(transfer, networkId) {
        const nonce = (0, helpers_1.clientIdToNonce)(transfer.clientId);
        // The transfer asset is always the collateral asset.
        const quantumsAmount = (0, helpers_1.toQuantumsExact)(transfer.humanAmount, constants_1.COLLATERAL_ASSET);
        // Convert to a Unix timestamp (in hours).
        const expirationEpochHours = (0, helpers_1.isoTimestampToEpochHours)(transfer.expirationIsoTimestamp);
        return new SignableConditionalTransfer({
            senderPositionId: transfer.senderPositionId,
            receiverPositionId: transfer.receiverPositionId,
            receiverPublicKey: transfer.receiverPublicKey,
            condition: (0, util_1.factToCondition)(transfer.factRegistryAddress, transfer.fact),
            quantumsAmount,
            nonce,
            expirationEpochHours,
        }, networkId);
    }
    async calculateHash() {
        const senderPositionIdBn = (0, util_1.decToBn)(this.message.senderPositionId);
        const receiverPositionIdBn = (0, util_1.decToBn)(this.message.receiverPositionId);
        const receiverPublicKeyBn = (0, util_1.hexToBn)(this.message.receiverPublicKey);
        const conditionBn = (0, util_1.hexToBn)(this.message.condition);
        const quantumsAmountBn = (0, util_1.decToBn)(this.message.quantumsAmount);
        const nonceBn = (0, util_1.decToBn)(this.message.nonce);
        const expirationEpochHoursBn = (0, util_1.intToBn)(this.message.expirationEpochHours);
        if (senderPositionIdBn.bitLength() > constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.positionId) {
            throw new Error('SignableOraclePrice: senderPositionId exceeds max value');
        }
        if (receiverPositionIdBn.bitLength() > constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.positionId) {
            throw new Error('SignableOraclePrice: receiverPositionId exceeds max value');
        }
        if (receiverPublicKeyBn.bitLength() > constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.receiverPublicKey) {
            throw new Error('SignableOraclePrice: receiverPublicKey exceeds max value');
        }
        if (conditionBn.bitLength() > constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.condition) {
            throw new Error('SignableOraclePrice: condition exceeds max value');
        }
        if (quantumsAmountBn.bitLength() > constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.quantumsAmount) {
            throw new Error('SignableOraclePrice: quantumsAmount exceeds max value');
        }
        if (nonceBn.bitLength() > constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.nonce) {
            throw new Error('SignableOraclePrice: nonce exceeds max value');
        }
        if (expirationEpochHoursBn.bitLength() > constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.expirationEpochHours) {
            throw new Error('SignableOraclePrice: expirationEpochHours exceeds max value');
        }
        // The transfer asset is always the collateral asset.
        // Fees are not supported for conditional transfers.
        const assetIds = await (0, hashes_1.getCacheablePedersenHash)((0, util_1.hexToBn)((0, constants_1.COLLATERAL_ASSET_ID_BY_NETWORK_ID)()), constants_2.TRANSFER_FEE_ASSET_ID_BN);
        const transferPart1 = await (0, lib_1.getPedersenHash)(await (0, lib_1.getPedersenHash)(assetIds, receiverPublicKeyBn), conditionBn);
        // Note: Use toString() to avoid mutating senderPositionIdBn.
        const transferPart2 = new bn_js_1.default(senderPositionIdBn.toString(), 10)
            .iushln(constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.positionId)
            .iadd(receiverPositionIdBn)
            .iushln(constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.positionId)
            .iadd(senderPositionIdBn)
            .iushln(constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.nonce)
            .iadd(nonceBn);
        const transferPart3 = new bn_js_1.default(CONDITIONAL_TRANSFER_PREFIX)
            .iushln(constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.quantumsAmount)
            .iadd(quantumsAmountBn)
            .iushln(constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.quantumsAmount)
            .iadd(MAX_AMOUNT_FEE_BN)
            .iushln(constants_2.CONDITIONAL_TRANSFER_FIELD_BIT_LENGTHS.expirationEpochHours)
            .iadd(expirationEpochHoursBn)
            .iushln(CONDITIONAL_TRANSFER_PADDING_BITS);
        return (0, lib_1.getPedersenHash)(await (0, lib_1.getPedersenHash)(transferPart1, transferPart2), transferPart3);
    }
    toStarkware() {
        return this.message;
    }
}
exports.SignableConditionalTransfer = SignableConditionalTransfer;
