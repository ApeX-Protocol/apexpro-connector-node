import { SignOnboardingAction } from '../eth-signing';
import { SigningMethod } from '../interface';
import { KeyPair } from '../interface/main';
import { ENV } from '../../Constant';
declare const genStarkKey: (signingMethod: SigningMethod, account: string, env: ENV) => Promise<{
    key: import("../../starkex-lib").KeyPairWithYCoordinate;
    l2KeyHash: string;
    signer: SignOnboardingAction;
}>;
declare const genNonce: (address: string, publicKey: string, env: ENV, params?: {
    [key: string]: any;
}) => Promise<any>;
declare const basicOnboarding: (env: ENV, nonce: string, signingMethod: SigningMethod, account: string, keyPair: KeyPair, token: "USDT" | "USDC") => Promise<import("axios").AxiosResponse<any, any>>;
declare const simplifyOnboarding: (env: ENV, nonce: string, signingMethod: SigningMethod, account: string, keyPair: KeyPair, token: "USDT" | "USDC") => Promise<import("axios").AxiosResponse<any, any>>;
export { basicOnboarding, simplifyOnboarding, genStarkKey, genNonce };
