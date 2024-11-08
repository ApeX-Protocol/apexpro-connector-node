import { ApexClient as ApexClientPro, ApexClientV2 } from './pro/ApexClient';
import { ApexClientOmni } from './omni/ApexClient';
import { ENV, PROD, QA } from './pro/Constant';
import { ENV as OmniENV, PROD as OMNI_PROD, QA as OMNI_QA } from './omni/Constant';
declare class ApexClient extends ApexClientPro {
    static omni: typeof ApexClientOmni;
    static OMNI_ENV: {
        PROD: OmniENV;
        QA: OmniENV;
    };
    static createOmniClient(env?: OmniENV): ApexClientOmni;
}
declare namespace ApexClient {
    type omni = ApexClientOmni;
}
export { ApexClient, ApexClientV2, ApexClientOmni };
export { ENV, PROD, QA };
export { OmniENV, OMNI_PROD, OMNI_QA };
export * from './pro';
