import { KlineObject, TickerObject, DepthObject, HistoryFundingObject, Metadata, TradeObject } from "./interface";
import { ApiTool } from "./tool/ApiTool";
export declare class PublicApi {
    private apiTool;
    constructor(apiTool: ApiTool);
    time(): Promise<{
        time: number;
    }>;
    symbols(): Promise<Metadata>;
    depth(symbol: string, limit?: number): Promise<DepthObject>;
    trades(symbol: string, limit?: number, from?: string): Promise<TradeObject[]>;
    klines(symbol: string, interval: '1' | '5' | '15' | '30' | '60' | '120' | '240' | '360' | '720' | 'D' | 'M' | 'W', start?: number, end?: number, limit?: number): Promise<KlineObject[]>;
    tickers(symbol: string): Promise<TickerObject[]>;
    historyFunding(symbol: string, limit?: number, beginTimeInclusive?: number, endTimeExclusive?: number, page?: number): Promise<HistoryFundingObject[]>;
    checkUserExist(ethAddress: string): Promise<boolean>;
}
