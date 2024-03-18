/**
 * Helper functions for converting asset IDs and amounts.
 */

import Big from 'big.js';

import { ASSET_QUANTUM_SIZE, COLLATERAL_ASSET_ID_BY_NETWORK_ID } from '../constants';
import { WithPrice, WithQuoteAmount, StarkwareAmounts, NetworkId } from '../types';
import { ApexAsset, OrderSide, getSymbols, getCurrency, getPerpetual, getSymbolsV2, getCurrencyV2 } from '../main';
import { BigNumber } from 'bignumber.js';

/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, throw an error.
 */
export function toQuantumsExact(humanAmount: string, asset: ApexAsset): string {
  return toQuantumsHelper(humanAmount, asset, Big.RoundDown, true);
}

/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, round down.
 */
export function toQuantumsRoundDown(humanAmount: string, asset: ApexAsset): string {
  return toQuantumsHelper(humanAmount, asset, Big.RoundDown, false);
}

/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, round up.
 */
export function toQuantumsRoundUp(humanAmount: string, asset: ApexAsset): string {
  return toQuantumsHelper(humanAmount, asset, Big.RoundUp, false);
}

function toQuantumsHelper(humanAmount: string, asset: ApexAsset, rm: any, assertIntegerResult: boolean): string {
  const amountBig = new Big(humanAmount);
  const quantumSize = ASSET_QUANTUM_SIZE[asset];
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
export function fromQuantums(quantumAmount: string, asset: ApexAsset): string {
  const quantumSize = ASSET_QUANTUM_SIZE[asset];
  if (!quantumSize) {
    throw new Error(`Unknown asset ${asset}`);
  }
  return new Big(quantumAmount).mul(quantumSize).toFixed();
}

/**
 * Get Starkware order fields, given paramters from an order and/or fill.
 *
 * Must provide either quoteAmount or price.
 */
export function getStarkwareAmounts(
  params: {
    symbol: string;
    side: OrderSide;
    humanSize: string;
  } & (WithPrice | WithQuoteAmount),
  networkId: NetworkId,
): StarkwareAmounts {
  const { symbol, side, humanSize, humanQuoteAmount, humanPrice } = params;
  // Determine side and assets.
  const isBuyingSynthetic = side === OrderSide.BUY;
  // const assetIdSynthetic = SYNTHETIC_ASSET_ID_MAP[syntheticAsset];
  let symbols = getPerpetual() ? getSymbolsV2() : getSymbols();
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
  const humanAmountCollateral =
    typeof humanQuoteAmount === 'string' ? humanQuoteAmount : new Big(humanSize).times(humanPrice!).toFixed(); // Non-null assertion safe based on types.

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
    assetIdCollateral: COLLATERAL_ASSET_ID_BY_NETWORK_ID(),
    isBuyingSynthetic,
  };
  // quantumsAmountSynthetic 数量 humanSize, 数量精度 symbol.starkExResolution
  msg.quantumsAmountSynthetic = humanSize
    ? new BigNumber(humanSize).multipliedBy(symbol_info.starkExResolution).toFixed()
    : '';
  // 金额精度, 买卖 currency.USDC.starkExResolution
  const quoteToken = symbol_info.settleCurrencyId;
  const currencys = getPerpetual() ? getCurrencyV2() : getCurrency();
  const currency_info: any = currencys.find((item) => item.id == quoteToken);
  msg.quantumsAmountCollateral = humanPrice
    ? new BigNumber(new BigNumber(humanPrice).multipliedBy(humanSize).toNumber())
        .multipliedBy(currency_info.starkExResolution)
        .toFixed()
    : '';
  return msg;
}

/**
 * Convert a limit fee fraction for an order into a collateral quantums amount.
 */
export function getStarkwareLimitFeeAmount(limitFee: string, symbol: string): string {
  // Constrain the limit fee to six decimals of precision. The final fee amount must be rounded up.
  let symbols = getPerpetual() ? getSymbolsV2() : getSymbols();
  let symbol_info = symbols[symbol];
  const quoteToken = symbol_info.settleCurrencyId;
  const currencys = getPerpetual() ? getCurrencyV2() : getCurrency();
  const currency_info: any = currencys.find((item) => item.id == quoteToken);
  return new BigNumber(limitFee).multipliedBy(currency_info.starkExResolution).toFixed();
  // return new Big(limitFee)
  //   .round(6, Big.RoundDown)
  //   .times(quantumsAmountCollateral)
  //   .round(0, Big.RoundUp)
  //   .toFixed(0);
}
