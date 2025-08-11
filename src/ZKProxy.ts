

export type ZkLinkSigner = {
    free: () => void;
    // 静态方法
    ethSig: (sig: string) => ZkLinkSigner;
    starknetSig: (sig: string) => ZkLinkSigner;
}



export interface ZkLinkApi {
    ZkLinkSigner: ZkLinkSigner;
    ContractBuilder: any;
    newContract: any;
}

let zkModule: ZkLinkApi;

export async function initZk() {

    if (zkModule) {
        return;
    }
    if (typeof window === 'undefined') {
        const res = require('./packages/node-dist/zklink-sdk-node.js')
        zkModule = res
    } else {
        const res = require('./packages/web-dist/zklink-sdk-web.js');
        await res.default();
        zkModule = res
    }
}

export function getZkModule(): ZkLinkApi {
    if (zkModule) {
        return zkModule;
    }
    throw new Error('ZkLink SDK not initialized. Please call initZk() first.');
}

export function getZkLinkSigner(): ZkLinkSigner {
    return getZkModule().ZkLinkSigner;
}

export function getContractBuilder(): any {
    return getZkModule().ContractBuilder;
}

export function getNewContract(): any {
    return getZkModule().newContract;
}