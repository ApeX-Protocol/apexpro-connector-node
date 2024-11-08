"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignableWithdrawal = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const crypto_1 = require("../lib/crypto");
const util_1 = require("../lib/util");
const constants_2 = require("./constants");
const stark_signable_1 = require("./stark-signable");
const main_1 = require("../main");
const WITHDRAWAL_PREFIX = 7;
const WITHDRAWAL_PADDING_BITS = 49;
/**
 * Wrapper object to convert a withdrawal, and hash, sign, and verify its signature.
 */
class SignableWithdrawal extends stark_signable_1.StarkSignable {
    static fromWithdrawalWithClientId(withdrawal, networkId, asset) {
        // Make the nonce by hashing the client-provided ID.
        const nonce = (0, helpers_1.clientIdToNonce)(withdrawal.clientId);
        return SignableWithdrawal.fromWithdrawalWithNonce({
            ...withdrawal,
            clientId: undefined,
            nonce,
        }, networkId, asset);
    }
    static fromWithdrawalWithNonce(withdrawal, networkId, asset) {
        const positionId = withdrawal.positionId;
        const nonce = withdrawal.nonce;
        // The withdrawal asset is always the collateral asset.
        let quantumsAmount = (0, helpers_1.toQuantumsExact)(withdrawal.humanAmount, constants_1.COLLATERAL_ASSET);
        const currencys = (0, main_1.getPerpetual)() ? (0, main_1.getCurrencyV2)() : (0, main_1.getCurrency)();
        const currency_info = currencys.find((item) => item.id == asset);
        quantumsAmount = withdrawal.humanAmount
            ? new bignumber_js_1.default(withdrawal.humanAmount).multipliedBy(currency_info.starkExResolution).toFixed()
            : '';
        // Convert to a Unix timestamp (in hours).
        const expirationEpochHours = (0, helpers_1.isoTimestampToEpochHours)(withdrawal.expirationIsoTimestamp);
        return new SignableWithdrawal({
            positionId,
            nonce,
            quantumsAmount,
            expirationEpochHours,
            ethAddress: withdrawal.ethAddress || '',
        }, networkId);
    }
    async calculateHash() {
        const ethAddressBN = (0, util_1.hexToBn)(this.message.ethAddress);
        const positionIdBn = (0, util_1.decToBn)(this.message.positionId);
        const nonceBn = (0, util_1.decToBn)(this.message.nonce);
        const quantumsAmountBn = (0, util_1.decToBn)(this.message.quantumsAmount);
        const expirationEpochHoursBn = (0, util_1.intToBn)(this.message.expirationEpochHours);
        if (positionIdBn.bitLength() > constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.positionId) {
            throw new Error('SignableOraclePrice: positionId exceeds max value');
        }
        if (nonceBn.bitLength() > constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.nonce) {
            throw new Error('SignableOraclePrice: nonce exceeds max value');
        }
        if (quantumsAmountBn.bitLength() > constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.quantumsAmount) {
            throw new Error('SignableOraclePrice: quantumsAmount exceeds max value');
        }
        if (expirationEpochHoursBn.bitLength() > constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.expirationEpochHours) {
            throw new Error('SignableOraclePrice: expirationEpochHours exceeds max value');
        }
        const packedWithdrawalBn = new bn_js_1.default(WITHDRAWAL_PREFIX)
            .iushln(constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.positionId)
            .iadd(positionIdBn)
            .iushln(constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.nonce)
            .iadd(nonceBn)
            .iushln(constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.quantumsAmount)
            .iadd(quantumsAmountBn)
            .iushln(constants_2.WITHDRAWAL_FIELD_BIT_LENGTHS.expirationEpochHours)
            .iadd(expirationEpochHoursBn)
            .iushln(WITHDRAWAL_PADDING_BITS);
        return (0, crypto_1.getPedersenHash)(await (0, crypto_1.getPedersenHash)((0, util_1.hexToBn)((0, constants_1.COLLATERAL_ASSET_ID_BY_NETWORK_ID)()), ethAddressBN), packedWithdrawalBn);
    }
    toStarkware() {
        return this.message;
    }
}
exports.SignableWithdrawal = SignableWithdrawal;
SignableWithdrawal.fromWithdrawal = SignableWithdrawal.fromWithdrawalWithClientId; // Alias.
