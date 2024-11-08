export declare const SLEEP_MS: number;
/**
 * @param ms
 */
export declare const sleep: (ms: number) => Promise<unknown>;
/**
 * @param value
 */
export declare const isNullOrBlank: (value: string) => boolean;
/**
 * @param func
 * @param retryCount
 * @param sleepMS
 */
export declare const retry: (func: () => any, retryCount?: number, sleepMS?: number) => Promise<any>;
export declare function getDefaultValue(obj: any, path: string, defaultValue: any): any;
export declare function generateRandomClientId(): string;
export declare function getPrecision(num: number | string): number;
export declare class TraceTool {
    private logShow;
    private errorShow;
    private debugShow;
    setLogShow(b: boolean): void;
    setErrorShow(b: boolean): void;
    setDebugShow(b: boolean): void;
    log(...args: any[]): void;
    print(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
}
export declare const Trace: TraceTool;
