import BN from 'bn.js';
import { ConditionalTransferParams, NetworkId, StarkwareConditionalTransfer } from '../types';
import { StarkSignable } from './stark-signable';
/**
 * Wrapper object to convert a conditional transfer, and hash, sign, and verify its signature.
 */
export declare class SignableConditionalTransfer extends StarkSignable<StarkwareConditionalTransfer> {
    static fromTransfer(transfer: ConditionalTransferParams, networkId: NetworkId): SignableConditionalTransfer;
    protected calculateHash(): Promise<BN>;
    toStarkware(): StarkwareConditionalTransfer;
}
