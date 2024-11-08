import { AccountBalanceObject, AccountObject, FundingRateObject, HistoricalPNLObject, OrderObject, UserObject, WorstPriceObject } from './apexpro';
import { ClientConfig } from './Constant';
export declare class PrivateApi {
    private clientConfig;
    constructor(clientConfig: ClientConfig);
    private request;
    private sign;
    private getSignature;
    /**
     * GET Retrieve User Data
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-retrieve-user-data
     */
    user(): Promise<UserObject>;
    /**
     * GET Retrieve User Account Data
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-retrieve-user-data
     * @param id  accountId
     * @param ethereumAddress ethereumAddress
     * @returns promise
     */
    getAccount(id: string, ethereumAddress: string): Promise<AccountObject>;
    getAccountV2(id: string, ethereumAddress: string): Promise<AccountObject>;
    /**
     * GET Trade History
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-trade-history
     * @param symbol
     * @param status
     * @param side 'BUY' | 'SELL'
     * @param limit default at 100
     * @param beginTimeInclusive Start time
     * @param endTimeExclusive End time
     * @param page Page numbers start from 0
     * @param orderType "ACTIVE","CONDITION","HISTORY"
     */
    tradeHistory(symbol?: string, status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED', side?: 'BUY' | 'SELL', limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number, orderType?: 'ACTIVE' | 'CONDITION' | 'HISTORY'): Promise<{
        orders: OrderObject[];
    }>;
    tradeHistoryV2(token: 'USDC' | 'USDT', symbol?: string, status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED', side?: 'BUY' | 'SELL', limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number, orderType?: 'ACTIVE' | 'CONDITION' | 'HISTORY'): Promise<{
        orders: OrderObject[];
    }>;
    /**
     * GET Worst Price
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-worst-price
     * @param symbol Symbol
     * @param size Order open size
     * @param side BUY or SELL order
     */
    getWorstPrice(symbol: string, size: string, side: 'BUY' | 'SELL'): Promise<WorstPriceObject>;
    getWorstPriceV2(symbol: string, size: string, side: 'BUY' | 'SELL'): Promise<WorstPriceObject>;
    /**
     * POST Creating Orders
     * @see https://api-docs.pro.apex.exchange/#privateapi-post-creating-orders
     * @param clientOrderId Randomized client id
     * @param positionId
     * @param symbol Symbol
     * @param side BUY or SELL
     * @param type  "LIMIT", "MARKET","STOP_LIMIT", "STOP_MARKET", "TAKE_PROFIT_LIMIT", "TAKE_PROFIT_MARKET"
     * @param size Size
     * @param price Price
     * @param limitFee  limitFee = price * size * takerFeeRate  ( from GET /v1/account)
     * @param timeInForce "GOOD_TIL_CANCEL", "FILL_OR_KILL", "IMMEDIATE_OR_CANCEL", "POST_ONLY"
     * @param triggerPrice Trigger price
     * @param trailingPercent Conditional order trailing-stop
     * @param reduceOnly Reduce-only
     */
    createOrder(clientOrderId: string, positionId: string, symbol: string, side: 'BUY' | 'SELL', type: 'LIMIT' | 'MARKET' | 'STOP_LIMIT' | 'STOP_MARKET' | 'TAKE_PROFIT_LIMIT' | 'TAKE_PROFIT_MARKET', size: string, price: string, limitFee: string, timeInForce?: 'GOOD_TIL_CANCEL' | 'FILL_OR_KILL' | 'IMMEDIATE_OR_CANCEL' | 'POST_ONLY', triggerPrice?: string, trailingPercent?: string, reduceOnly?: boolean, brokerId?: string): Promise<OrderObject>;
    createOrderV2(clientOrderId: string, positionId: string, symbol: string, side: 'BUY' | 'SELL', type: 'LIMIT' | 'MARKET' | 'STOP_LIMIT' | 'STOP_MARKET' | 'TAKE_PROFIT_LIMIT' | 'TAKE_PROFIT_MARKET', size: string, price: string, limitFee: string, timeInForce?: 'GOOD_TIL_CANCEL' | 'FILL_OR_KILL' | 'IMMEDIATE_OR_CANCEL' | 'POST_ONLY', triggerPrice?: string, trailingPercent?: string, reduceOnly?: boolean, brokerId?: string): Promise<OrderObject>;
    /**
     * POST Cancel Order
     * @see https://api-docs.pro.apex.exchange/#privateapi-post-cancel-order
     * @param id of the order being canceled
     */
    cancelOrder(id: string): Promise<number>;
    cancelOrderV2(id: string): Promise<number>;
    /**
     * Cancel Order By ClientOrderId
     * @see https://api-docs.pro.apex.exchange/#privateapi-post-cancel-order-by-clientorderid
     * @param id of the order being canceled
     */
    cancelOrderByClientOrderId(id: string): Promise<number>;
    cancelOrderByClientOrderIdV2(id: string): Promise<number>;
    /**
     * POST Cancel all Open Orders
     * @see https://api-docs.pro.apex.exchange/#privateapi-post-cancel-all-open-orders
     * @param symbol "BTC-USDC,ETH-USDC", Cancel all orders if none
     */
    cancelAllOrder(symbol?: string): Promise<void>;
    cancelAllOrderV2(token: 'USDC' | 'USDT', symbol?: string): Promise<void>;
    /**
     * GET Open Orders
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-open-orders
     */
    openOrders(): Promise<{
        orders: OrderObject[];
    }>;
    openOrdersV2(token: 'USDC' | 'USDT'): Promise<{
        orders: OrderObject[];
    }>;
    /**
     * GET Order ID
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-order-id
     * @param id
     */
    getOrder(id: string): Promise<OrderObject>;
    getOrderV2(id: string): Promise<OrderObject>;
    /**
     * GET Order by clientOrderId
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-order-by-clientorderid
     * @param id
     */
    getOrderByClientOrderId(id: string): Promise<OrderObject>;
    /**
     * GET All Order History
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-all-order-history
     * @param symbol
     * @param status
     * @param side 'BUY' | 'SELL'
     * @param limit default at 100
     * @param beginTimeInclusive Start time
     * @param endTimeExclusive End time
     * @param page Page numbers start from 0
     * @param orderType "ACTIVE","CONDITION","HISTORY"
     */
    historyOrders(symbol?: string, status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED', side?: 'BUY' | 'SELL', limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number, orderType?: 'ACTIVE' | 'CONDITION' | 'HISTORY'): Promise<{
        orders: OrderObject[];
        totalSize: number;
    }>;
    historyOrdersV2(token: 'USDC' | 'USDT', symbol?: string, status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED', side?: 'BUY' | 'SELL', limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number, orderType?: 'ACTIVE' | 'CONDITION' | 'HISTORY'): Promise<{
        orders: OrderObject[];
        totalSize: number;
    }>;
    /**
     * GET Funding Rate
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-funding-rate
     * @param symbol
     * @param limit default at 100
     * @param page Page numbers start from 0
     * @param beginTimeInclusive Start time
     * @param endTimeExclusive End time
     * @param side 'BUY' | 'SELL'
     * @param status
     */
    fundingRate(symbol?: string, limit?: number, page?: number, beginTimeInclusive?: number, endTimeExclusive?: number, side?: 'BUY' | 'SELL', status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED'): Promise<{
        fundingValues: FundingRateObject[];
        totalSize: number;
    }>;
    fundingRateV2(token: 'USDC' | 'USDT', symbol?: string, limit?: number, page?: number, beginTimeInclusive?: number, endTimeExclusive?: number, side?: 'BUY' | 'SELL', status?: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELED' | 'EXPIRED' | 'UNTRIGGERED'): Promise<{
        fundingValues: FundingRateObject[];
        totalSize: number;
    }>;
    /**
     * GET User Historial Profit and Loss
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-user-historial-profit-and-loss
     * @param beginTimeInclusive Start time
     * @param endTimeExclusive End time
     * @param type Position type
     * @param symbol Symbol
     * @param page Page numbers start from 0
     * @param limit Default at 100
     */
    historicalPNL(beginTimeInclusive?: number, endTimeExclusive?: number, type?: number, symbol?: string, page?: number, limit?: number): Promise<{
        historicalPnl: HistoricalPNLObject[];
        totalSize: number;
    }>;
    historicalPNLV2(token: 'USDC' | 'USDT', beginTimeInclusive?: number, endTimeExclusive?: number, type?: number, symbol?: string, page?: number, limit?: number): Promise<{
        historicalPnl: HistoricalPNLObject[];
        totalSize: number;
    }>;
    /**
     * GET Yesterday's Profit & Loss
     * @see https://api-docs.pro.apex.exchange/#privateapi-get-yesterday-39-s-profit-amp-loss
     */
    yesterdayPNL(): Promise<string>;
    yesterdayPNLV2(token: 'USDC' | 'USDT'): Promise<string>;
    /**
     * POST Sets the initial margin rate of a contract
     * @see https://api-docs.pro.apex.exchange/#privateapi-post-sets-the-initial-margin-rate-of-a-contract
     * @param symbol
     * @param initialMarginRate
     */
    setInitialMarginRate(symbol: string, initialMarginRate: string): Promise<void>;
    setInitialMarginRateV2(symbol: string, initialMarginRate: string): Promise<void>;
    /**
     * GET Account Balance
     */
    accountBalance(): Promise<AccountBalanceObject>;
    accountBalanceV2(): Promise<AccountBalanceObject>;
}
