/**
 * Starkware crypto functions implemented in JS.
 *
 * Copied from:
 * https://github.com/starkware-libs/starkex-resources/blob/0f08e6c55ad88c93499f71f2af4a2e7ae0185cdf/crypto/starkware/crypto/signature/signature.js
 *
 * Changes made by dYdX for types and error messages.
 */
import BN from 'bn.js';
import { ec as EllipticCurve } from 'elliptic';
import { SignatureStruct } from '../../types';
export declare const starkEc: any;
/**
 * Compute the pedersen hash of two inputs.
 */
export declare function pedersen(...input: [BN, BN]): BN;
export declare function sign(ecKeyPair: EllipticCurve.KeyPair, messageHash: BN): EllipticCurve.Signature;
export declare function verify(publicKey: EllipticCurve.KeyPair, messageHash: BN, signature: EllipticCurve.Signature | SignatureStruct): boolean;
