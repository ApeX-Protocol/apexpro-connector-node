"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeyPairUnsafe = generateKeyPairUnsafe;
exports.keyPairFromData = keyPairFromData;
const keccak_1 = require("ethereum-cryptography/keccak");
const helpers_1 = require("./helpers");
const util_1 = require("./lib/util");
/**
 * Generate a pseudorandom StarkEx key pair. NOT FOR USE IN PRODUCTION.
 */
function generateKeyPairUnsafe() {
    return keyPairFromData((0, util_1.randomBuffer)(32));
}
/**
 * Generate a STARK key pair deterministically from a Buffer.
 */
function keyPairFromData(data) {
    if (data.length === 0) {
        throw new Error('keyPairFromData: Empty buffer');
    }
    const hashedData = (0, keccak_1.keccak256)(data);
    const hashBN = (0, util_1.hexToBn)(hashedData.toString('hex'));
    const privateKey = hashBN.iushrn(5).toString('hex'); // Remove the last five bits.
    return (0, helpers_1.asSimpleKeyPair)((0, helpers_1.asEcKeyPair)(privateKey));
}
