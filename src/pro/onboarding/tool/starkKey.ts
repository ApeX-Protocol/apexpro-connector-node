import axios from 'axios';
const cryptojs = require('crypto-js');
// import queryString from 'query-string';
import BN from 'bn.js';

import { genSimplifyOnBoardingSignature, keyPairFromData, stripHexPrefix } from '../../starkex-lib';
import { genStarkKeyMessage } from '../constants';
import { SignOnboardingAction } from '../eth-signing';
import { SigningMethod } from '../interface';

import { KeyPair } from '../interface/main';
import { web3 } from '..';
import QueryString from 'qs';
import { ENV } from '../../Constant';

const KEY_DERIVATION_SUPPORTED_SIGNING_METHODS: SigningMethod[] = [
  SigningMethod.TypedData,
  SigningMethod.MetaMask,
  SigningMethod.MetaMaskLatest,
  SigningMethod.CoinbaseWallet,
  SigningMethod.Personal,
];

const genStarkKey = async (
  signingMethod: SigningMethod = SigningMethod.TypedData,
  account: string,
  env: ENV
  // registerChainId: number,
) => {
  if (!account) {
    throw new Error('Invalid Account');
  }

  const signer = new SignOnboardingAction(web3, env.registerChainId);

  const sig = await signer.sign(account, signingMethod, genStarkKeyMessage, env);
  const signature = typeof sig === 'string' ? sig : sig.value;

  const l2KeyHash = typeof sig === 'string' ? '' : sig.l2KeyHash;

  const keyPair = keyPairFromData(Buffer.from(stripHexPrefix(signature), 'hex'));
  return { key: keyPair, l2KeyHash, signer };
};

const genNonce = async (address: string, publicKey: string, env: ENV, params: { [key: string]: any } = {}) => {
  const qrs = "?"+QueryString.stringify({
    ethAddress: address,
    starkKey: publicKey,
    chainId: params.chainId,
    ...params,
  })

  const res = await axios.post(`${env.url}/api/v1/generate-nonce${qrs}`, {}, {
    headers: {
      'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
    }
  })

  return res.data;
};

const genNewSignature = async ({
  account,
  privateKey,
  publicKey,
  nonce,
}: {
  account: string;
  privateKey: string;
  publicKey: string;
  nonce: string;
}) => {
  const signHash = cryptojs.SHA256(`${publicKey}${account}${nonce}`.toLowerCase());

  // console.log('=======================');
  // console.log('source: ', (`${this.keyPair.publicKey}${this.account}${nonce}`).toLowerCase())
  // console.log('to: ', signHash.toString())
  // console.log('=======================');

  const EC_ORDER = '3618502788666131213697322783095070105526743751716087489154079457884512865583';

  const bn1 = new BN(signHash.toString(), 16);
  const bn2 = new BN(EC_ORDER, 10);

  const apiKeyHash = `${bn1.toString(16)}|${bn1.mod(bn2).toString(16)}`;

  const signature = await genSimplifyOnBoardingSignature(privateKey, bn1.mod(bn2));
  return {
    apiKeyHash,
    simplifySignature: signature,
  };
};

const basicOnboarding = async (
  env: ENV,
  nonce: string,
  signingMethod: SigningMethod = SigningMethod.TypedData,
  account: string,
  keyPair: KeyPair,
  token: 'USDT' | 'USDC',
) => {
  if (!account) {
    throw new Error('请先链接钱包');
  }
  if (!KEY_DERIVATION_SUPPORTED_SIGNING_METHODS.includes(signingMethod)) {
    throw new Error('Unsupported signing method for API key derivation');
  }
  const signer = new SignOnboardingAction(web3, env.registerChainId);
  const message = {
    action: 'ApeX Onboarding',
    onlySignOn: 'https://pro.apex.exchange',
    nonce: nonce,
  };
  const signature = await signer.sign(account, signingMethod, message, env);

  const qrs = "?"+QueryString.stringify({
    starkKey: keyPair.publicKey,
    starkKeyYCoordinate: keyPair.publicKeyYCoordinate,
    ethereumAddress: account,
    token: token || 'USDC',
  })

  const res = await axios.post(`${env.url}/api/v2/onboarding${qrs}`, {}, {
    headers: {
      'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
      'APEX-SIGNATURE': typeof signature === 'string' ? signature : signature.value,
      'Apex-Ethereum-Address': account
    }
  })

  return res
};

const simplifyOnboarding = async (
  env: ENV,
  nonce: string,
  signingMethod: SigningMethod = SigningMethod.TypedData,
  account: string,
  keyPair: KeyPair,
  token: 'USDT' | 'USDC',
) => {
  if (!account) {
    throw new Error('请先链接钱包');
  }
  if (!KEY_DERIVATION_SUPPORTED_SIGNING_METHODS.includes(signingMethod)) {
    throw new Error('Unsupported signing method for API key derivation');
  }

  const { privateKey, publicKey } = keyPair;

  const { apiKeyHash, simplifySignature } = await genNewSignature({
    account: account,
    privateKey,
    publicKey,
    nonce,
  });

  const qrs = "?"+QueryString.stringify({
    starkKey: keyPair.publicKey,
    starkKeyYCoordinate: keyPair.publicKeyYCoordinate,
    ethereumAddress: account,
    token: token || 'USDC',
  })



  const res = await axios.post(`${env.url}/api/v2/onboarding${qrs}`, {  }, {
    headers: {
      'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
      'APEX-SIGNATURE': simplifySignature,
      'Apex-Ethereum-Address': account
    }
  })
  return res
};

export { basicOnboarding, simplifyOnboarding, genStarkKey, genNonce };
