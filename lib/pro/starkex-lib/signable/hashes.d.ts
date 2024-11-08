/**
 * Helpers related to pedersen hashes.
 */
import BN from 'bn.js';
import { NetworkId } from '../types';
/**
 * Calculate a pedersen hash with commonly used parameters. The hash will be cached.
 */
export declare function getCacheablePedersenHash(left: BN, right: BN): Promise<BN>;
/**
 * Pre-compute commonly used hashes.
 *
 * This function may take a while to run.
 */
export declare function preComputeHashes(networkId: NetworkId): Promise<void>;
