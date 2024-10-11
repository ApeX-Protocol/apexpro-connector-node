import { BasicException } from '../BasicException';
import lodash from 'lodash';

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
