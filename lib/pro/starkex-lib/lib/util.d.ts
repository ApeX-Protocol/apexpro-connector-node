import BN from 'bn.js';
/**
 * Convert a BN to a 32-byte hex string without 0x prefix.
 */
export declare function bnToHex32(bn: BN): string;
/**
 * Normalize to a lowercase 32-byte hex string without 0x prefix.
 */
export declare function normalizeHex32(hex: string): string;
/**
 * Generate a random Buffer.
 */
export declare function randomBuffer(numBytes: number): Buffer;
/**
 * Create a "condition" Buffer (for a conditional transfer) from a factRegistry address and a fact.
 */
export declare function factToCondition(factRegistryAddress: string, fact: string): string;
/**
 * Convert a hex string with optional 0x prefix to a BN.
 */
export declare function hexToBn(hex: string): BN;
/**
 * Convert a decimal string to a BN.
 */
export declare function decToBn(dec: string): BN;
/**
 * Convert an integer number to a BN.
 */
export declare function intToBn(int: number): BN;
/**
 * Convert a string to a BN equal to the left-aligned UTF-8 representation with a fixed bit length.
 *
 * The specified numBits is expected to be a multiple of four.
 */
export declare function utf8ToBn(s: string, numBits: number): BN;
export declare function stripHexPrefix(hex: string): string;
