"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedersenCpp = pedersenCpp;
exports.verifySignatureCpp = verifySignatureCpp;
const bn_js_1 = __importDefault(require("bn.js"));
const starkware_1 = require("../starkware");
const swCrypto = __importStar(require("./starkware-crypto"));
/**
 * Calculate a Pedersen hash (c++ implementation).
 */
function pedersenCpp(x, y) {
    const xBigInt = BigInt(x.toString(10));
    const yBigInt = BigInt(y.toString(10));
    const result = swCrypto.pedersen(xBigInt, yBigInt);
    return new bn_js_1.default(result); // eslint-disable-line @typescript-eslint/no-explicit-any
}
/**
 * Verify a STARK signature (c++ implementation).
 *
 * IMPORTANT: It is assumed that `key` is already known to be a valid public key.
 */
function verifySignatureCpp(key, message, signature) {
    const starkKeyBigInt = BigInt(key.getPublic().getX().toString(10));
    const messageBigInt = BigInt(message.toString(10));
    // Note: `signature` is always an (r, s) pair of hex strings without 0x prefix.
    const rBigInt = BigInt(`0x${signature.r}`);
    // Invert s and pass the inverse to the verification function.
    //
    // TODO: Use a newer version of libcrypto_c_exports.so which no longer requires inverting s.
    const w = new bn_js_1.default(signature.s, 16).invm(starkware_1.starkEc.n);
    const wBigInt = BigInt(w.toString(10));
    return swCrypto.verify(starkKeyBigInt, messageBigInt, rBigInt, wBigInt);
}
