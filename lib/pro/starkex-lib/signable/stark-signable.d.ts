import BN from 'bn.js';
import { KeyPair, NetworkId } from '../types';
/**
 * Base class for a STARK key signable message.
 */
export declare abstract class StarkSignable<T> {
    readonly message: T;
    readonly networkId: NetworkId;
    private _hashBN;
    constructor(message: T, networkId: NetworkId);
    /**
     * Return the message hash as a hex string, no 0x prefix.
     */
    getHash(): Promise<string>;
    getHashBN(): Promise<BN>;
    /**
     * Sign the message with the given private key, represented as a hex string or hex string pair.
     */
    sign(privateKey: string | KeyPair): Promise<string>;
    /**
     * Verify the signature is valid for a given public key.
     */
    verifySignature(signature: string, publicKey: string, publicKeyYCoordinate?: string | null): Promise<boolean>;
    /**
     * Calculate the message hash.
     */
    protected abstract calculateHash(): Promise<BN>;
}
