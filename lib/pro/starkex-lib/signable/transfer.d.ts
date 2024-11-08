import BN from 'bn.js';
import { TransferParams, NetworkId, StarkwareTransfer } from '../types';
import { StarkSignable } from './stark-signable';
/**
 * Wrapper object to convert a transfer, and hash, sign, and verify its signature.
 */
export declare class SignableTransfer extends StarkSignable<StarkwareTransfer> {
    static fromTransfer(transfer: TransferParams, networkId: NetworkId): SignableTransfer;
    protected calculateHash(): Promise<BN>;
    toStarkware(): StarkwareTransfer;
}
