"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicApi = void 0;
class PublicApi {
    constructor(apiTool) {
        this.apiTool = apiTool;
    }
    /**
     * GET System Time
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-system-time
     */
    async time() {
        return this.apiTool.apiRequest('/api/v1/time', 'get');
    }
    /**
     * GET All Config Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-all-config-data
     */
    async symbols() {
        return this.apiTool.apiRequest('/api/v1/symbols', 'get');
    }
    async symbolsV2() {
        return this.apiTool.apiRequest('/api/v2/symbols', 'get');
    }
    /**
     * GET Market Depth
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-market-depth
     * @param symbol use crossSymbolName responded from All Config Data
     * @param limit  Default at 100
     */
    async depth(symbol, limit = 100) {
        return this.apiTool.apiRequest('/api/v1/depth', 'get', {
            symbol,
            limit,
        });
    }
    /**
     * GET Newest Trading Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-newest-trading-data
     * @param symbol use crossSymbolName responded from All Config Data
     * @param limit Limit
     * @param from  Return to latest data as default
     */
    async trades(symbol, limit, from) {
        return this.apiTool.apiRequest('/api/v1/trades', 'get', {
            symbol,
            limit,
            from,
        });
    }
    /**
     * GET Candlestick Chart Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-candlestick-chart-data
     * @param symbol use crossSymbolName responded from All Config Data
     * @param interval Candlestick chart time indicators: Numbers represent minutes, D for Days, M for Month and W for Week — 1 5 15 30 60 120 240 360 720 "D" "M" "W"
     * @param start Start time
     * @param end End time
     * @param limit Limit
     */
    async klines(symbol, interval, start, end, limit) {
        return this.apiTool.apiRequest('/api/v1/klines', 'get', {
            symbol,
            interval,
            start,
            end,
            limit,
        });
    }
    /**
     * GET Ticker Data
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-ticker-data
     * @param symbol use crossSymbolName responded from All Config Data
     */
    async tickers(symbol) {
        return this.apiTool.apiRequest('/api/v1/ticker', 'get', { symbol });
    }
    /**
     * GET Funding Rate History
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-funding-rate-history
     * @param symbol use crossSymbolName responded from All Config Data
     * @param limit Default at 100
     * @param beginTimeInclusive 	Start time
     * @param endTimeExclusive End time
     * @param page Page numbers start from 0
     */
    async historyFunding(symbol, limit, beginTimeInclusive, endTimeExclusive, page) {
        return this.apiTool.apiRequest('/api/v1/history-funding', 'get', {
            symbol,
            page,
            beginTimeInclusive,
            endTimeExclusive,
            limit,
        });
    }
    async historyFundingV2(symbol, limit, beginTimeInclusive, endTimeExclusive, page) {
        return this.apiTool.apiRequest('/api/v2/history-funding', 'get', {
            symbol,
            page,
            beginTimeInclusive,
            endTimeExclusive,
            limit,
        });
    }
    /**
     * GET Check If User Exists
     * @see https://api-docs.pro.apex.exchange/#publicapi-get-check-if-user-exists
     * @param ethAddress 0x111111
     */
    async checkUserExist(ethAddress) {
        return this.apiTool.apiRequest('/api/v1/check-user-exist', 'get', {
            ethAddress,
        });
    }
}
exports.PublicApi = PublicApi;
