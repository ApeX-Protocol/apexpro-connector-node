"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicApi = void 0;
class PublicApi {
    constructor(apiTool) {
        this.apiTool = apiTool;
    }
    async time() {
        return this.apiTool.apiRequest('/api/v3/time', 'get');
    }
    async symbols() {
        return this.apiTool.apiRequest('/api/v3/symbols', 'get');
    }
    async depth(symbol, limit = 100) {
        return this.apiTool.apiRequest('/api/v3/depth', 'get', {
            symbol,
            limit,
        });
    }
    async trades(symbol, limit, from) {
        return this.apiTool.apiRequest('/api/v3/trades', 'get', {
            symbol,
            limit,
            from,
        });
    }
    async klines(symbol, interval, start, end, limit) {
        return this.apiTool.apiRequest('/api/v3/klines', 'get', {
            symbol,
            interval,
            start,
            end,
            limit,
        });
    }
    async tickers(symbol) {
        return this.apiTool.apiRequest('/api/v3/ticker', 'get', { symbol });
    }
    async historyFunding(symbol, limit, beginTimeInclusive, endTimeExclusive, page) {
        return this.apiTool.apiRequest('/api/v3/history-funding', 'get', {
            symbol,
            page,
            beginTimeInclusive,
            endTimeExclusive,
            limit,
        });
    }
    async checkUserExist(ethAddress) {
        return this.apiTool.apiRequest('/api/v3/check-user-exist', 'get', {
            ethAddress,
        });
    }
}
exports.PublicApi = PublicApi;
