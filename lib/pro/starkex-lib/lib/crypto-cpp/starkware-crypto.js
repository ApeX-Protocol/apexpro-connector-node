"use strict";
/////////////////////////////////////////////////////////////////////////////////
// Copyright 2019 StarkWare Industries Ltd.                                    //
//                                                                             //
// Licensed under the Apache License, Version 2.0 (the "License").             //
// You may not use this file except in compliance with the License.            //
// You may obtain a copy of the License at                                     //
//                                                                             //
// https://www.starkware.co/open-source-license/                               //
//                                                                             //
// Unless required by applicable law or agreed to in writing,                  //
// software distributed under the License is distributed on an "AS IS" BASIS,  //
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.    //
// See the License for the specific language governing permissions             //
// and limitations under the License.                                          //
/////////////////////////////////////////////////////////////////////////////////
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedersen = pedersen;
exports.verify = verify;
exports.sign = sign;
exports.getPublicKey = getPublicKey;
// Modified by dYdX:
// - convert to TypeScript
// - throw instead of chai assert
// - other superficial updates
// - get library path locally
// - return dummy proxy if the library fails to load
const BigIntBuffer = __importStar(require("bigint-buffer"));
const CRYPTO_CPP_LIB = 'libcrypto_c_exports';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let libcrypto = new Proxy({}, {
    get() {
        throw new Error('Crypto c++ library not found or not supported on this platform');
    },
});
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    const ffi = require('ffi-napi');
    libcrypto = ffi.Library(`${__dirname}/${CRYPTO_CPP_LIB}`, {
        Hash: ['int', ['string', 'string', 'string']],
        Verify: ['bool', ['string', 'string', 'string', 'string']],
        Sign: ['int', ['string', 'string', 'string', 'string']],
        GetPublicKey: ['int', ['string', 'string']],
    });
}
catch {
    // eslint: Intentionally empty.
}
/**
 * Computes the Starkware version of the Pedersen hash of x and y.
 * Full specification of the hash function can be found here:
 *  https://starkware.co/starkex/docs/signatures.html#pedersen-hash-function
 */
function pedersen(x, y) {
    const xBuf = BigIntBuffer.toBufferLE(x, 32);
    const yBuf = BigIntBuffer.toBufferLE(y, 32);
    const resBuf = Buffer.alloc(1024);
    const res = libcrypto.Hash(xBuf, yBuf, resBuf);
    if (res !== 0) {
        throw new Error(`libcrypto.Hash: ${resBuf.toString()}`);
    }
    return BigIntBuffer.toBigIntLE(resBuf);
}
/**
 * Verifies ECDSA signature of a given hash message with a given public key.
 * Returns true if publicKey signs the message.
 * NOTE: This function assumes that the publicKey is on the curve.
 */
function verify(starkKey, message, r, s) {
    const starkKeyBuf = BigIntBuffer.toBufferLE(starkKey, 32);
    const messageBuf = BigIntBuffer.toBufferLE(message, 32);
    const rBuf = BigIntBuffer.toBufferLE(r, 32);
    const sBuf = BigIntBuffer.toBufferLE(s, 32);
    return libcrypto.Verify(starkKeyBuf, messageBuf, rBuf, sBuf);
}
/**
 * Signs message hash z with the provided privateKey, with randomness k.
 * NOTE: k should be a strong cryptographical random, and not repeat.
 */
function sign(privateKey, message, k) {
    const privateKeyBuf = BigIntBuffer.toBufferLE(privateKey, 32);
    const messageBuf = BigIntBuffer.toBufferLE(message, 32);
    const kBuf = BigIntBuffer.toBufferLE(k, 32);
    const resBuf = Buffer.alloc(1024);
    const res = libcrypto.Sign(privateKeyBuf, messageBuf, kBuf, resBuf);
    if (res !== 0) {
        throw new Error(`libcrypto.Sign: ${resBuf.toString()}`);
    }
    const r = BigIntBuffer.toBigIntLE(resBuf.slice(0, 32));
    const s = BigIntBuffer.toBigIntLE(resBuf.slice(32, 64));
    return { r, s };
}
/**
 * Deduces the public key given a private key.
 * The x coordinate of the public key is also known as the partial public key,
 * and used in StarkEx to identify the user.
 */
function getPublicKey(privateKey) {
    const privateKeyBuf = BigIntBuffer.toBufferLE(privateKey, 32);
    const resBuf = Buffer.alloc(1024);
    const res = libcrypto.GetPublicKey(privateKeyBuf, resBuf);
    if (res !== 0) {
        throw new Error(`libcrypto.GetPublicKey: ${resBuf.toString()}`);
    }
    return BigIntBuffer.toBigIntLE(resBuf);
}
