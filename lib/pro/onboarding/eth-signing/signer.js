"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = void 0;
const es6_promisify_1 = require("es6-promisify");
const ethers_1 = require("ethers");
const web3_1 = __importDefault(require("web3"));
const main_1 = require("../interface/main");
const helpers_1 = require("./helpers");
const __1 = require("..");
class Signer {
    // ============ Constructor ============
    constructor(web3) {
        this.web3 = web3;
    }
    // ============ Functions ============
    /**
     * Returns a signable EIP712 Hash of a struct
     */
    getEIP712Hash(structHash) {
        const hash = web3_1.default.utils.soliditySha3({ t: 'bytes2', v: '0x1901' }, { t: 'bytes32', v: this.getDomainHash() }, { t: 'bytes32', v: structHash });
        // Non-null assertion operator is safe, hash is null only on empty input.
        return hash;
    }
    async ethSignTypedDataInternal(signer, data, signingMethod) {
        let rpcMethod;
        let rpcData;
        let provider = this.web3.currentProvider;
        if (provider === null) {
            throw new Error('Cannot sign since Web3 currentProvider is null');
        }
        if (typeof provider === 'string') {
            throw new Error('Cannot sign since Web3 currentProvider is a string');
        }
        provider = provider;
        let sendAsync;
        switch (signingMethod) {
            case main_1.SigningMethod.TypedData:
                sendAsync = (0, es6_promisify_1.promisify)(provider.send).bind(provider);
                rpcMethod = 'eth_signTypedData';
                rpcData = data;
                break;
            case main_1.SigningMethod.MetaMask:
                sendAsync = (0, es6_promisify_1.promisify)(provider.sendAsync).bind(provider);
                rpcMethod = 'eth_signTypedData_v3';
                rpcData = JSON.stringify(data);
                break;
            case main_1.SigningMethod.MetaMaskLatest:
                sendAsync = (0, es6_promisify_1.promisify)(provider?.sendAsync || provider?.send).bind(provider);
                rpcMethod = 'eth_signTypedData_v4';
                rpcData = JSON.stringify(data);
                break;
            case main_1.SigningMethod.CoinbaseWallet:
                sendAsync = (0, es6_promisify_1.promisify)(provider.sendAsync).bind(provider);
                rpcMethod = 'eth_signTypedData_v4';
                rpcData = data;
                break;
            default:
                throw new Error(`Invalid signing method ${signingMethod}`);
        }
        const response = await sendAsync({
            method: rpcMethod,
            params: [signer, rpcData],
            jsonrpc: '2.0',
            id: Date.now(),
        });
        const res = typeof response == 'string' ? { error: null, result: `${response}`.slice(2, 132) } : response;
        if (res.error) {
            throw new Error(res.error.message);
        }
        return `0x${(0, helpers_1.stripHexPrefix)(res.result)}0${main_1.SignatureTypes.NO_PREPEND}`;
    }
    /**
     * Sign a message with `personal_sign`.
     */
    async ethSignPersonalInternal(signer, message, env) {
        let provider = this.web3.currentProvider;
        if (provider === null) {
            throw new Error('Cannot sign since Web3 currentProvider is null');
        }
        if (typeof provider === 'string') {
            throw new Error('Cannot sign since Web3 currentProvider is a string');
        }
        provider = provider;
        const sendAsync = (0, es6_promisify_1.promisify)(provider.sendAsync || provider.send).bind(provider);
        const rpcMethod = 'personal_sign';
        let response;
        try {
            const msg = __1.web3.utils.utf8ToHex(message);
            // const r = await web3.eth.personal.sign(msg, web3.eth.accounts.wallet.[0].address, '')
            if (__1.web3.eth.accounts.wallet[0].privateKey) {
                const tempRes = await __1.web3.eth.accounts.sign(msg, __1.web3.eth.accounts.wallet[0].privateKey);
                response = tempRes.signature;
            }
            else {
                response = await sendAsync({
                    method: rpcMethod,
                    params: [msg, signer],
                    jsonrpc: '2.0',
                    id: Date.now(),
                });
            }
        }
        catch (e) {
            throw new Error('Invalid personal_sign');
        }
        const signedMsg = response.result ? response.result : response;
        const verifiedAddress = ethers_1.ethers.utils.verifyMessage(message, signedMsg);
        const ifValid = verifiedAddress.toLowerCase() === signer.toLowerCase();
        if (!ifValid) {
            throw new Error('Invalid signature');
        }
        const res = typeof response == 'string' ? { error: null, result: `${response}`.slice(2, 132) } : response;
        if (res.error) {
            throw new Error(res.error.message);
        }
        const kL2KeyHashProd = '0x3978602b67f89ae820dcc57869dfab215c0a48f7510d95baef4cef262ad38350';
        const kL2KeyHashTestnet = '0x0be1ca974483d76bfb1b0b934b192f880e1e64c4872bfe471402337a70736366';
        const kL2KeyHash = env.isProd ? kL2KeyHashProd : kL2KeyHashTestnet;
        const bytes = ethers_1.ethers.utils.toUtf8Bytes(message);
        const personalSignMessageHash = ethers_1.ethers.utils.sha256(bytes);
        if (!ethers_1.ethers.BigNumber.from(personalSignMessageHash).eq(kL2KeyHash)) {
            throw new Error('personal_sign content hash mismatch');
        }
        // Note: Using createTypedSignature() fixes the signature `v` value.
        return { value: (0, helpers_1.createTypedSignature)(res.result, main_1.SignatureTypes.PERSONAL), l2KeyHash: personalSignMessageHash };
    }
}
exports.Signer = Signer;
