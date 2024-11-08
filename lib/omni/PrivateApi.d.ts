import { ClientConfig } from './Constant';
import { AccountBalanceObject, CreateOrderOptions, FundingRateObject, HistoricalPNLObject, ObjectType, OrderObject, UserObject, WorstPriceObject } from './interface';
export declare class PrivateApi {
    private clientConfig;
    private version;
    constructor(clientConfig: ClientConfig);
    updateVersion(version: string): void;
    private request;
    private sign;
    getAccount(id: string, ethereumAddress: string): Promise<any>;
    user(): Promise<UserObject>;
    tradeHistory(symbol?: string, status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED', side?: 'BUY' | 'SELL', limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number, orderType?: 'ACTIVE' | 'CONDITION' | 'HISTORY'): Promise<{
        orders: OrderObject[];
    }>;
    getWorstPrice(symbol: string, size: string, side: 'BUY' | 'SELL'): Promise<WorstPriceObject>;
    getCreateOrderSignature(params: ObjectType, clientId: string): Promise<any>;
    getZKContractSignatureObj(params: ObjectType): Promise<any>;
    createOrder(params: CreateOrderOptions): Promise<OrderObject>;
    cancelOrder(id: string): Promise<number>;
    cancelOrderByClientOrderId(id: string): Promise<number>;
    cancelAllOrder(symbol?: string): Promise<void>;
    openOrders(): Promise<{
        orders: OrderObject[];
    }>;
    historyOrders(params?: {
        symbol?: string;
        status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED';
        side?: 'BUY' | 'SELL';
        limit?: number;
        beginTimeInclusive?: number;
        endTimeExclusive?: number;
        page?: number;
        orderType?: 'ACTIVE' | 'CONDITION' | 'HISTORY';
    }): Promise<{
        orders: OrderObject[];
        totalSize: number;
    }>;
    fundingRate(symbol?: string, limit?: number, page?: number, beginTimeInclusive?: number, endTimeExclusive?: number, side?: 'BUY' | 'SELL', status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED'): Promise<{
        fundingValues: FundingRateObject[];
        totalSize: number;
    }>;
    historicalPNL(beginTimeInclusive?: number, endTimeExclusive?: number, type?: number, symbol?: string, page?: number, limit?: number): Promise<{
        historicalPnl: HistoricalPNLObject[];
        totalSize: number;
    }>;
    yesterdayPNL(): Promise<string>;
    setInitialMarginRate(symbol: string, initialMarginRate: string): Promise<void>;
    accountBalance(): Promise<AccountBalanceObject>;
}
