import BN from 'bn.js';
import { OrderWithNonce, OrderWithNonceAndQuoteAmount, OrderWithClientId, OrderWithClientIdAndQuoteAmount, StarkwareOrder, NetworkId } from '../types';
import { StarkSignable } from './stark-signable';
/**
 * Wrapper object to convert an order, and hash, sign, and verify its signature.
 */
export declare class SignableOrder extends StarkSignable<StarkwareOrder> {
    static fromOrder: typeof SignableOrder.fromOrderWithClientId;
    static fromOrderWithClientId(order: OrderWithClientId | OrderWithClientIdAndQuoteAmount, networkId: NetworkId): SignableOrder;
    static fromOrderWithNonce(order: OrderWithNonce | OrderWithNonceAndQuoteAmount, networkId: NetworkId): SignableOrder;
    protected calculateHash(): Promise<BN>;
    toStarkware(): StarkwareOrder;
}
