"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASSET_QUANTUM_SIZE = exports.SYNTHETIC_ASSET_ID_MAP = exports.COLLATERAL_ASSET_ID_BY_NETWORK_ID = exports.ASSET_RESOLUTION = exports.SYNTHETIC_ASSETS = exports.COLLATERAL_ASSET = exports.ALL_ASSETS = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const keccak_1 = require("ethereum-cryptography/keccak");
const lodash_1 = __importDefault(require("lodash"));
const lib_1 = require("./lib");
const main_1 = require("./main");
exports.ALL_ASSETS = Object.values(main_1.ApexAsset);
exports.COLLATERAL_ASSET = main_1.ApexAsset.USDC;
exports.SYNTHETIC_ASSETS = lodash_1.default.without(exports.ALL_ASSETS, exports.COLLATERAL_ASSET);
/**
 * The resolution represents the number of decimals of precision used in the Starkware system.
 *
 * For example, a resolution of 9 for ETH means that 1e-9 ETH = 1 Gwei is the smallest unit.
 */
exports.ASSET_RESOLUTION = {
    [main_1.ApexAsset.USDT]: 6,
    [main_1.ApexAsset.USDC]: 6,
    [main_1.ApexAsset.BTC]: 10,
    [main_1.ApexAsset.ETH]: 3,
    [main_1.ApexAsset.LINK]: 7,
    [main_1.ApexAsset.AAVE]: 8,
    [main_1.ApexAsset.UNI]: 7,
    [main_1.ApexAsset.SUSHI]: 7,
    [main_1.ApexAsset.SOL]: 7,
    [main_1.ApexAsset.YFI]: 10,
    [main_1.ApexAsset.ONEINCH]: 7,
    [main_1.ApexAsset.AVAX]: 7,
    [main_1.ApexAsset.SNX]: 7,
    [main_1.ApexAsset.CRV]: 6,
    [main_1.ApexAsset.UMA]: 7,
    [main_1.ApexAsset.DOT]: 7,
    [main_1.ApexAsset.DOGE]: 5,
    [main_1.ApexAsset.MATIC]: 6,
    [main_1.ApexAsset.MKR]: 9,
    [main_1.ApexAsset.FIL]: 7,
    [main_1.ApexAsset.ADA]: 6,
    [main_1.ApexAsset.ATOM]: 7,
    [main_1.ApexAsset.COMP]: 8,
    [main_1.ApexAsset.BCH]: 8,
    [main_1.ApexAsset.LTC]: 8,
    [main_1.ApexAsset.EOS]: 6,
    [main_1.ApexAsset.ALGO]: 6,
    [main_1.ApexAsset.ZRX]: 6,
    [main_1.ApexAsset.XMR]: 8,
    [main_1.ApexAsset.ZEC]: 8,
    [main_1.ApexAsset.ENJ]: 6,
    [main_1.ApexAsset.ETC]: 7,
    [main_1.ApexAsset.XLM]: 5,
    [main_1.ApexAsset.TRX]: 4,
    [main_1.ApexAsset.XTZ]: 6,
    [main_1.ApexAsset.HNT]: 7,
};
const COLLATERAL_ASSET_ID_BY_NETWORK_ID = () => {
    const currentPerpetual = (0, main_1.getPerpetual)()?.toUpperCase?.();
    const currency = currentPerpetual ? (0, main_1.getCurrencyV2)() : (0, main_1.getCurrency)();
    let starkExAssetId = '';
    currency.map((item) => {
        if (item.id == (currentPerpetual || 'USDC')) {
            starkExAssetId = item.starkExAssetId;
        }
    });
    return starkExAssetId;
};
exports.COLLATERAL_ASSET_ID_BY_NETWORK_ID = COLLATERAL_ASSET_ID_BY_NETWORK_ID;
/**
 * Mapping from a synthetic asset to its asset ID.
 */
exports.SYNTHETIC_ASSET_ID_MAP = lodash_1.default.chain(exports.SYNTHETIC_ASSETS)
    .keyBy()
    .mapValues(makeSyntheticAssetId)
    .value();
/**
 * The smallest unit of the asset in the Starkware system, represented in canonical (human) units.
 */
exports.ASSET_QUANTUM_SIZE = lodash_1.default.mapValues(exports.ASSET_RESOLUTION, (resolution) => `1e-${resolution}`);
/**
 * Construct the asset ID (as a 0x-prefixed hex string) for the collateral asset, given the address.
 */
function makeCollateralAssetId(tokenAddress, quantization = 1) {
    const data = Buffer.concat([
        (0, keccak_1.keccak256)(Buffer.from('ERC20Token(address)')).slice(0, 4),
        Buffer.from((0, lib_1.normalizeHex32)(tokenAddress), 'hex'),
        Buffer.from((0, lib_1.normalizeHex32)(new bn_js_1.default(quantization).toString(16)), 'hex'),
    ]);
    const result = (0, keccak_1.keccak256)(data);
    const resultBN = new bn_js_1.default(result.toString('hex'), 16);
    resultBN.imaskn(250);
    return `0x${(0, lib_1.normalizeHex32)(resultBN.toString(16))}`;
}
/**
 * Construct the asset ID (as a 0x-prefixed hex string) for a given synthetic asset.
 */
function makeSyntheticAssetId(asset) {
    const assetIdString = `${asset}-${exports.ASSET_RESOLUTION[asset]}`;
    const assetIdHex = Buffer.from(assetIdString).toString('hex').padEnd(30, '0');
    return `0x${assetIdHex}`;
}
