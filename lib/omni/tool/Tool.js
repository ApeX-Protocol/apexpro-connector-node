"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trace = exports.TraceTool = exports.removePrefix = exports.retry = exports.isNullOrBlank = exports.sleep = exports.SLEEP_MS = void 0;
exports.getDefaultValue = getDefaultValue;
exports.generateRandomClientId = generateRandomClientId;
exports.getPrecision = getPrecision;
exports.generateRandomClientIdOmni = generateRandomClientIdOmni;
exports.getSymbolsWithBaseInfo = getSymbolsWithBaseInfo;
const lodash_1 = __importDefault(require("lodash"));
const BasicException_1 = require("./BasicException");
exports.SLEEP_MS = 1000;
/**
 * @param ms
 */
const sleep = async (ms) => {
    return await new Promise((resolve) => setTimeout(() => {
        resolve(1);
    }, ms));
};
exports.sleep = sleep;
/**
 * @param value
 */
const isNullOrBlank = (value) => {
    return !value || value === undefined || value === '' || value.length === 0;
};
exports.isNullOrBlank = isNullOrBlank;
/**
 * @param func
 * @param retryCount
 * @param sleepMS
 */
const retry = async (func, retryCount = 3, sleepMS = exports.SLEEP_MS) => {
    let count = retryCount;
    do {
        try {
            return await func();
        }
        catch (e) {
            if (count > 0) {
                count--;
            }
            if (count <= 0) {
                throw new BasicException_1.BasicException(e.toString(), e);
            }
            exports.Trace.print('retry', e);
            await (0, exports.sleep)(sleepMS);
        }
    } while (true);
};
exports.retry = retry;
function getDefaultValue(obj, path, defaultValue) {
    return lodash_1.default.get(obj, path, defaultValue) || defaultValue;
}
function generateRandomClientId() {
    return Math.random().toString().slice(2).replace(/^0+/, '');
}
function getPrecision(num) {
    const val = Number(num);
    if (isNaN(val)) {
        return 0;
    }
    const strList = String(num).split('.');
    return strList.length === 2 ? strList[1].length : 0;
}
function getRandomString(length = 16, type = 'D') {
    const nonZeroNum = '123456789';
    const hexString = 'abcdef';
    const firstCharSource = type === 'hex' ? `${nonZeroNum}${hexString}` : nonZeroNum;
    const otherCharSource = type === 'hex' ? `0${nonZeroNum}${hexString}` : `0${nonZeroNum}`;
    const count = type === 'hex' ? 15 : 9;
    let result = firstCharSource[Math.floor(Math.random() * count)];
    for (let i = 1; i < length; i++) {
        result += otherCharSource[Math.floor(Math.random() * (count + 1))];
    }
    return result;
}
function generateRandomClientIdOmni(_accountId) {
    const accountId = _accountId || getRandomString(24);
    return `apexomni-${accountId}-${Date.now()}-${getRandomString(6)}`;
}
const removePrefix = (v, prefix = '0x') => {
    if (!v)
        return v;
    return v?.replace(prefix, '');
};
exports.removePrefix = removePrefix;
function getSymbolsWithBaseInfo(contract, assets, tokens, contractType) {
    const symbols = {};
    if (contract.length) {
        contract.forEach((obj, idx) => {
            const symbolInfo = {
                ...obj,
            };
            symbolInfo.rankIdx = idx;
            symbolInfo.pricePrecision = getPrecision(obj.tickSize);
            symbolInfo.priceStep = obj.tickSize;
            symbolInfo.sizePrecision = getPrecision(obj.stepSize);
            symbolInfo.sizeStep = obj.stepSize;
            symbolInfo.baseCoin = obj.settleAssetId;
            symbolInfo.currentCoin = obj.baseTokenId;
            const baseCoinInfo = assets.find((item) => item.token === symbolInfo.baseCoin) || {};
            const currentCoinInfo = tokens.find((item) => item.token === symbolInfo.currentCoin) || {};
            symbolInfo.baseCoinPrecision = Math.abs(Math.log10(baseCoinInfo.showStep || 1));
            symbolInfo.baseCoinRealPrecision = Math.abs(Math.log10(baseCoinInfo.showStep || 1));
            symbolInfo.currentCoinPrecision = Math.abs(Math.log10(currentCoinInfo.stepSize || 1));
            symbolInfo.tokenAssetId = baseCoinInfo.tokenId;
            symbolInfo.baseCoinIcon = baseCoinInfo.iconUrl;
            symbolInfo.currentCoinIcon = currentCoinInfo.iconUrl;
            symbolInfo.defaultInitialMarginRate = Number(symbolInfo.defaultInitialMarginRate) || 0;
            // tradeAll - 可以开可平；tradeNone - 不可交易；tradeClose - 仅可平仓
            symbolInfo.tradeStatus = symbolInfo.enableTrade
                ? symbolInfo.enableOpenPosition
                    ? 'tradeAll'
                    : 'tradeClose'
                : 'tradeNone';
            if (contractType) {
                symbolInfo.contractType = contractType;
            }
            symbols[obj.symbol] = symbolInfo;
        });
    }
    return symbols;
}
class TraceTool {
    constructor() {
        this.logShow = true;
        this.errorShow = true;
        this.debugShow = true;
    }
    setLogShow(b) {
        this.logShow = b;
    }
    setErrorShow(b) {
        this.errorShow = b;
    }
    setDebugShow(b) {
        this.debugShow = b;
    }
    log(...args) {
        // tslint:disable-next-line:no-console
        console.log(...args);
    }
    print(...args) {
        if (this.logShow) {
            this.log(...args);
        }
    }
    error(...args) {
        if (this.errorShow) {
            this.log(...args);
        }
    }
    debug(...args) {
        if (this.debugShow) {
            this.log(...args);
        }
    }
}
exports.TraceTool = TraceTool;
exports.Trace = new TraceTool();
