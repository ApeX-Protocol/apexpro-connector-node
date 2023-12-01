import BN from 'bn.js';

import { HashFunction, KeyPair } from '../types';
import { asEcKeyPair, serializeSignature, asSimpleSignature } from '../helpers';
import { sign } from '../lib';

export { SignableConditionalTransfer } from './conditional-transfer';
export { preComputeHashes } from './hashes';
export { SignableOraclePrice } from './oracle-price';
export { SignableOrder } from './order';
export { StarkSignable } from './stark-signable';
export { SignableTransfer } from './transfer';
export { SignableWithdrawal } from './withdrawal';

let maybeHashInWorkerThread: HashFunction = (_a: BN, _b: BN) => {
  throw new Error('Cannot use hashInWorkerThread() since worker_threads is not available');
};
try {
  /* eslint-disable @typescript-eslint/no-var-requires,global-require */
  require('worker_threads');
  // If the worker_threads module is available, update maybeHashInWorkerThread.
  // eslint-disable-next-line import/extensions
  maybeHashInWorkerThread = require('./hash-in-worker-thread').hashInWorkerThread;
  /* eslint-enable @typescript-eslint/no-var-requires,global-require */
} catch (error) {
  // eslint: Intentionally empty.
}

export const hashInWorkerThread = maybeHashInWorkerThread;

// 简化钱包链接，生成签名
export async function  genSimplifyOnBoardingSignature(privateKey: string | KeyPair, apikeyHash: BN): Promise<string> {
  const ecSignature = await sign(asEcKeyPair(privateKey), apikeyHash);
  return serializeSignature(asSimpleSignature(ecSignature));
}
