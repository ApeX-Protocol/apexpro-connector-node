"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashInWorkerThread = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const lodash_1 = __importDefault(require("lodash"));
const starkware_1 = require("../starkware");
/* eslint-disable */
let Worker;
let isMainThread;
let parentPort;
let workerData;
try {
    ({ Worker, isMainThread, parentPort, workerData } = require('worker_threads'));
}
catch {
    throw new Error('Cannot use hashInWorkerThread() since worker_threads is not available');
}
/* eslint-enable */
let hashFunction = function hashInWorkerThread(_a, _b) {
    throw new Error('Expected hashInWorkerThread() to be called from the main thread');
};
if (!lodash_1.default.isNil(isMainThread)) {
    /**
     * Pedersen hash implementation that runs in a worker thread.
     */
    hashFunction = function hashInWorkerThread(a, b) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: {
                    a: a.toString(),
                    b: b.toString(),
                },
            });
            worker.on('message', (hashResult) => {
                resolve(new bn_js_1.default(hashResult, 10));
            });
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    };
}
else {
    const { a, b } = workerData;
    const hashResult = (0, starkware_1.pedersen)(new bn_js_1.default(a, 10), new bn_js_1.default(b, 10)).toString();
    parentPort.postMessage(hashResult);
}
exports.hashInWorkerThread = hashFunction;
