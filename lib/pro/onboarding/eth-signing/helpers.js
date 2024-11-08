"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP712_DOMAIN_STRUCT_NO_CONTRACT = exports.EIP712_DOMAIN_STRING_NO_CONTRACT = exports.EIP712_DOMAIN_STRUCT = exports.EIP712_DOMAIN_STRING = exports.PREPEND_HEX = exports.PREPEND_DEC = exports.PREPEND_PERSONAL = void 0;
exports.isValidSigType = isValidSigType;
exports.ecRecoverTypedSignature = ecRecoverTypedSignature;
exports.createTypedSignature = createTypedSignature;
exports.fixRawSignature = fixRawSignature;
exports.stripHexPrefix = stripHexPrefix;
exports.addressesAreEqual = addressesAreEqual;
exports.hashString = hashString;
const ethers_1 = require("ethers");
const web3_1 = __importDefault(require("web3"));
const main_1 = require("../interface/main");
/**
 * Ethereum signed message prefix without message length.
 */
exports.PREPEND_PERSONAL = "\x19Ethereum Signed Message:\n";
/**
 * Ethereum signed message prefix, 32-byte message, with message length represented as a string.
 */
exports.PREPEND_DEC = "\x19Ethereum Signed Message:\n32";
/**
 * Ethereum signed message prefix, 32-byte message, with message length as a one-byte integer.
 */
exports.PREPEND_HEX = "\x19Ethereum Signed Message:\n\x20";
exports.EIP712_DOMAIN_STRING = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";
exports.EIP712_DOMAIN_STRUCT = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
];
exports.EIP712_DOMAIN_STRING_NO_CONTRACT = "EIP712Domain(string name,string version,uint256 chainId)";
exports.EIP712_DOMAIN_STRUCT_NO_CONTRACT = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
];
function isValidSigType(sigType) {
    switch (sigType) {
        case main_1.SignatureTypes.NO_PREPEND:
        case main_1.SignatureTypes.DECIMAL:
        case main_1.SignatureTypes.HEXADECIMAL:
        case main_1.SignatureTypes.PERSONAL:
            return true;
        default:
            return false;
    }
}
/**
 * Recover the address used to sign a given hash or message.
 *
 * The string `hashOrMessage` is a hash, unless the signature has type SignatureTypes.PERSONAL, in
 * which case it is the signed message.
 */
function ecRecoverTypedSignature(hashOrMessage, typedSignature) {
    const sigType = parseInt(typedSignature.slice(-2), 16);
    let prependedHash;
    switch (sigType) {
        case main_1.SignatureTypes.NO_PREPEND:
            prependedHash = hashOrMessage;
            break;
        case main_1.SignatureTypes.PERSONAL: {
            const fullMessage = `${exports.PREPEND_PERSONAL}${hashOrMessage.length}${hashOrMessage}`;
            prependedHash = web3_1.default.utils.soliditySha3({ t: "string", v: fullMessage });
            break;
        }
        case main_1.SignatureTypes.DECIMAL:
            prependedHash = web3_1.default.utils.soliditySha3({ t: "string", v: exports.PREPEND_DEC }, { t: "bytes32", v: hashOrMessage });
            break;
        case main_1.SignatureTypes.HEXADECIMAL:
            prependedHash = web3_1.default.utils.soliditySha3({ t: "string", v: exports.PREPEND_HEX }, { t: "bytes32", v: hashOrMessage });
            break;
        default:
            throw new Error(`Invalid signature type: ${sigType}`);
    }
    const signature = typedSignature.slice(0, -2);
    // Non-null assertion operator is safe, hash is null only on empty input.
    return ethers_1.ethers.utils.recoverAddress(ethers_1.ethers.utils.arrayify(prependedHash), signature);
}
function createTypedSignature(signature, sigType) {
    if (!isValidSigType(sigType)) {
        throw new Error(`Invalid signature type: ${sigType}`);
    }
    return `${fixRawSignature(signature)}0${sigType}`;
}
/**
 * Fixes any signatures that don't have a 'v' value of 27 or 28
 */
function fixRawSignature(signature) {
    const stripped = stripHexPrefix(signature);
    if (stripped.length !== 130) {
        throw new Error(`Invalid raw signature: ${signature}`);
    }
    const rs = stripped.substr(0, 128);
    const v = stripped.substr(128, 2);
    switch (v) {
        case "00":
            return `0x${rs}1b`;
        case "01":
            return `0x${rs}1c`;
        case "1b":
        case "1c":
            return `0x${stripped}`;
        default:
            throw new Error(`Invalid v value: ${v}`);
    }
}
// ============ Byte Helpers ============
function stripHexPrefix(input) {
    if (input.indexOf("0x") === 0) {
        return input.substr(2);
    }
    return input;
}
function addressesAreEqual(addressOne, addressTwo) {
    if (!addressOne || !addressTwo) {
        return false;
    }
    return (stripHexPrefix(addressOne).toLowerCase() ===
        stripHexPrefix(addressTwo).toLowerCase());
}
function hashString(input) {
    const hash = web3_1.default.utils.soliditySha3({
        t: "string",
        v: input,
    });
    if (hash === null) {
        throw new Error(`soliditySha3 input was empty: ${input}`);
    }
    return hash;
}
