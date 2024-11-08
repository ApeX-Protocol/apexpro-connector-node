import { ClientConfig, ENV } from './Constant';
import { AccountObject, ApiKeyCredentials, ApiTool, CurrencyObject, KeyPair, PerpetualCurrencyObject, SymbolInfoObject, UserObject } from './apexpro';
import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';
export declare class ApexClient {
    apiTool: ApiTool;
    publicApi: PublicApi;
    privateApi: PrivateApi;
    clientConfig: ClientConfig;
    env: ENV;
    user: UserObject;
    account: AccountObject;
    symbols: {
        [key: string]: SymbolInfoObject;
    };
    currency: CurrencyObject[];
    constructor(env?: ENV);
    init(apiKeyCredentials: ApiKeyCredentials, startPrivateKey: string | KeyPair, accountId: string): Promise<void>;
    private initClock;
    private initConfig;
    private initSymbol;
    private checkAccountId;
    private checkStarkKey;
}
export declare class ApexClientV2 {
    apiTool: ApiTool;
    publicApi: PublicApi;
    privateApi: PrivateApi;
    clientConfig: ClientConfig;
    env: ENV;
    user: UserObject;
    account: AccountObject;
    symbols: {
        [key: string]: SymbolInfoObject;
    };
    currency: PerpetualCurrencyObject;
    constructor(env?: ENV);
    init(apiKeyCredentials: ApiKeyCredentials, startPrivateKey: string | KeyPair, accountId: string): Promise<void>;
    private initClock;
    private initConfig;
    private initSymbol;
    private checkAccountId;
    private checkStarkKey;
}
