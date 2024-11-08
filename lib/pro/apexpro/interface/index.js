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
exports.OrderType = exports.OrderSide = exports.Market = exports.ApexMarket = void 0;
var ApexMarket;
(function (ApexMarket) {
    ApexMarket["BTC_USDT"] = "BTC-USDT";
    ApexMarket["BTC_USDC"] = "BTC-USDC";
    ApexMarket["BTC_USD"] = "BTC-USD";
    ApexMarket["ETH_USD"] = "ETH-USD";
    ApexMarket["ETH_USDC"] = "ETH-USDC";
    ApexMarket["LINK_USD"] = "LINK-USD";
    ApexMarket["AAVE_USD"] = "AAVE-USD";
    ApexMarket["UNI_USD"] = "UNI-USD";
    ApexMarket["SUSHI_USD"] = "SUSHI-USD";
    ApexMarket["SOL_USD"] = "SOL-USD";
    ApexMarket["YFI_USD"] = "YFI-USD";
    ApexMarket["ONEINCH_USD"] = "1INCH-USD";
    ApexMarket["AVAX_USD"] = "AVAX-USD";
    ApexMarket["SNX_USD"] = "SNX-USD";
    ApexMarket["CRV_USD"] = "CRV-USD";
    ApexMarket["UMA_USD"] = "UMA-USD";
    ApexMarket["DOT_USD"] = "DOT-USD";
    ApexMarket["DOGE_USD"] = "DOGE-USD";
    ApexMarket["MATIC_USD"] = "MATIC-USD";
    ApexMarket["MKR_USD"] = "MKR-USD";
    ApexMarket["FIL_USD"] = "FIL-USD";
    ApexMarket["ADA_USD"] = "ADA-USD";
    ApexMarket["ATOM_USD"] = "ATOM-USD";
    ApexMarket["COMP_USD"] = "COMP-USD";
    ApexMarket["BCH_USD"] = "BCH-USD";
    ApexMarket["LTC_USD"] = "LTC-USD";
    ApexMarket["EOS_USD"] = "EOS-USD";
    ApexMarket["ALGO_USD"] = "ALGO-USD";
    ApexMarket["ZRX_USD"] = "ZRX-USD";
    ApexMarket["XMR_USD"] = "XMR-USD";
    ApexMarket["ZEC_USD"] = "ZEC-USD";
    ApexMarket["ENJ_USD"] = "ENJ-USD";
    ApexMarket["ETC_USD"] = "ETC-USD";
    ApexMarket["XLM_USD"] = "XLM-USD";
    ApexMarket["TRX_USD"] = "TRX-USD";
    ApexMarket["XTZ_USD"] = "XTZ-USD";
    ApexMarket["HNT_USD"] = "HNT-USD";
})(ApexMarket || (exports.ApexMarket = ApexMarket = {}));
exports.Market = ApexMarket;
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
var OrderType;
(function (OrderType) {
    OrderType["LIMIT"] = "LIMIT";
    OrderType["MARKET"] = "MARKET";
    OrderType["CONDITION"] = "CONDITION";
})(OrderType || (exports.OrderType = OrderType = {}));
__exportStar(require("./public"), exports);
__exportStar(require("./private"), exports);
