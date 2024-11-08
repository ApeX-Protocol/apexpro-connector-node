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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.starkEc = void 0;
exports.pedersen = pedersen;
exports.sign = sign;
exports.verify = verify;
/**
 * Starkware crypto functions implemented in JS.
 *
 * Copied from:
 * https://github.com/starkware-libs/starkex-resources/blob/0f08e6c55ad88c93499f71f2af4a2e7ae0185cdf/crypto/starkware/crypto/signature/signature.js
 *
 * Changes made by dYdX for types and error messages.
 */
const bn_js_1 = __importDefault(require("bn.js"));
const elliptic_1 = require("elliptic");
const _256_1 = __importDefault(require("hash.js/lib/hash/sha/256"));
const constant_points_1 = require("./constant-points");
// Constants.
const zeroBn = new bn_js_1.default(0);
const oneBn = new bn_js_1.default(1);
const maxEcdsaVal = new bn_js_1.default('800000000000000000000000000000000000000000000000000000000000000', 16);
const prime = new bn_js_1.default('800000000000011000000000000000000000000000000000000000000000001', 16);
exports.starkEc = new elliptic_1.ec(new elliptic_1.curves.PresetCurve({
    type: 'short',
    prime: null,
    p: prime.toString(16),
    a: '00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000001',
    b: '06f21413 efbe40de 150e596d 72f7a8c5 609ad26c 15c915c1 f4cdfcb9 9cee9e89',
    n: '08000000 00000010 ffffffff ffffffff b781126d cae7b232 1e66a241 adc64d2f',
    hash: _256_1.default,
    gRed: false,
    g: constant_points_1.constantPointsHex[1],
}));
const constantPoints = constant_points_1.constantPointsHex.map((coords) => {
    return exports.starkEc.curve.point(new bn_js_1.default(coords[0], 16), new bn_js_1.default(coords[1], 16));
});
const shiftPoint = constantPoints[0];
/**
 * Compute the pedersen hash of two inputs.
 */
function pedersen(...input) {
    let point = shiftPoint;
    for (let i = 0; i < input.length; i++) {
        let x = input[i];
        if (!(x.gte(zeroBn) && x.lt(prime))) {
            throw new Error(`Input to pedersen hash out of range: ${x.toString(16)}`);
        }
        for (let j = 0; j < 252; j++) {
            const pt = constantPoints[2 + i * 252 + j];
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (point.getX().eq(pt.getX())) {
                throw new Error('Error computing pedersen hash');
            }
            if (x.and(oneBn).toNumber() !== 0) {
                point = point.add(pt);
            }
            x = x.shrn(1);
        }
    }
    return point.getX();
}
function sign(ecKeyPair, messageHash) {
    if (!bnInRange(messageHash, zeroBn, maxEcdsaVal)) {
        throw new Error('Message cannot be signed since it exceeds the max length');
    }
    const signature = ecKeyPair.sign(fixHashLength(messageHash));
    const { r, s } = signature;
    const w = s.invm(exports.starkEc.n);
    if (!bnInRange(r, oneBn, maxEcdsaVal) || !bnInRange(s, oneBn, exports.starkEc.n) || !bnInRange(w, oneBn, maxEcdsaVal)) {
        throw new Error('Sanity check failed: an invalid signature was produced');
    }
    return signature;
}
function verify(publicKey, messageHash, signature) {
    if (!bnInRange(messageHash, zeroBn, maxEcdsaVal)) {
        throw new Error('Message cannot be signed since it exceeds the max length');
    }
    const { r, s } = signature;
    const w = new bn_js_1.default(s, 16).invm(exports.starkEc.n);
    if (!bnInRange(new bn_js_1.default(r, 16), oneBn, maxEcdsaVal)) {
        throw new Error('Signature has invalid r');
    }
    if (!bnInRange(new bn_js_1.default(s, 16), oneBn, exports.starkEc.n)) {
        throw new Error('Signature has invalid s');
    }
    if (!bnInRange(w, oneBn, maxEcdsaVal)) {
        throw new Error('Signature has invalid s (inverse)');
    }
    return publicKey.verify(fixHashLength(messageHash), signature);
}
function bnInRange(input, lowerBoundInclusive, upperBoundExclusive) {
    return input.gte(lowerBoundInclusive) && input.lt(upperBoundExclusive);
}
function fixHashLength(messageHash) {
    // Convert to string, without leading zeros.
    const hashHex = messageHash.toString(16);
    if (hashHex.length <= 62) {
        // In this case, messageHash should not be transformed, as the byteLength() is at most 31,
        // so delta < 0 (see _truncateToN).
        return messageHash;
    }
    if (hashHex.length !== 63) {
        throw new Error(`Invalid hash length: ${hashHex.length} !== 63`);
    }
    // In this case delta will be 4 so we perform a shift-left of 4 bits.
    return messageHash.ushln(4);
}
