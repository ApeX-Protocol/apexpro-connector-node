"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexClientV2 = exports.ApexClient = void 0;
const Constant_1 = require("./Constant");
const starkex_lib_1 = require("./starkex-lib");
const apexpro_1 = require("./apexpro");
const PublicApi_1 = require("./PublicApi");
const PrivateApi_1 = require("./PrivateApi");
const genSymbolInfo = (groupSymbols, currency, symbols) => {
    if (groupSymbols.length) {
        groupSymbols.forEach((obj, idx) => {
            const symbolInfo = {
                ...obj,
            };
            symbolInfo.rankIdx = idx;
            symbolInfo.pricePrecision = (0, apexpro_1.getPrecision)(obj.tickSize);
            symbolInfo.priceStep = Number(obj.tickSize);
            symbolInfo.sizePrecision = (0, apexpro_1.getPrecision)(obj.stepSize);
            symbolInfo.sizeStep = Number(obj.stepSize);
            symbolInfo.baseCoin = obj.settleCurrencyId;
            symbolInfo.currentCoin = obj.underlyingCurrencyId;
            const baseCoinInfo = currency.find((item) => item.id === symbolInfo.baseCoin) || {};
            const currentCoinInfo = currency.find((item) => item.id === symbolInfo.currentCoin) || {};
            symbolInfo.baseCoinPrecision = Math.abs(Math.log10(Number(baseCoinInfo.showStep) || 1));
            symbolInfo.baseCoinRealPrecision = Math.abs(Math.log10(Number(baseCoinInfo.stepSize) || 1));
            symbolInfo.currentCoinPrecision = Math.abs(Math.log10(Number(currentCoinInfo.stepSize) || 1));
            symbolInfo.baseCoinIcon = baseCoinInfo.iconUrl;
            symbolInfo.currentCoinIcon = currentCoinInfo.iconUrl;
            symbols[obj.symbol] = symbolInfo;
        });
    }
};
class ApexClient {
    constructor(env = Constant_1.PROD) {
        this.apiTool = new apexpro_1.ApiTool(env);
        this.publicApi = new PublicApi_1.PublicApi(this.apiTool);
        this.env = env;
    }
    async init(apiKeyCredentials, startPrivateKey, accountId) {
        const clientConfig = new Constant_1.ClientConfig();
        clientConfig.apiTool = this.apiTool;
        clientConfig.networkId = this.env.networkId;
        clientConfig.accountId = accountId;
        clientConfig.apiKeyCredentials = apiKeyCredentials;
        clientConfig.starkKeyPair = (0, starkex_lib_1.asSimpleKeyPair)((0, starkex_lib_1.asEcKeyPair)(startPrivateKey));
        clientConfig.clock = new apexpro_1.Clock();
        this.privateApi = new PrivateApi_1.PrivateApi(clientConfig);
        (0, starkex_lib_1.setPerpetual)('');
        await this.initClock(clientConfig);
        await this.initConfig();
    }
    async initClock(clientConfig) {
        this.clientConfig = clientConfig;
        const { time } = await this.publicApi.time();
        this.clientConfig.clock.setTimestampAdjustment(time - new Date().getTime());
    }
    async initConfig() {
        this.user = await this.privateApi.user();
        this.account = await this.privateApi.getAccount(this.clientConfig.accountId, this.user.ethereumAddress);
        this.checkAccountId();
        this.checkStarkKey();
        await this.initSymbol();
    }
    async initSymbol() {
        const symbols = {};
        const { perpetualContract: groupSymbols = [], currency, multiChain, global } = await this.publicApi.symbols();
        if (groupSymbols.length) {
            groupSymbols.forEach((obj, idx) => {
                const symbolInfo = {
                    ...obj,
                };
                symbolInfo.rankIdx = idx;
                symbolInfo.pricePrecision = (0, apexpro_1.getPrecision)(obj.tickSize);
                symbolInfo.priceStep = Number(obj.tickSize);
                symbolInfo.sizePrecision = (0, apexpro_1.getPrecision)(obj.stepSize);
                symbolInfo.sizeStep = Number(obj.stepSize);
                symbolInfo.baseCoin = obj.settleCurrencyId;
                symbolInfo.currentCoin = obj.underlyingCurrencyId;
                const baseCoinInfo = currency.find((item) => item.id === symbolInfo.baseCoin) || {};
                const currentCoinInfo = currency.find((item) => item.id === symbolInfo.currentCoin) || {};
                symbolInfo.baseCoinPrecision = Math.abs(Math.log10(Number(baseCoinInfo.showStep) || 1));
                symbolInfo.baseCoinRealPrecision = Math.abs(Math.log10(Number(baseCoinInfo.stepSize) || 1));
                symbolInfo.currentCoinPrecision = Math.abs(Math.log10(Number(currentCoinInfo.stepSize) || 1));
                symbolInfo.baseCoinIcon = baseCoinInfo.iconUrl;
                symbolInfo.currentCoinIcon = currentCoinInfo.iconUrl;
                symbols[obj.symbol] = symbolInfo;
            });
        }
        this.symbols = symbols;
        this.currency = currency;
        (0, starkex_lib_1.setSymbols)(symbols);
        (0, starkex_lib_1.setCurrency)(currency);
        (0, starkex_lib_1.setConfig)({
            multiChain,
            global,
            currency,
        });
    }
    checkAccountId() {
        if (this.account.id !== this.clientConfig.accountId) {
            throw new Error('Account Id is not match, please check your account id.');
        }
    }
    checkStarkKey() {
        let accountStarkPublicKey = this.account.starkKey.toLowerCase();
        if (!accountStarkPublicKey.startsWith('0x')) {
            accountStarkPublicKey = '0x' + accountStarkPublicKey;
        }
        let publicKey = this.clientConfig.starkKeyPair.publicKey;
        if (!publicKey.startsWith('0x')) {
            publicKey = '0x' + publicKey;
        }
        if (accountStarkPublicKey.toLowerCase() !== publicKey.toLowerCase()) {
            throw new Error('Stark Key is not match, please check your stark private key.');
        }
    }
}
exports.ApexClient = ApexClient;
class ApexClientV2 {
    constructor(env = Constant_1.PROD) {
        this.apiTool = new apexpro_1.ApiTool(env);
        this.publicApi = new PublicApi_1.PublicApi(this.apiTool);
        this.env = env;
    }
    async init(apiKeyCredentials, startPrivateKey, accountId) {
        const clientConfig = new Constant_1.ClientConfig();
        clientConfig.apiTool = this.apiTool;
        clientConfig.networkId = this.env.networkId;
        clientConfig.accountId = accountId;
        clientConfig.apiKeyCredentials = apiKeyCredentials;
        clientConfig.starkKeyPair = (0, starkex_lib_1.asSimpleKeyPair)((0, starkex_lib_1.asEcKeyPair)(startPrivateKey));
        clientConfig.clock = new apexpro_1.Clock();
        this.privateApi = new PrivateApi_1.PrivateApi(clientConfig);
        (0, starkex_lib_1.setPerpetual)('USDC');
        await this.initClock(clientConfig);
        await this.initConfig();
    }
    async initClock(clientConfig) {
        this.clientConfig = clientConfig;
        const { time } = await this.publicApi.time();
        this.clientConfig.clock.setTimestampAdjustment(time - new Date().getTime());
    }
    async initConfig() {
        this.user = await this.privateApi.user();
        // update v2
        this.account = await this.privateApi.getAccountV2(this.clientConfig.accountId, this.user.ethereumAddress);
        this.checkAccountId();
        this.checkStarkKey();
        await this.initSymbol();
    }
    async initSymbol() {
        const symbols = {};
        // update v2
        const { usdcConfig, usdtConfig } = await this.publicApi.symbolsV2();
        const { perpetualContract: usdcGroupSymbols = [], currency: usdcCurrency, multiChain: usdcMultichain, global: usdcGlobal, } = usdcConfig;
        const { perpetualContract: usdtGroupSymbols = [], currency: usdtCurrency, multiChain: usdtMultichain, global: usdtGlobal, } = usdtConfig;
        if (usdcGroupSymbols.length) {
            genSymbolInfo(usdcGroupSymbols, usdcCurrency, symbols);
        }
        if (usdcGroupSymbols.length) {
            genSymbolInfo(usdtGroupSymbols, usdtCurrency, symbols);
        }
        this.symbols = symbols;
        this.currency = {
            usdc: usdcCurrency,
            usdt: usdtCurrency,
        };
        (0, starkex_lib_1.setSymbolsV2)(symbols);
        (0, starkex_lib_1.setCurrencyV2)({ usdc: usdcCurrency, usdt: usdtCurrency });
        (0, starkex_lib_1.setConfigV2)({
            usdc: {
                multichain: usdcMultichain,
                global: usdcGlobal,
                currency: usdcCurrency,
            },
            usdt: {
                multichain: usdtMultichain,
                global: usdtGlobal,
                currency: usdtCurrency,
            },
        });
    }
    checkAccountId() {
        if (this.account.id !== this.clientConfig.accountId) {
            throw new Error('Account Id is not match, please check your account id.');
        }
    }
    checkStarkKey() {
        let accountStarkPublicKey = this.account.starkKey.toLowerCase();
        if (!accountStarkPublicKey.startsWith('0x')) {
            accountStarkPublicKey = '0x' + accountStarkPublicKey;
        }
        console.log('this.clientConfig', this.clientConfig);
        let publicKey = this.clientConfig.starkKeyPair.publicKey;
        if (!publicKey.startsWith('0x')) {
            publicKey = '0x' + publicKey;
        }
        console.log('accountStarkPublicKey', accountStarkPublicKey, publicKey);
        if (accountStarkPublicKey.toLowerCase() !== publicKey.toLowerCase()) {
            throw new Error('Stark Key is not match, please check your stark private key.');
        }
    }
}
exports.ApexClientV2 = ApexClientV2;
