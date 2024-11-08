"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMethod = exports.StarkwareOrderType = exports.NetworkId = void 0;
var NetworkId;
(function (NetworkId) {
    NetworkId[NetworkId["MAINNET"] = 1] = "MAINNET";
    NetworkId[NetworkId["GOERLI"] = 5] = "GOERLI";
})(NetworkId || (exports.NetworkId = NetworkId = {}));
var StarkwareOrderType;
(function (StarkwareOrderType) {
    StarkwareOrderType["LIMIT_ORDER_WITH_FEES"] = "LIMIT_ORDER_WITH_FEES";
})(StarkwareOrderType || (exports.StarkwareOrderType = StarkwareOrderType = {}));
// ============ API Request Parameters ============
var ApiMethod;
(function (ApiMethod) {
    ApiMethod["POST"] = "POST";
    ApiMethod["PUT"] = "PUT";
    ApiMethod["GET"] = "GET";
    ApiMethod["DELETE"] = "DELETE";
})(ApiMethod || (exports.ApiMethod = ApiMethod = {}));
