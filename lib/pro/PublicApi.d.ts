import { ApiTool, DepthObject, HistoryFundingObject, KlineObject, PerpetualObject, SymbolObject, TickerObject, TradeObject } from './apexpro';
export declare class PublicApi {
    private apiTool;
    constructor(apiTool: ApiTool);
    /**
     * GET System Time
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-system-time
     */
    time(): Promise<{
        time: number;
    }>;
    /**
     * GET All Config Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-all-config-data
     */
    symbols(): Promise<SymbolObject>;
    symbolsV2(): Promise<PerpetualObject>;
    /**
     * GET Market Depth
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-market-depth
     * @param symbol use crossSymbolName responded from All Config Data
     * @param limit  Default at 100
     */
    depth(symbol: string, limit?: number): Promise<DepthObject>;
    /**
     * GET Newest Trading Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-newest-trading-data
     * @param symbol use crossSymbolName responded from All Config Data
     * @param limit Limit
     * @param from  Return to latest data as default
     */
    trades(symbol: string, limit?: number, from?: string): Promise<TradeObject[]>;
    /**
     * GET Candlestick Chart Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-candlestick-chart-data
     * @param symbol use crossSymbolName responded from All Config Data
     * @param interval Candlestick chart time indicators: Numbers represent minutes, D for Days, M for Month and W for Week — 1 5 15 30 60 120 240 360 720 "D" "M" "W"
     * @param start Start time
     * @param end End time
     * @param limit Limit
     */
    klines(symbol: string, interval: '1' | '5' | '15' | '30' | '60' | '120' | '240' | '360' | '720' | 'D' | 'M' | 'W', start?: number, end?: number, limit?: number): Promise<KlineObject[]>;
    /**
     * GET Ticker Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-ticker-data
     * @param symbol use crossSymbolName responded from All Config Data
     */
    tickers(symbol: string): Promise<TickerObject[]>;
    /**
     * GET Funding Rate History
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-funding-rate-history
     * @param symbol use crossSymbolName responded from All Config Data
     * @param limit Default at 100
     * @param beginTimeInclusive 	Start time
     * @param endTimeExclusive End time
     * @param page Page numbers start from 0
     */
    historyFunding(symbol: string, limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number): Promise<HistoryFundingObject[]>;
    historyFundingV2(symbol: string, limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number): Promise<HistoryFundingObject[]>;
    /**
     * GET Check If User Exists
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-check-if-user-exists
     * @param ethAddress 0x111111
     */
    checkUserExist(ethAddress: string): Promise<boolean>;
}
