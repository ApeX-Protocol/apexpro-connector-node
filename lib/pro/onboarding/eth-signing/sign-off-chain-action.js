"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOffChainAction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ethers = __importStar(require("ethers"));
const lodash_1 = __importDefault(require("lodash"));
const web3_1 = __importDefault(require("web3"));
const main_1 = require("../interface/main");
const helpers_1 = require("./helpers");
const signer_1 = require("./signer");
// IMPORTANT: The order of these params affects the message signed with SigningMethod.PERSONAL.
//            The message should not be changed at all since it's used to generated default keys.
const PERSONAL_SIGN_DOMAIN_PARAMS = ['name', 'version', 'chainId'];
class SignOffChainAction extends signer_1.Signer {
    constructor(web3, networkId, actionStruct, { domain = 'ApeX', version = '1.0', } = {}) {
        super(web3);
        this.networkId = networkId;
        this.actionStruct = actionStruct;
        this.domain = domain;
        this.version = version;
    }
    async sign(signer, signingMethod, message, env) {
        // If the address is in the wallet, sign with it so we don't have to use the web3 provider.
        const walletAccount = 
        // Hack: The TypeScript type incorrectly has index signature on number but not string.
        this.web3.eth.accounts.wallet[signer];
        switch (signingMethod) {
            case main_1.SigningMethod.Hash:
            case main_1.SigningMethod.UnsafeHash:
            case main_1.SigningMethod.Compatibility: {
                const hash = this.getHash(message);
                const rawSignature = walletAccount
                    ? walletAccount.sign(hash).signature
                    : await this.web3.eth.sign(hash, signer);
                const hashSig = (0, helpers_1.createTypedSignature)(rawSignature, main_1.SignatureTypes.DECIMAL);
                if (signingMethod === main_1.SigningMethod.Hash) {
                    return hashSig;
                }
                const unsafeHashSig = (0, helpers_1.createTypedSignature)(rawSignature, main_1.SignatureTypes.NO_PREPEND);
                if (signingMethod === main_1.SigningMethod.UnsafeHash) {
                    return unsafeHashSig;
                }
                if (this.verify(unsafeHashSig, signer, message)) {
                    return unsafeHashSig;
                }
                return hashSig;
            }
            // @ts-ignore Fallthrough case in switch.
            case main_1.SigningMethod.TypedData:
                // If the private key is available locally, sign locally without using web3.
                if (walletAccount.privateKey) {
                    const wallet = new ethers.Wallet(walletAccount.privateKey);
                    const rawSignature = await wallet._signTypedData(this.getDomainData(), { [this.domain]: this.actionStruct }, message);
                    return (0, helpers_1.createTypedSignature)(rawSignature, main_1.SignatureTypes.NO_PREPEND);
                }
            /* falls through */
            case main_1.SigningMethod.MetaMask:
            case main_1.SigningMethod.MetaMaskLatest:
            case main_1.SigningMethod.CoinbaseWallet: {
                let data = {
                    types: {
                        EIP712Domain: helpers_1.EIP712_DOMAIN_STRUCT_NO_CONTRACT,
                        [this.domain]: this.actionStruct,
                    },
                    domain: this.getDomainData(),
                    primaryType: this.domain,
                    message,
                };
                let msg = message;
                data.types[this.domain].length = 2;
                if (msg.nonce) {
                    data.types[this.domain].push({ type: 'string', name: 'nonce' });
                }
                const signature = await this.ethSignTypedDataInternal(signer, data, signingMethod);
                return signature;
            }
            case main_1.SigningMethod.Personal: {
                const messageString = this.getPersonalSignMessage(message);
                const sig = this.ethSignPersonalInternal(signer, messageString);
                return sig;
            }
            case main_1.SigningMethod.Personal2: {
                let messageString = this.getPersonalSignMessage(message);
                // 生成starkKey 把chainId变更为envId
                const sig = this.ethSignPersonalInternal(signer, messageString.replace('chainId', 'envId'), env);
                return sig;
            }
            default:
                throw new Error(`Invalid signing method ${signingMethod}`);
        }
    }
    verify(typedSignature, expectedSigner, message) {
        if ((0, helpers_1.stripHexPrefix)(typedSignature).length !== 66 * 2) {
            throw new Error(`Unable to verify signature with invalid length: ${typedSignature}`);
        }
        const sigType = parseInt(typedSignature.slice(-2), 16);
        let hashOrMessage;
        switch (sigType) {
            case main_1.SignatureTypes.NO_PREPEND:
            case main_1.SignatureTypes.DECIMAL:
            case main_1.SignatureTypes.HEXADECIMAL:
                hashOrMessage = this.getHash(message);
                break;
            case main_1.SignatureTypes.PERSONAL:
                hashOrMessage = this.getPersonalSignMessage(message);
                break;
            default:
                throw new Error(`Invalid signature type: ${sigType}`);
        }
        const signer = (0, helpers_1.ecRecoverTypedSignature)(hashOrMessage, typedSignature);
        return (0, helpers_1.addressesAreEqual)(signer, expectedSigner);
    }
    /**
     * Get the message string to be signed when using SignatureTypes.PERSONAL.
     *
     * This signing method may be used in cases where EIP-712 signing is not possible.
     */
    getPersonalSignMessage(message) {
        // Make sure the output is deterministic for a given input.
        const json = JSON.stringify({
            ...lodash_1.default.pick(this.getDomainData(), PERSONAL_SIGN_DOMAIN_PARAMS),
            ...lodash_1.default.pick(message, lodash_1.default.keys(message).sort()),
        }, null, 2);
        return json
            .replace('{\n', '')
            .replace('\n}', '')
            .replace(/"/g, '')
            .replace(/\s+/g, '')
            .replace(/:/g, `: `)
            .replace(/,/g, `\n`)
            .replace('L2Key', 'L2 Key')
            .replace('https: //', 'https://');
    }
    getDomainHash() {
        const hash = web3_1.default.utils.soliditySha3({ t: 'bytes32', v: (0, helpers_1.hashString)(helpers_1.EIP712_DOMAIN_STRING_NO_CONTRACT) }, { t: 'bytes32', v: (0, helpers_1.hashString)(this.domain) }, { t: 'bytes32', v: (0, helpers_1.hashString)(this.version) }, { t: 'uint256', v: new bignumber_js_1.default(this.networkId).toFixed(0) });
        // Non-null assertion operator is safe, hash is null only on empty input.
        return hash;
    }
    getDomainData() {
        return {
            name: this.domain,
            version: this.version,
            chainId: this.networkId,
        };
    }
}
exports.SignOffChainAction = SignOffChainAction;
