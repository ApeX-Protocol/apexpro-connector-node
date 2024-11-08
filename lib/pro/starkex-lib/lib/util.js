"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bnToHex32 = bnToHex32;
exports.normalizeHex32 = normalizeHex32;
exports.randomBuffer = randomBuffer;
exports.factToCondition = factToCondition;
exports.hexToBn = hexToBn;
exports.decToBn = decToBn;
exports.intToBn = intToBn;
exports.utf8ToBn = utf8ToBn;
exports.stripHexPrefix = stripHexPrefix;
const bn_js_1 = __importDefault(require("bn.js"));
const keccak_1 = require("ethereum-cryptography/keccak");
/**
 * Match a hex string with no hex prefix (and at least one character).
 */
const HEX_RE = /^[0-9a-fA-F]+$/;
/**
 * Match a base-10 integer.
 */
const DEC_RE = /^[0-9]+$/;
const BIT_MASK_250 = new bn_js_1.default('3FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16);
/**
 * Convert a BN to a 32-byte hex string without 0x prefix.
 */
function bnToHex32(bn) {
    return normalizeHex32(bn.toString(16));
}
/**
 * Normalize to a lowercase 32-byte hex string without 0x prefix.
 */
function normalizeHex32(hex) {
    const paddedHex = stripHexPrefix(hex).toLowerCase().padStart(64, '0');
    if (paddedHex.length !== 64) {
        throw new Error('normalizeHex32: Input does not fit in 32 bytes');
    }
    return paddedHex;
}
/**
 * Generate a random Buffer.
 */
function randomBuffer(numBytes) {
    const bytes = [];
    for (let i = 0; i < numBytes; i++) {
        bytes[i] = Math.floor(Math.random() * 0xff);
    }
    return Buffer.from(bytes);
}
/**
 * Create a "condition" Buffer (for a conditional transfer) from a factRegistry address and a fact.
 */
function factToCondition(factRegistryAddress, fact) {
    // Get Buffer equivalent of encode.packed(factRegistryAddress, fact).
    const combinedHex = `${factRegistryAddress}${normalizeHex32(fact)}`;
    const combinedBuffer = Buffer.from(stripHexPrefix(combinedHex), 'hex');
    // Hash the data, mask by 250 bits, and return the hex string equivalent.
    const hashedData = (0, keccak_1.keccak256)(combinedBuffer);
    const hashBN = hexToBn(hashedData.toString('hex'));
    console.log('combinedHex', combinedHex);
    console.log('faceToCondition-normalizeHex32', normalizeHex32(fact));
    console.log('faceToCondition-hashedData', hashedData.toString('hex'));
    console.log('faceToCondition-hashBN', hashBN.toString(16));
    const maskedHashBN = hashBN.and(BIT_MASK_250);
    return maskedHashBN.toString(16);
}
// ============ Creating BNs ============
/**
 * Convert a hex string with optional 0x prefix to a BN.
 */
function hexToBn(hex) {
    return new bn_js_1.default(stripHexPrefix(hex), 16);
}
/**
 * Convert a decimal string to a BN.
 */
function decToBn(dec) {
    const reg = new RegExp(DEC_RE);
    // if(!dec.match(DEC_RE)){
    if (!reg.test(dec)) {
        throw new Error('decToBn: Input is not a base-10 integer');
    }
    return new bn_js_1.default(dec, 10);
}
/**
 * Convert an integer number to a BN.
 */
function intToBn(int) {
    if (!Number.isInteger(int)) {
        throw new Error('intToBn: Input is not an integer');
    }
    return new bn_js_1.default(int, 10);
}
/**
 * Convert a string to a BN equal to the left-aligned UTF-8 representation with a fixed bit length.
 *
 * The specified numBits is expected to be a multiple of four.
 */
function utf8ToBn(s, numBits) {
    if (numBits % 4 !== 0) {
        throw new Error(`utf8ToBN: numBits=${numBits} is not a multiple of four`);
    }
    const buffer = Buffer.from(s);
    const hex = buffer.toString('hex');
    const paddedHex = hex.padEnd(numBits / 4, '0');
    if (paddedHex.length !== numBits / 4) {
        throw new Error(`utf8ToBN: Input does not fit in numBits=${numBits} bits`);
    }
    return new bn_js_1.default(paddedHex, 16);
}
// ============ Helper Functions ============
function stripHexPrefix(hex) {
    const hexNoPrefix = hex.replace(/^0x/, '');
    if (!hexNoPrefix.match(HEX_RE)) {
        throw new Error('stripHexPrefix: Input is not a hex string');
    }
    return hexNoPrefix;
}
