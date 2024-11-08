import { KeyPair } from './starkex-lib';
import { ApiKeyCredentials, ApiTool, Clock } from './apexpro';
export declare class ClientConfig {
    apiKeyCredentials: ApiKeyCredentials;
    starkKeyPair: KeyPair;
    clock: Clock;
    apiTool: ApiTool;
    networkId: number;
    accountId: string;
}
export declare class ENV {
    url: string;
    networkId: number;
    isProd: boolean;
    registerChainId: number;
    constructor(url: string, networkId: number);
}
export declare const PROD: ENV;
export declare const QA: ENV;
