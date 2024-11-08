/**
 * Computes the Starkware version of the Pedersen hash of x and y.
 * Full specification of the hash function can be found here:
 *  https://starkware.co/starkex/docs/signatures.html#pedersen-hash-function
 */
export declare function pedersen(x: bigint, y: bigint): bigint;
/**
 * Verifies ECDSA signature of a given hash message with a given public key.
 * Returns true if publicKey signs the message.
 * NOTE: This function assumes that the publicKey is on the curve.
 */
export declare function verify(starkKey: bigint, message: bigint, r: bigint, s: bigint): boolean;
/**
 * Signs message hash z with the provided privateKey, with randomness k.
 * NOTE: k should be a strong cryptographical random, and not repeat.
 */
export declare function sign(privateKey: bigint, message: bigint, k: bigint): {
    r: bigint;
    s: bigint;
};
/**
 * Deduces the public key given a private key.
 * The x coordinate of the public key is also known as the partial public key,
 * and used in StarkEx to identify the user.
 */
export declare function getPublicKey(privateKey: bigint): bigint;
