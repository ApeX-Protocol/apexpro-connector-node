import Web3 from 'web3';
import { SigningMethod, Address } from '../interface/main';
import { Signer } from './signer';
import { ENV } from '../../Constant';
type EIP712Struct = {
    type: string;
    name: string;
}[];
export declare abstract class SignOffChainAction<M extends {}> extends Signer {
    protected readonly networkId: number;
    private readonly actionStruct;
    private readonly domain;
    private readonly version;
    constructor(web3: Web3, networkId: number, actionStruct: EIP712Struct, { domain, version, }?: {
        domain?: string;
        version?: string;
    });
    abstract getHash(message: M): string;
    sign(signer: string, signingMethod: SigningMethod, message: M, env: ENV): Promise<string | {
        value: string;
        l2KeyHash: string;
    }>;
    verify(typedSignature: string, expectedSigner: Address, message: M): boolean;
    /**
     * Get the message string to be signed when using SignatureTypes.PERSONAL.
     *
     * This signing method may be used in cases where EIP-712 signing is not possible.
     */
    getPersonalSignMessage(message: M): string;
    getDomainHash(): string;
    private getDomainData;
}
export {};
