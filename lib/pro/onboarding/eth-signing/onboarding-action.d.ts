/**
 * Signatures on static messages for onboarding.
 *
 * These are used during onboarding. The signature must be deterministic based on the Ethereum key
 * because the signatures will be used for key derivation, and the keys should be recoverable:
 *   - The onboarding signature is used to derive the default API credentials, on the server.
 *   - The key derivation signature is used by the frontend app to derive the STARK key pair.
 *     Programmatic traders may optionally derive their STARK key pair in the same way.
 */
import Web3 from "web3";
import { OnboardingAction } from "../interface/main";
import { SignOffChainAction } from "./sign-off-chain-action";
export declare class SignOnboardingAction extends SignOffChainAction<OnboardingAction> {
    constructor(web3: Web3, networkId: number);
    getHash(message: OnboardingAction): string;
}
