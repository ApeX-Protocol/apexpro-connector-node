import { KeyPairWithYCoordinate } from './types';
/**
 * Generate a pseudorandom StarkEx key pair. NOT FOR USE IN PRODUCTION.
 */
export declare function generateKeyPairUnsafe(): KeyPairWithYCoordinate;
/**
 * Generate a STARK key pair deterministically from a Buffer.
 */
export declare function keyPairFromData(data: Buffer): KeyPairWithYCoordinate;
