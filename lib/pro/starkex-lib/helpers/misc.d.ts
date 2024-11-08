/**
 * Other helper functions for converting data for Starkware.
 */
/**
 * Generate a nonce deterministically from an arbitrary string provided by a client.
 */
export declare function nonceFromClientId(clientId: string): string;
export declare function clientIdToNonce(clientId: number | string): any;
/**
 * Convert an ISO timestamp to an epoch timestamp in seconds, rounding down.
 */
export declare function isoTimestampToEpochSeconds(isoTimestamp: string): number;
/**
 * Convert an ISO timestamp to an epoch timestamp in hours, rounding up.
 */
export declare function isoTimestampToEpochHours(isoTimestamp: string): number;
/**
 * Add expiration buffer to ensure an order signature is valid when it arrives on-chain.
 */
export declare function addOrderExpirationBufferHours(expirationEpochHours: number): number;
/**
 * Get the asset name to be signed by a price oracle. It is the market name with the hyphen removed.
 */
export declare function getSignedAssetName(market: string): string;
/**
 * Get the asset ID to be signed by a price oracle. It consists of an asset name and oracle name.
 */
export declare function getSignedAssetId(assetName: string, oracleName: string): string;
