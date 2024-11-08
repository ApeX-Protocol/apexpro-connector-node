import { SyntheticAsset } from './types';
import { ApexAsset } from './main';
export declare const ALL_ASSETS: ApexAsset[];
export declare const COLLATERAL_ASSET = ApexAsset.USDC;
export declare const SYNTHETIC_ASSETS: SyntheticAsset[];
/**
 * The resolution represents the number of decimals of precision used in the Starkware system.
 *
 * For example, a resolution of 9 for ETH means that 1e-9 ETH = 1 Gwei is the smallest unit.
 */
export declare const ASSET_RESOLUTION: Record<ApexAsset, number>;
export declare const COLLATERAL_ASSET_ID_BY_NETWORK_ID: () => string;
/**
 * Mapping from a synthetic asset to its asset ID.
 */
export declare const SYNTHETIC_ASSET_ID_MAP: Record<SyntheticAsset, string>;
/**
 * The smallest unit of the asset in the Starkware system, represented in canonical (human) units.
 */
export declare const ASSET_QUANTUM_SIZE: Record<ApexAsset, string>;
