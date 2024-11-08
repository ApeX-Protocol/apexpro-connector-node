import BN from 'bn.js';
import { StarkwareWithdrawal, WithdrawalWithNonce, WithdrawalWithClientId, NetworkId } from '../types';
import { StarkSignable } from './stark-signable';
/**
 * Wrapper object to convert a withdrawal, and hash, sign, and verify its signature.
 */
export declare class SignableWithdrawal extends StarkSignable<StarkwareWithdrawal> {
    static fromWithdrawal: typeof SignableWithdrawal.fromWithdrawalWithClientId;
    static fromWithdrawalWithClientId(withdrawal: WithdrawalWithClientId, networkId: NetworkId, asset: string): SignableWithdrawal;
    static fromWithdrawalWithNonce(withdrawal: WithdrawalWithNonce, networkId: NetworkId, asset: string): SignableWithdrawal;
    protected calculateHash(): Promise<BN>;
    toStarkware(): StarkwareWithdrawal;
}
