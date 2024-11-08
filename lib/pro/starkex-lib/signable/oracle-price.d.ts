import BN from 'bn.js';
import { NetworkId, OraclePriceWithAssetName, OraclePriceWithMarket, StarkwareOraclePrice } from '../types';
import { StarkSignable } from './stark-signable';
/**
 * Wrapper object to hash, sign, and verify an oracle price.
 */
export declare class SignableOraclePrice extends StarkSignable<StarkwareOraclePrice> {
    static fromPriceWithMarket(params: OraclePriceWithMarket, networkId: NetworkId): SignableOraclePrice;
    static fromPriceWithAssetName(params: OraclePriceWithAssetName, networkId: NetworkId): SignableOraclePrice;
    protected calculateHash(): Promise<BN>;
}
