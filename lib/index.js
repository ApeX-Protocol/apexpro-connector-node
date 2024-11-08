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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OMNI_QA = exports.OMNI_PROD = exports.OmniENV = exports.QA = exports.PROD = exports.ENV = exports.ApexClientOmni = exports.ApexClientV2 = exports.ApexClient = void 0;
const ApexClient_1 = require("./pro/ApexClient");
Object.defineProperty(exports, "ApexClientV2", { enumerable: true, get: function () { return ApexClient_1.ApexClientV2; } });
const ApexClient_2 = require("./omni/ApexClient");
Object.defineProperty(exports, "ApexClientOmni", { enumerable: true, get: function () { return ApexClient_2.ApexClientOmni; } });
const Constant_1 = require("./pro/Constant");
Object.defineProperty(exports, "ENV", { enumerable: true, get: function () { return Constant_1.ENV; } });
Object.defineProperty(exports, "PROD", { enumerable: true, get: function () { return Constant_1.PROD; } });
Object.defineProperty(exports, "QA", { enumerable: true, get: function () { return Constant_1.QA; } });
const Constant_2 = require("./omni/Constant");
Object.defineProperty(exports, "OmniENV", { enumerable: true, get: function () { return Constant_2.ENV; } });
Object.defineProperty(exports, "OMNI_PROD", { enumerable: true, get: function () { return Constant_2.PROD; } });
Object.defineProperty(exports, "OMNI_QA", { enumerable: true, get: function () { return Constant_2.QA; } });
class ApexClient extends ApexClient_1.ApexClient {
    static createOmniClient(env = Constant_2.PROD) {
        return new ApexClient_2.ApexClientOmni(env);
    }
}
exports.ApexClient = ApexClient;
ApexClient.omni = ApexClient_2.ApexClientOmni;
ApexClient.OMNI_ENV = {
    PROD: Constant_2.PROD,
    QA: Constant_2.QA
};
__exportStar(require("./pro"), exports);
