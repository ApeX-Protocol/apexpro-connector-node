"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignEthPrivateAction = void 0;
const web3_1 = __importDefault(require("web3"));
const helpers_1 = require("./helpers");
const sign_off_chain_action_1 = require("./sign-off-chain-action");
const EIP712_ETH_PRIVATE_ACTION_STRUCT = [
    { type: "string", name: "method" },
    { type: "string", name: "requestPath" },
    { type: "string", name: "body" },
    { type: "string", name: "timestamp" },
];
const EIP712_ETH_PRIVATE_ACTION_STRUCT_STRING = "apex(" +
    "string method," +
    "string requestPath," +
    "string body," +
    "string timestamp" +
    ")";
class SignEthPrivateAction extends sign_off_chain_action_1.SignOffChainAction {
    constructor(web3, networkId) {
        super(web3, networkId, EIP712_ETH_PRIVATE_ACTION_STRUCT);
    }
    getHash(message) {
        const structHash = web3_1.default.utils.soliditySha3({ t: "bytes32", v: (0, helpers_1.hashString)(EIP712_ETH_PRIVATE_ACTION_STRUCT_STRING) }, { t: "bytes32", v: (0, helpers_1.hashString)(message.method) }, { t: "bytes32", v: (0, helpers_1.hashString)(message.requestPath) }, { t: "bytes32", v: (0, helpers_1.hashString)(message.body) }, { t: "bytes32", v: (0, helpers_1.hashString)(message.timestamp) });
        // Non-null assertion operator is safe, hash is null only on empty input.
        return this.getEIP712Hash(structHash);
    }
}
exports.SignEthPrivateAction = SignEthPrivateAction;
