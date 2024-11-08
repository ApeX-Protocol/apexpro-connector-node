"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashInWorkerThread = exports.SignableWithdrawal = exports.SignableTransfer = exports.StarkSignable = exports.SignableOrder = exports.SignableOraclePrice = exports.preComputeHashes = exports.SignableConditionalTransfer = void 0;
exports.genSimplifyOnBoardingSignature = genSimplifyOnBoardingSignature;
const helpers_1 = require("../helpers");
const lib_1 = require("../lib");
var conditional_transfer_1 = require("./conditional-transfer");
Object.defineProperty(exports, "SignableConditionalTransfer", { enumerable: true, get: function () { return conditional_transfer_1.SignableConditionalTransfer; } });
var hashes_1 = require("./hashes");
Object.defineProperty(exports, "preComputeHashes", { enumerable: true, get: function () { return hashes_1.preComputeHashes; } });
var oracle_price_1 = require("./oracle-price");
Object.defineProperty(exports, "SignableOraclePrice", { enumerable: true, get: function () { return oracle_price_1.SignableOraclePrice; } });
var order_1 = require("./order");
Object.defineProperty(exports, "SignableOrder", { enumerable: true, get: function () { return order_1.SignableOrder; } });
var stark_signable_1 = require("./stark-signable");
Object.defineProperty(exports, "StarkSignable", { enumerable: true, get: function () { return stark_signable_1.StarkSignable; } });
var transfer_1 = require("./transfer");
Object.defineProperty(exports, "SignableTransfer", { enumerable: true, get: function () { return transfer_1.SignableTransfer; } });
var withdrawal_1 = require("./withdrawal");
Object.defineProperty(exports, "SignableWithdrawal", { enumerable: true, get: function () { return withdrawal_1.SignableWithdrawal; } });
let maybeHashInWorkerThread = (_a, _b) => {
    throw new Error('Cannot use hashInWorkerThread() since worker_threads is not available');
};
try {
    /* eslint-disable @typescript-eslint/no-var-requires,global-require */
    require('worker_threads');
    // If the worker_threads module is available, update maybeHashInWorkerThread.
    // eslint-disable-next-line import/extensions
    maybeHashInWorkerThread = require('./hash-in-worker-thread').hashInWorkerThread;
    /* eslint-enable @typescript-eslint/no-var-requires,global-require */
}
catch (error) {
    // eslint: Intentionally empty.
}
exports.hashInWorkerThread = maybeHashInWorkerThread;
// 简化钱包链接，生成签名
async function genSimplifyOnBoardingSignature(privateKey, apikeyHash) {
    const ecSignature = await (0, lib_1.sign)((0, helpers_1.asEcKeyPair)(privateKey), apikeyHash);
    return (0, helpers_1.serializeSignature)((0, helpers_1.asSimpleSignature)(ecSignature));
}
