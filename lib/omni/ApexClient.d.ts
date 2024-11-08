import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';
import { ClientConfig, ENV } from './Constant';
import { AccountObject, ApiKeyCredentials, UserObject } from './interface';
import { ApiTool } from './tool/ApiTool';
import { ZkLinkSigner } from '../packages/node-dist/zklink-sdk-node';
export declare class ApexClientOmni {
    apiTool: ApiTool;
    publicApi: PublicApi;
    privateApi: PrivateApi;
    clientConfig: ClientConfig;
    env: ENV;
    user: UserObject;
    account: AccountObject;
    signer: ZkLinkSigner;
    symbols: {
        [key: string]: any;
    };
    private seed;
    constructor(env?: ENV);
    init(apiKeyCredentials: ApiKeyCredentials, seed: string): Promise<void>;
    initZkSigner(): ZkLinkSigner;
    private initClock;
    private initConfig;
    private checkAccountId;
    private checkL2Key;
    private initSymbol;
}
