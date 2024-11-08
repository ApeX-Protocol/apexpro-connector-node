"use strict";
/**
 * Helper functions for converting keys and signatures between formats.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asEcKeyPair = asEcKeyPair;
exports.asEcKeyPairPublic = asEcKeyPairPublic;
exports.asSimpleKeyPair = asSimpleKeyPair;
exports.asSimpleSignature = asSimpleSignature;
exports.asSimplePublicKey = asSimplePublicKey;
exports.isValidPublicKey = isValidPublicKey;
exports.serializeSignature = serializeSignature;
exports.deserializeSignature = deserializeSignature;
const lodash_1 = __importDefault(require("lodash"));
const starkware_1 = require("../lib/starkware");
const util_1 = require("../lib/util");
/**
 * Helper for if you want to access additional cryptographic functionality with a private key.
 *
 * Accepts a private key or key pair as hex strings (with or without 0x prefix).
 */
function asEcKeyPair(privateKeyOrKeyPair) {
    const privateKey = typeof privateKeyOrKeyPair === 'string' ? privateKeyOrKeyPair : privateKeyOrKeyPair.privateKey;
    return starkware_1.starkEc.keyFromPrivate((0, util_1.normalizeHex32)(privateKey));
}
/**
 * Helper for if you want to access additional cryptographic functionality with a public key.
 *
 * The provided parameter should be the x-coordinate of the public key, or an (x, y) pair.
 * If given as an x-coordinate, then `yCoordinateIsOdd` is required.
 */
function asEcKeyPairPublic(publicKey, yCoordinateIsOdd = null) {
    if (typeof publicKey !== 'string') {
        if (typeof publicKey.x !== 'string' || typeof publicKey.y !== 'string') {
            throw new Error('asEcKeyPairPublic: Public key must be a string or (x, y) pair');
        }
        return starkware_1.starkEc.keyFromPublic({
            x: (0, util_1.normalizeHex32)(publicKey.x),
            y: (0, util_1.normalizeHex32)(publicKey.y),
        });
    }
    if (yCoordinateIsOdd === null) {
        throw new Error('asEcKeyPairPublic: Key was not given as an (x, y) pair, so yCoordinateIsOdd is required');
    }
    const prefix = yCoordinateIsOdd ? '03' : '02';
    const prefixedPublicKey = `${prefix}${(0, util_1.normalizeHex32)(publicKey)}`;
    // This will get the point from only the x-coordinate via:
    // https://github.com/indutny/elliptic/blob/e71b2d9359c5fe9437fbf46f1f05096de447de57/dist/elliptic.js#L1205
    //
    // See also how Starkware infers the y-coordinate:
    // https://github.com/starkware-libs/starkex-resources/blob/1eb84c6a9069950026768013f748016d3bd51d54/crypto/starkware/crypto/signature/signature.py#L164-L173
    return starkware_1.starkEc.keyFromPublic(prefixedPublicKey, 'hex');
}
/**
 * Converts an `elliptic` KeyPair object to a simple object with publicKey & privateKey hex strings.
 *
 * Returns keys as 32-byte hex strings without 0x prefix.
 */
function asSimpleKeyPair(ecKeyPair) {
    const ecPrivateKey = ecKeyPair.getPrivate();
    if (lodash_1.default.isNil(ecPrivateKey)) {
        throw new Error('asSimpleKeyPair: Key pair has no private key');
    }
    const ecPublicKey = ecKeyPair.getPublic();
    return {
        publicKey: (0, util_1.bnToHex32)(ecPublicKey.getX()),
        publicKeyYCoordinate: (0, util_1.bnToHex32)(ecPublicKey.getY()),
        privateKey: (0, util_1.bnToHex32)(ecPrivateKey),
    };
}
/**
 * Converts an `elliptic` Signature object to a simple object with r & s hex strings.
 *
 * Returns r and s as 32-byte hex strings without 0x prefix.
 */
function asSimpleSignature(ecSignature) {
    return {
        r: (0, util_1.bnToHex32)(ecSignature.r),
        s: (0, util_1.bnToHex32)(ecSignature.s),
    };
}
/**
 * Converts an `elliptic` BasePoint object to a compressed representation: the x-coordinate as hex.
 *
 * Returns a 32-byte hex string without 0x prefix.
 */
function asSimplePublicKey(ecPublicKey) {
    return (0, util_1.bnToHex32)(ecPublicKey.getX());
}
/**
 * Check whether the string or (x, y) pair is a valid public key.
 *
 * Will not throw, always returns a boolean.
 */
function isValidPublicKey(publicKey) {
    try {
        const ecPublicKey = asEcKeyPairPublic(publicKey, false);
        if (!ecPublicKey.validate().result) {
            return false;
        }
        // Return false for out-of-range values and non-hex strings.
        const expectedX = publicKey.x || publicKey;
        const resultX = ecPublicKey.getPublic().getX().toString(16);
        if ((0, util_1.normalizeHex32)(resultX) !== (0, util_1.normalizeHex32)(expectedX)) {
            return false;
        }
        return true;
    }
    catch (error) {
        // Just catch everything. Public keys which throw include 0 and (2^251 + 1).
        return false;
    }
}
/**
 * Convert an (r, s) signature struct to a string.
 */
function serializeSignature(signature) {
    return `${(0, util_1.normalizeHex32)(signature.r)}${(0, util_1.normalizeHex32)(signature.s)}`;
}
/**
 * Convert a serialized signature to an (r, s) struct.
 */
function deserializeSignature(signature) {
    if (signature.length !== 128) {
        throw new Error(`Invalid serialized signature, expected a hex string with length 128: ${signature}`);
    }
    return {
        r: signature.slice(0, 64),
        s: signature.slice(64),
    };
}
