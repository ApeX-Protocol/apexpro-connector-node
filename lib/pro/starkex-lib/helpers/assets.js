"use strict";
/**
 * Helper functions for converting asset IDs and amounts.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQuantumsExact = toQuantumsExact;
exports.toQuantumsRoundDown = toQuantumsRoundDown;
exports.toQuantumsRoundUp = toQuantumsRoundUp;
exports.fromQuantums = fromQuantums;
exports.getStarkwareAmounts = getStarkwareAmounts;
exports.getStarkwareLimitFeeAmount = getStarkwareLimitFeeAmount;
const big_js_1 = __importDefault(require("big.js"));
const constants_1 = require("../constants");
const main_1 = require("../main");
const bignumber_js_1 = require("bignumber.js");
/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, throw an error.
 */
function toQuantumsExact(humanAmount, asset) {
    return toQuantumsHelper(humanAmount, asset, big_js_1.default.RoundDown, true);
}
/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, round down.
 */
function toQuantumsRoundDown(humanAmount, asset) {
    return toQuantumsHelper(humanAmount, asset, big_js_1.default.RoundDown, false);
}
/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, round up.
 */
function toQuantumsRoundUp(humanAmount, asset) {
    return toQuantumsHelper(humanAmount, asset, big_js_1.default.RoundUp, false);
}
function toQuantumsHelper(humanAmount, asset, rm, assertIntegerResult) {
    const amountBig = new big_js_1.default(humanAmount);
    const quantumSize = constants_1.ASSET_QUANTUM_SIZE[asset];
    const remainder = amountBig.mod(quantumSize);
    if (assertIntegerResult && !remainder.eq(0)) {
        throw new Error(`toQuantums: Amount ${humanAmount} is not a multiple of the quantum size ${quantumSize}`);
    }
    return amountBig.div(quantumSize).round(0, rm).toFixed(0);
}
/**
 * Convert a number of quantums to a human-readable asset amount.
 *
 * Example:
 *   Suppose the quantum size in Starkware for synthetic ETH is 10^10 (10 Gwei).
 *   Then fromQuantums(1000, ApexAsset.ETH), representing 10,000 Gwei, returns a value of 0.00001.
 */
function fromQuantums(quantumAmount, asset) {
    const quantumSize = constants_1.ASSET_QUANTUM_SIZE[asset];
    if (!quantumSize) {
        throw new Error(`Unknown asset ${asset}`);
    }
    return new big_js_1.default(quantumAmount).mul(quantumSize).toFixed();
}
/**
 * Get Starkware order fields, given paramters from an order and/or fill.
 *
 * Must provide either quoteAmount or price.
 */
function getStarkwareAmounts(params, networkId) {
    const { symbol, side, humanSize, humanQuoteAmount, humanPrice } = params;
    // Determine side and assets.
    const isBuyingSynthetic = side === main_1.OrderSide.BUY;
    // const assetIdSynthetic = SYNTHETIC_ASSET_ID_MAP[syntheticAsset];
    let symbols = (0, main_1.getPerpetual)() ? (0, main_1.getSymbolsV2)() : (0, main_1.getSymbols)();
    let symbol_info = symbols[symbol];
    let assetIdSynthetic = '';
    if (symbols[symbol]) {
        assetIdSynthetic = symbols[symbol]['starkExSyntheticAssetId'];
    }
    if (!assetIdSynthetic) {
        throw new Error(`Unknown market ${symbol}`);
    }
    // Convert the synthetic amount to Starkware quantums.
    // const quantumsAmountSynthetic = toQuantumsExact(humanSize, syntheticAsset);
    // Get the human-readable collateral asset amount (a.k.a. "quote amount").
    const humanAmountCollateral = typeof humanQuoteAmount === 'string' ? humanQuoteAmount : new big_js_1.default(humanSize).times(humanPrice).toFixed(); // Non-null assertion safe based on types.
    // If quoteAmount was specified, don't allow rounding.
    // Otherwise, round differently depending on the order side.
    let toQuantumsFnForCost = toQuantumsExact;
    if (typeof humanQuoteAmount !== 'string') {
        toQuantumsFnForCost = isBuyingSynthetic ? toQuantumsRoundUp : toQuantumsRoundDown;
    }
    // const quantumsAmountCollateral = toQuantumsFnForCost(
    //   humanAmountCollateral,
    //   COLLATERAL_ASSET
    // );
    const msg = {
        quantumsAmountSynthetic: '',
        quantumsAmountCollateral: '',
        assetIdSynthetic,
        assetIdCollateral: (0, constants_1.COLLATERAL_ASSET_ID_BY_NETWORK_ID)(),
        isBuyingSynthetic,
    };
    // quantumsAmountSynthetic 数量 humanSize, 数量精度 symbol.starkExResolution
    msg.quantumsAmountSynthetic = humanSize
        ? new bignumber_js_1.BigNumber(humanSize).multipliedBy(symbol_info.starkExResolution).toFixed()
        : '';
    // 金额精度, 买卖 currency.USDC.starkExResolution
    const quoteToken = symbol_info.settleCurrencyId;
    const currencys = (0, main_1.getPerpetual)() ? (0, main_1.getCurrencyV2)() : (0, main_1.getCurrency)();
    const currency_info = currencys.find((item) => item.id == quoteToken);
    msg.quantumsAmountCollateral = humanPrice
        ? new bignumber_js_1.BigNumber(new bignumber_js_1.BigNumber(humanPrice).multipliedBy(humanSize).toNumber())
            .multipliedBy(currency_info.starkExResolution)
            .toFixed()
        : '';
    return msg;
}
/**
 * Convert a limit fee fraction for an order into a collateral quantums amount.
 */
function getStarkwareLimitFeeAmount(limitFee, symbol) {
    // Constrain the limit fee to six decimals of precision. The final fee amount must be rounded up.
    let symbols = (0, main_1.getPerpetual)() ? (0, main_1.getSymbolsV2)() : (0, main_1.getSymbols)();
    let symbol_info = symbols[symbol];
    const quoteToken = symbol_info.settleCurrencyId;
    const currencys = (0, main_1.getPerpetual)() ? (0, main_1.getCurrencyV2)() : (0, main_1.getCurrency)();
    const currency_info = currencys.find((item) => item.id == quoteToken);
    return new bignumber_js_1.BigNumber(limitFee).multipliedBy(currency_info.starkExResolution).toFixed();
    // return new Big(limitFee)
    //   .round(6, Big.RoundDown)
    //   .times(quantumsAmountCollateral)
    //   .round(0, Big.RoundUp)
    //   .toFixed(0);
}
