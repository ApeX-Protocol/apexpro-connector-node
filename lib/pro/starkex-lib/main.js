"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigV2 = exports.setConfigV2 = exports.getCurrencyV2 = exports.setCurrencyV2 = exports.getSymbolsV2 = exports.setSymbolsV2 = exports.getConfig = exports.setConfig = exports.getCurrency = exports.setCurrency = exports.getSymbols = exports.setSymbols = exports.getPerpetual = exports.setPerpetual = exports.getUSDTCurrency = exports.setUSDTCurrency = exports.getUSDCCurrency = exports.setUSDCCurrency = exports.getUSDTConfig = exports.setUSDTConfig = exports.getUSDCConfig = exports.setUSDCConfig = exports.WalletWay = exports.OrderSide = exports.ApexAsset = void 0;
var ApexAsset;
(function (ApexAsset) {
    ApexAsset["USDC"] = "USDC";
    ApexAsset["USDT"] = "USDT";
    ApexAsset["BTC"] = "BTC";
    ApexAsset["ETH"] = "ETH";
    ApexAsset["LINK"] = "LINK";
    ApexAsset["AAVE"] = "AAVE";
    ApexAsset["UNI"] = "UNI";
    ApexAsset["SUSHI"] = "SUSHI";
    ApexAsset["SOL"] = "SOL";
    ApexAsset["YFI"] = "YFI";
    ApexAsset["ONEINCH"] = "1INCH";
    ApexAsset["AVAX"] = "AVAX";
    ApexAsset["SNX"] = "SNX";
    ApexAsset["CRV"] = "CRV";
    ApexAsset["UMA"] = "UMA";
    ApexAsset["DOT"] = "DOT";
    ApexAsset["DOGE"] = "DOGE";
    ApexAsset["MATIC"] = "MATIC";
    ApexAsset["MKR"] = "MKR";
    ApexAsset["FIL"] = "FIL";
    ApexAsset["ADA"] = "ADA";
    ApexAsset["ATOM"] = "ATOM";
    ApexAsset["COMP"] = "COMP";
    ApexAsset["BCH"] = "BCH";
    ApexAsset["LTC"] = "LTC";
    ApexAsset["EOS"] = "EOS";
    ApexAsset["ALGO"] = "ALGO";
    ApexAsset["ZRX"] = "ZRX";
    ApexAsset["XMR"] = "XMR";
    ApexAsset["ZEC"] = "ZEC";
    ApexAsset["ENJ"] = "ENJ";
    ApexAsset["ETC"] = "ETC";
    ApexAsset["XLM"] = "XLM";
    ApexAsset["TRX"] = "TRX";
    ApexAsset["XTZ"] = "XTZ";
    ApexAsset["HNT"] = "HNT";
})(ApexAsset || (exports.ApexAsset = ApexAsset = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
var WalletWay;
(function (WalletWay) {
    WalletWay["MetaMask"] = "injected";
    WalletWay["CoinbaseWallet"] = "coinbaseWallet";
    WalletWay["Walletconnect"] = "walletConnect";
})(WalletWay || (exports.WalletWay = WalletWay = {}));
// V1
// 币对信息
let symbols = [];
const setSymbols = (data) => {
    symbols = data;
};
exports.setSymbols = setSymbols;
const getSymbols = () => {
    return symbols;
};
exports.getSymbols = getSymbols;
// 价值信息
let currency = [];
const setCurrency = (data) => {
    currency = data;
};
exports.setCurrency = setCurrency;
const getCurrency = () => {
    return currency;
};
exports.getCurrency = getCurrency;
// config
let config = {};
const setConfig = (data) => {
    config = data;
};
exports.setConfig = setConfig;
const getConfig = () => {
    return config;
};
exports.getConfig = getConfig;
// V2
// 合约对信息
let perpetual = '';
const setPerpetual = (data) => {
    perpetual = data;
};
exports.setPerpetual = setPerpetual;
const getPerpetual = () => {
    return perpetual;
};
exports.getPerpetual = getPerpetual;
// 币对信息
let symbolsV2 = [];
const setSymbolsV2 = (data) => {
    symbols = data;
};
exports.setSymbolsV2 = setSymbolsV2;
const getSymbolsV2 = () => {
    return symbols;
};
exports.getSymbolsV2 = getSymbolsV2;
// 价值信息
let currencyV2 = { usdc: [], usdt: [] };
const setUSDCCurrency = (data) => {
    currencyV2.usdc = data;
};
exports.setUSDCCurrency = setUSDCCurrency;
const getUSDCCurrency = () => {
    return currencyV2?.usdc;
};
exports.getUSDCCurrency = getUSDCCurrency;
const setUSDTCurrency = (data) => {
    currencyV2.usdt = data;
};
exports.setUSDTCurrency = setUSDTCurrency;
const getUSDTCurrency = () => {
    return currencyV2?.usdt;
};
exports.getUSDTCurrency = getUSDTCurrency;
const setCurrencyV2 = (data) => {
    currencyV2 = data;
};
exports.setCurrencyV2 = setCurrencyV2;
const getCurrencyV2 = () => {
    const currentPerpetual = getPerpetual()?.toLowerCase?.();
    if (currentPerpetual) {
        return currencyV2?.[currentPerpetual];
    }
    return currencyV2;
};
exports.getCurrencyV2 = getCurrencyV2;
// config
let configV2 = { usdc: {}, usdt: {} };
const setUSDCConfig = (data) => {
    configV2.usdc = data;
};
exports.setUSDCConfig = setUSDCConfig;
const getUSDCConfig = () => {
    return configV2?.usdc;
};
exports.getUSDCConfig = getUSDCConfig;
const setUSDTConfig = (data) => {
    configV2.usdt = data;
};
exports.setUSDTConfig = setUSDTConfig;
const getUSDTConfig = () => {
    return configV2?.usdt;
};
exports.getUSDTConfig = getUSDTConfig;
const setConfigV2 = (data) => {
    configV2 = data;
};
exports.setConfigV2 = setConfigV2;
const getConfigV2 = () => {
    const currentPerpetual = getPerpetual()?.toLowerCase?.();
    if (currentPerpetual) {
        return configV2?.[currentPerpetual];
    }
    return configV2;
};
exports.getConfigV2 = getConfigV2;
