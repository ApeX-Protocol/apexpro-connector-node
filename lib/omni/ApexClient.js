"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexClientOmni = void 0;
const PublicApi_1 = require("./PublicApi");
const PrivateApi_1 = require("./PrivateApi");
const Constant_1 = require("./Constant");
const Clock_1 = require("./tool/Clock");
const ApiTool_1 = require("./tool/ApiTool");
const zklink_sdk_node_1 = require("../packages/node-dist/zklink-sdk-node");
const Tool_1 = require("./tool/Tool");
class ApexClientOmni {
    constructor(env = Constant_1.PROD) {
        this.env = env;
        this.apiTool = new ApiTool_1.ApiTool(env);
        this.publicApi = new PublicApi_1.PublicApi(this.apiTool);
    }
    async init(apiKeyCredentials, seed) {
        const clientConfig = new Constant_1.ClientConfig();
        clientConfig.apiTool = this.apiTool;
        clientConfig.networkId = this.env.networkId;
        clientConfig.clock = new Clock_1.Clock();
        clientConfig.apiKeyCredentials = apiKeyCredentials;
        clientConfig.client = this;
        this.clientConfig = clientConfig;
        this.seed = seed;
        this.initZkSigner();
        this.privateApi = new PrivateApi_1.PrivateApi(clientConfig);
        await this.initClock(clientConfig);
        await this.initConfig(clientConfig);
    }
    initZkSigner() {
        const signer = zklink_sdk_node_1.ZkLinkSigner.ethSig(this.seed);
        this.signer = signer;
        this.clientConfig.signer = this.signer;
        return signer;
    }
    async initClock(clientConfig) {
        const { time } = await this.publicApi.time();
        this.clientConfig.clock.setTimestampAdjustment(time - new Date().getTime());
    }
    async initConfig(clientConfig) {
        this.user = await this.privateApi.user();
        if (!this.user?.ethereumAddress)
            throw new Error('Ethereum address is not found');
        this.account = await this.privateApi.getAccount(this.clientConfig.accountId, this.user?.ethereumAddress);
        clientConfig.zkAccountId = this.account.spotAccount.zkAccountId;
        clientConfig.accountId = this.account.id;
        this.checkAccountId();
        // this.checkL2Key();
        await this.initSymbol();
    }
    checkAccountId() {
        if (this.account.id !== this.clientConfig.accountId) {
            throw new Error('Account Id is not match, please check your account id.');
        }
    }
    checkL2Key() {
        // todo
    }
    async initSymbol() {
        const { contractConfig } = await this.publicApi.symbols();
        const { perpetualContract: perpetual = [], tokens: tokens_contract, assets: assets_contract, } = contractConfig;
        const symbols_perpetual = (0, Tool_1.getSymbolsWithBaseInfo)(perpetual, assets_contract, tokens_contract, 'perpetual');
        this.symbols = symbols_perpetual;
        return symbols_perpetual;
    }
}
exports.ApexClientOmni = ApexClientOmni;
