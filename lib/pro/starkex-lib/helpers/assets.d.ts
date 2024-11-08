/**
 * Helper functions for converting asset IDs and amounts.
 */
import { WithPrice, WithQuoteAmount, StarkwareAmounts, NetworkId } from '../types';
import { ApexAsset, OrderSide } from '../main';
/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, throw an error.
 */
export declare function toQuantumsExact(humanAmount: string, asset: ApexAsset): string;
/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, round down.
 */
export declare function toQuantumsRoundDown(humanAmount: string, asset: ApexAsset): string;
/**
 * Convert a human-readable asset amount to an integer amount of the asset's quantum size.
 *
 * If the provided value is not a multiple of the quantum size, round up.
 */
export declare function toQuantumsRoundUp(humanAmount: string, asset: ApexAsset): string;
/**
 * Convert a number of quantums to a human-readable asset amount.
 *
 * Example:
 *   Suppose the quantum size in Starkware for synthetic ETH is 10^10 (10 Gwei).
 *   Then fromQuantums(1000, ApexAsset.ETH), representing 10,000 Gwei, returns a value of 0.00001.
 */
export declare function fromQuantums(quantumAmount: string, asset: ApexAsset): string;
/**
 * Get Starkware order fields, given paramters from an order and/or fill.
 *
 * Must provide either quoteAmount or price.
 */
export declare function getStarkwareAmounts(params: {
    symbol: string;
    side: OrderSide;
    humanSize: string;
} & (WithPrice | WithQuoteAmount), networkId: NetworkId): StarkwareAmounts;
/**
 * Convert a limit fee fraction for an order into a collateral quantums amount.
 */
export declare function getStarkwareLimitFeeAmount(limitFee: string, symbol: string): string;
