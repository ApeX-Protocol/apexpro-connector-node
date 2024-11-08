import { ApiKeyCredentials } from "./interface";
import { ZkLinkSigner } from "../packages/node-dist/zklink-sdk-node";
import { ApiTool } from "./tool/ApiTool";
import { Clock } from "./tool/Clock";
import { ApexClientOmni } from "./ApexClient";
export declare class ClientConfig {
    apiKeyCredentials: ApiKeyCredentials;
    networkId: number;
    accountId: string;
    zkAccountId: string;
    signer: ZkLinkSigner;
    clock: Clock;
    apiTool: ApiTool;
    client: ApexClientOmni;
}
export declare class ENV {
    clock: Clock;
    url: string;
    networkId: number;
    isProd: boolean;
    registerChainId: number;
    constructor(url: string, networkId: number);
}
export declare const PROD: ENV;
export declare const QA: ENV;
