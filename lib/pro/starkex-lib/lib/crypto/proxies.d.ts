/**
 * Wrappers for crypto functions, allowing implementations to be swapped out.
 */
import BN from 'bn.js';
import elliptic from 'elliptic';
import { HashFunction, SignatureStruct, SigningFunction, VerificationFunction } from '../../types';
/**
 * Set the hash function implementation that will be used for all StarkSignable objects.
 */
export declare function setGlobalStarkHashImplementationNoSanityCheck(fn: HashFunction): void;
/**
 * Set the signing implementation that will be used for all StarkSignable objects.
 */
export declare function setGlobalStarkSigningImplementationNoSanityCheck(fn: SigningFunction): void;
/**
 * Set the signature verification implementation that will be used for all StarkSignable objects.
 */
export declare function setGlobalStarkVerificationImplementationNoSanityCheck(fn: VerificationFunction): void;
/**
 * Set the hash function implementation that will be used for all StarkSignable objects.
 */
export declare function setGlobalStarkHashImplementation(fn: HashFunction): Promise<void>;
/**
 * Set the signing implementation that will be used for all StarkSignable objects.
 */
export declare function setGlobalStarkSigningImplementation(fn: SigningFunction): Promise<void>;
/**
 * Set the signature verification implementation that will be used for all StarkSignable objects.
 */
export declare function setGlobalStarkVerificationImplementation(fn: VerificationFunction): Promise<void>;
/**
 * Calculate a pedersen hash.
 */
export declare function getPedersenHash(left: BN, right: BN): Promise<BN>;
/**
 * Sign a message.
 */
export declare function sign(key: elliptic.ec.KeyPair, message: BN): Promise<elliptic.ec.Signature>;
/**
 * Verify a signature.
 */
export declare function verify(key: elliptic.ec.KeyPair, message: BN, signature: SignatureStruct): Promise<boolean>;
