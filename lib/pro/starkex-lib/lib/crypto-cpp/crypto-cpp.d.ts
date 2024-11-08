import BN from 'bn.js';
import elliptic from 'elliptic';
import { SignatureStruct } from '../../types';
/**
 * Calculate a Pedersen hash (c++ implementation).
 */
export declare function pedersenCpp(x: BN, y: BN): BN;
/**
 * Verify a STARK signature (c++ implementation).
 *
 * IMPORTANT: It is assumed that `key` is already known to be a valid public key.
 */
export declare function verifySignatureCpp(key: elliptic.ec.KeyPair, message: BN, signature: SignatureStruct): boolean;
