import { genStarkKey, genNonce, basicOnboarding, simplifyOnboarding } from './tool';
import { SigningMethod } from './interface';
import { sleep } from '../apexpro';
import { KeyPair } from './interface/main';
import Web3 from 'web3';
import { ENV } from '../Constant';

const web3 = new Web3();


const createStartKeyAndOnboarding = async (signer: any, env: ENV, token: 'USDC' | 'USDT', rpcUrl: string, version: 'v1' | 'v2' = 'v2') => {
  if(!web3?.currentProvider){
    web3.setProvider(new Web3.providers.HttpProvider(rpcUrl));
  }
  

  const account = signer.address;
  const chainId = env.networkId;
  if (account) {
    const { key, l2KeyHash } = await genStarkKey(SigningMethod.Personal2, account, env);

    if (key) {
      return await getNonce(key, env, { chainId, account, token, version });
    }

    return { key, l2KeyHash };
  } else {
    throw new Error('Invalid Account');
  }
};

const createStartKey = async (signer: any, env: ENV, token: 'USDC' | 'USDT', rpcUrl: string, version: 'v1' | 'v2' = 'v2') => {
  if(!web3?.currentProvider){
    web3.setProvider(new Web3.providers.HttpProvider(rpcUrl));
  }
  
  const account = signer.address;
  if (account) {
    const { key } = await genStarkKey(SigningMethod.Personal2, account, env);

    return key;
  } else {
    throw new Error('Invalid Account');
  }
};


const getNonce = async (
  key: KeyPair,
  env: ENV,
  options?: { token: 'USDC' | 'USDT'; account: string; chainId: number; version: 'v1' | 'v2' },
) => {
  try {
    const res: any = await genNonce(options.account || '', key.publicKey, env, { chainId: options.chainId });
    if (res.data.nonce) {
      await sleep(1000);
      return await onboarding(env, res.data.nonce, key, {
        account: options.account,
        token: options.token,
        onboardingVersion: options.version,
      });
    } else {
      throw new Error('Unkown Error');
    }
  } catch (e: any) {
    throw new Error('Unkown Error');
  }
};

const onboarding = async (
  env: ENV,
  nonce: string,
  key: KeyPair,
  //
  options?: { account: string; token?: 'USDC' | 'USDT'; onboardingVersion: 'v1' | 'v2' },
) => {
  const status = !!options.account;
  const _account = options.account;
  let onboardingFn = simplifyOnboarding;
  switch (options.onboardingVersion) {
    case 'v1':
      onboardingFn = simplifyOnboarding; // force use v2 version
      break;
    case 'v2':
      onboardingFn = simplifyOnboarding;
      break;
  }

  if (status) {
    try {
      const res: any = await onboardingFn(
        env,
        nonce,
        SigningMethod.MetaMaskLatest,
        _account,
        key,
        options.token,
      );

      if (res.data) {
        return res.data;
      } else {
        throw new Error('Unkown Error');
      }
    } catch (e: any) {
      throw e;
    }
  } else {
    throw new Error('Invalid Account');
  }
};

const onboardingAccount = async ({
  env,
  privateKey,
  rpcUrl,
  version = 'v2',
  token = 'USDC',
}: {
  env: ENV;
  privateKey: string;
  rpcUrl: string;
  version?: 'v1' | 'v2';
  token?: 'USDC' | 'USDT';
}) => {
  const signer = await web3.eth.accounts.wallet.add(privateKey);
  web3.setProvider(new Web3.providers.HttpProvider(rpcUrl));


  const res = await createStartKeyAndOnboarding(signer, env, token, rpcUrl, version);
  return res;
};

export { web3, onboardingAccount, createStartKey, getNonce, onboarding };
