/**
 * Helper functions for converting keys and signatures between formats.
 */
import elliptic from 'elliptic';
import { KeyPair, KeyPairWithYCoordinate, SignatureStruct } from '../types';
/**
 * Helper for if you want to access additional cryptographic functionality with a private key.
 *
 * Accepts a private key or key pair as hex strings (with or without 0x prefix).
 */
export declare function asEcKeyPair(privateKeyOrKeyPair: string | KeyPair): elliptic.ec.KeyPair;
/**
 * Helper for if you want to access additional cryptographic functionality with a public key.
 *
 * The provided parameter should be the x-coordinate of the public key, or an (x, y) pair.
 * If given as an x-coordinate, then `yCoordinateIsOdd` is required.
 */
export declare function asEcKeyPairPublic(publicKey: string | {
    x: string;
    y: string;
}, yCoordinateIsOdd?: boolean | null): elliptic.ec.KeyPair;
/**
 * Converts an `elliptic` KeyPair object to a simple object with publicKey & privateKey hex strings.
 *
 * Returns keys as 32-byte hex strings without 0x prefix.
 */
export declare function asSimpleKeyPair(ecKeyPair: elliptic.ec.KeyPair): KeyPairWithYCoordinate;
/**
 * Converts an `elliptic` Signature object to a simple object with r & s hex strings.
 *
 * Returns r and s as 32-byte hex strings without 0x prefix.
 */
export declare function asSimpleSignature(ecSignature: elliptic.ec.Signature): SignatureStruct;
/**
 * Converts an `elliptic` BasePoint object to a compressed representation: the x-coordinate as hex.
 *
 * Returns a 32-byte hex string without 0x prefix.
 */
export declare function asSimplePublicKey(ecPublicKey: elliptic.curve.base.BasePoint): string;
/**
 * Check whether the string or (x, y) pair is a valid public key.
 *
 * Will not throw, always returns a boolean.
 */
export declare function isValidPublicKey(publicKey: string | {
    x: string;
    y: string;
}): boolean;
/**
 * Convert an (r, s) signature struct to a string.
 */
export declare function serializeSignature(signature: {
    r: string;
    s: string;
}): string;
/**
 * Convert a serialized signature to an (r, s) struct.
 */
export declare function deserializeSignature(signature: string): SignatureStruct;
