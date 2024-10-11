import { KlineObject, TickerObject, DepthObject, HistoryFundingObject, Metadata, TradeObject } from "./interface";
import { ApiTool } from "./tool/ApiTool";

export class PublicApi {
  private apiTool: ApiTool;

  constructor(apiTool: ApiTool) {
    this.apiTool = apiTool;
  }

  async time(): Promise<{ time: number }> {
    return this.apiTool.apiRequest('/api/v3/time', 'get');
  }

  async symbols(): Promise<Metadata> {
    return this.apiTool.apiRequest('/api/v3/symbols', 'get');
  }

  async depth(symbol: string, limit: number = 100): Promise<DepthObject> {
    return this.apiTool.apiRequest('/api/v3/depth', 'get', {
      symbol,
      limit,
    });
  }

  async trades(symbol: string, limit?: number, from?: string): Promise<TradeObject[]> {
    return this.apiTool.apiRequest('/api/v3/trades', 'get', {
      symbol,
      limit,
      from,
    });
  }

  async klines(
    symbol: string,
    interval: '1' | '5' | '15' | '30' | '60' | '120' | '240' | '360' | '720' | 'D' | 'M' | 'W',
    start?: number,
    end?: number,
    limit?: number,
  ): Promise<KlineObject[]> {
    return this.apiTool.apiRequest('/api/v3/klines', 'get', {
      symbol,
      interval,
      start,
      end,
      limit,
    });
  }

  async tickers(symbol: string): Promise<TickerObject[]> {
    return this.apiTool.apiRequest<TickerObject[]>('/api/v3/ticker', 'get', { symbol });
  }

  async historyFunding(
    symbol: string,
    limit?: number,
    beginTimeInclusive?: number,
    endTimeExclusive?: number,
    page?: number,
  ): Promise<HistoryFundingObject[]> {
    return this.apiTool.apiRequest('/api/v3/history-funding', 'get', {
      symbol,
      page,
      beginTimeInclusive,
      endTimeExclusive,
      limit,
    });
  }

  async checkUserExist(ethAddress: string): Promise<boolean> {
    return this.apiTool.apiRequest('/api/v3/check-user-exist', 'get', {
      ethAddress,
    });
  }
}
