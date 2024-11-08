"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solidityKeccak256 = void 0;
const ethers_1 = __importDefault(require("ethers"));
const solidityKeccak256 = (type, values) => {
    // web3
    // Web3.utils.soliditySha3
    // v6
    // return ethers.solidityPackedKeccak256(type, values)
    // v5
    return ethers_1.default.utils.solidityKeccak256(type, values);
};
exports.solidityKeccak256 = solidityKeccak256;
