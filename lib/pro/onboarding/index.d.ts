import { KeyPair } from './interface/main';
import Web3 from 'web3';
import { ENV } from '../Constant';
declare const web3: Web3;
declare const createStartKey: (signer: any, env: ENV, token: "USDC" | "USDT", rpcUrl: string, version?: "v1" | "v2") => Promise<import("../starkex-lib").KeyPairWithYCoordinate>;
declare const getNonce: (key: KeyPair, env: ENV, options?: {
    token: "USDC" | "USDT";
    account: string;
    chainId: number;
    version: "v1" | "v2";
}) => Promise<any>;
declare const onboarding: (env: ENV, nonce: string, key: KeyPair, options?: {
    account: string;
    token?: "USDC" | "USDT";
    onboardingVersion: "v1" | "v2";
}) => Promise<any>;
declare const onboardingAccount: ({ env, privateKey, rpcUrl, version, token, }: {
    env: ENV;
    privateKey: string;
    rpcUrl: string;
    version?: "v1" | "v2";
    token?: "USDC" | "USDT";
}) => Promise<any>;
export { web3, onboardingAccount, createStartKey, getNonce, onboarding };
