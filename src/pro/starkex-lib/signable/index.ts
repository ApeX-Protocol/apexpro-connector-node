import BN from 'bn.js';

import { KeyPair } from '../types';
import { asEcKeyPair, serializeSignature, asSimpleSignature } from '../helpers';
import { sign } from '../lib';

export { SignableConditionalTransfer } from './conditional-transfer';
export { preComputeHashes } from './hashes';
export { SignableOraclePrice } from './oracle-price';
export { SignableOrder } from './order';
export { StarkSignable } from './stark-signable';
export { SignableTransfer } from './transfer';
export { SignableWithdrawal } from './withdrawal';

// 简化钱包链接，生成签名
export async function  genSimplifyOnBoardingSignature(privateKey: string | KeyPair, apikeyHash: BN): Promise<string> {
  const ecSignature = await sign(asEcKeyPair(privateKey), apikeyHash);
  return serializeSignature(asSimpleSignature(ecSignature));
}
