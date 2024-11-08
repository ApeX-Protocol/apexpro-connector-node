"use strict";
/**
 * Helpers related to pedersen hashes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheablePedersenHash = getCacheablePedersenHash;
exports.preComputeHashes = preComputeHashes;
const constants_1 = require("../constants");
const crypto_1 = require("../lib/crypto");
const util_1 = require("../lib/util");
const constants_2 = require("./constants");
// Global state for all STARK signables.
const CACHE = {};
/**
 * Calculate a pedersen hash with commonly used parameters. The hash will be cached.
 */
async function getCacheablePedersenHash(left, right) {
    const leftString = left.toString(16);
    const rightString = right.toString(16);
    if (CACHE[leftString] === undefined) {
        CACHE[leftString] = {};
    }
    if (CACHE[leftString][rightString] === undefined) {
        CACHE[leftString][rightString] = await (0, crypto_1.getPedersenHash)(left, right);
    }
    return CACHE[leftString][rightString];
}
/**
 * Pre-compute commonly used hashes.
 *
 * This function may take a while to run.
 */
async function preComputeHashes(networkId) {
    const collateralAssetBn = (0, util_1.hexToBn)((0, constants_1.COLLATERAL_ASSET_ID_BY_NETWORK_ID)());
    await Promise.all([
        // Orders: hash(hash(sell asset, buy asset), fee asset)
        Promise.all(constants_1.SYNTHETIC_ASSETS.map(async (baseAsset) => {
            const baseAssetBn = (0, util_1.hexToBn)(constants_1.SYNTHETIC_ASSET_ID_MAP[baseAsset]);
            const [buyHash, sellHash] = await Promise.all([
                getCacheablePedersenHash(collateralAssetBn, baseAssetBn),
                getCacheablePedersenHash(baseAssetBn, collateralAssetBn),
            ]);
            await Promise.all([
                getCacheablePedersenHash(buyHash, collateralAssetBn),
                getCacheablePedersenHash(sellHash, collateralAssetBn),
            ]);
        })),
        // Transfers and conditional transfers: hash(transfer asset, fee asset)
        getCacheablePedersenHash(collateralAssetBn, constants_2.TRANSFER_FEE_ASSET_ID_BN),
    ]);
}
