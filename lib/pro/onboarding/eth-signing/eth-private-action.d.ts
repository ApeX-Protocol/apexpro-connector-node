import Web3 from "web3";
import { EthPrivateAction } from "../interface/main";
import { SignOffChainAction } from "./sign-off-chain-action";
export declare class SignEthPrivateAction extends SignOffChainAction<EthPrivateAction> {
    constructor(web3: Web3, networkId: number);
    getHash(message: EthPrivateAction): string;
}
