import lodash from 'lodash';
import { BasicException } from './BasicException';
import { ObjectType } from '../interface';

export const SLEEP_MS: number = 1000;

/**
 * @param ms
 */
export const sleep = async (ms: number) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(1);
    }, ms),
  );
};

/**
 * @param value
 */
export const isNullOrBlank = (value: string) => {
  return !value || value === undefined || value === '' || value.length === 0;
};

/**
 * @param func
 * @param retryCount
 * @param sleepMS
 */
export const retry = async (func: () => any, retryCount: number = 3, sleepMS = SLEEP_MS) => {
  let count = retryCount;
  do {
    try {
      return await func();
    } catch (e) {
      if (count > 0) {
        count--;
      }
      if (count <= 0) {
        throw new BasicException(e.toString(), e);
      }
      Trace.print('retry', e);
      await sleep(sleepMS);
    }
  } while (true);
};

export function getDefaultValue(obj: any, path: string, defaultValue: any): any {
  return lodash.get(obj, path, defaultValue) || defaultValue;
}

export function generateRandomClientId() {
  return Math.random().toString().slice(2).replace(/^0+/, '');
}

export function getPrecision(num: number | string) {
  const val = Number(num);
  if (isNaN(val)) {
    return 0;
  }

  const strList = String(num).split('.');
  return strList.length === 2 ? strList[1].length : 0;
}

function getRandomString(length: number = 16, type: 'hex' | 'D' = 'D') {
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

export function generateRandomClientIdOmni(_accountId: string) {
  const accountId = _accountId || getRandomString(24);
  return `apexomni-${accountId}-${Date.now()}-${getRandomString(6)}`;
}

export const removePrefix = (v: string, prefix = '0x') => {
  if (!v) return v;
  return v?.replace(prefix, '');
};

export function getSymbolsWithBaseInfo(
  contract: ObjectType[],
  assets: ObjectType[],
  tokens: ObjectType[],
  contractType?: 'perpetual' | 'preLaunch'
) {
  const symbols: ObjectType = {};

  if (contract.length) {
    contract.forEach((obj: ObjectType, idx: number) => {
      const symbolInfo: ObjectType = {
        ...obj,
      };

      symbolInfo.rankIdx = idx;
      symbolInfo.pricePrecision = getPrecision(obj.tickSize);
      symbolInfo.priceStep = obj.tickSize;
      symbolInfo.sizePrecision = getPrecision(obj.stepSize);
      symbolInfo.sizeStep = obj.stepSize;
      symbolInfo.baseCoin = obj.settleAssetId;
      symbolInfo.currentCoin = obj.baseTokenId;

      const baseCoinInfo = assets.find((item: ObjectType) => item.token === symbolInfo.baseCoin) || {};
      const currentCoinInfo = tokens.find((item: ObjectType) => item.token === symbolInfo.currentCoin) || {};

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


export class TraceTool {
  private logShow = true;
  private errorShow = true;
  private debugShow = true;

  public setLogShow(b: boolean) {
    this.logShow = b;
  }

  public setErrorShow(b: boolean) {
    this.errorShow = b;
  }

  public setDebugShow(b: boolean) {
    this.debugShow = b;
  }

  public log(...args) {
    // tslint:disable-next-line:no-console
    console.log(...args);
  }

  public print(...args) {
    if (this.logShow) {
      this.log(...args);
    }
  }

  public error(...args) {
    if (this.errorShow) {
      this.log(...args);
    }
  }

  public debug(...args) {
    if (this.debugShow) {
      this.log(...args);
    }
  }
}

export const Trace = new TraceTool();
