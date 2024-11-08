export declare enum ApexAsset {
    USDC = "USDC",
    USDT = "USDT",
    BTC = "BTC",
    ETH = "ETH",
    LINK = "LINK",
    AAVE = "AAVE",
    UNI = "UNI",
    SUSHI = "SUSHI",
    SOL = "SOL",
    YFI = "YFI",
    ONEINCH = "1INCH",
    AVAX = "AVAX",
    SNX = "SNX",
    CRV = "CRV",
    UMA = "UMA",
    DOT = "DOT",
    DOGE = "DOGE",
    MATIC = "MATIC",
    MKR = "MKR",
    FIL = "FIL",
    ADA = "ADA",
    ATOM = "ATOM",
    COMP = "COMP",
    BCH = "BCH",
    LTC = "LTC",
    EOS = "EOS",
    ALGO = "ALGO",
    ZRX = "ZRX",
    XMR = "XMR",
    ZEC = "ZEC",
    ENJ = "ENJ",
    ETC = "ETC",
    XLM = "XLM",
    TRX = "TRX",
    XTZ = "XTZ",
    HNT = "HNT"
}
export declare enum OrderSide {
    BUY = "BUY",
    SELL = "SELL"
}
export declare enum WalletWay {
    MetaMask = "injected",
    CoinbaseWallet = "coinbaseWallet",
    Walletconnect = "walletConnect"
}
export interface TokenInfo {
    decimals: number;
    iconUrl: string;
    token: string;
    tokenAddress: string;
    pullOff: boolean;
}
export interface ChainInfo {
    chain: string;
    chainIconUrl: string;
    chainId: number;
    contractAddress: string;
    depositGasFeeLess: boolean;
    feeLess: boolean;
    feeRate: string | number;
    gasLess: boolean;
    gasToken: string;
    minFee: string | number;
    rpcUrl: string;
    withdrawGasFeeLess: boolean;
    tokens: TokenInfo[];
}
export interface MultiChain {
    chains: ChainInfo[];
    currency: string;
    maxWithdraw: string | number;
    minDeposit: string | number;
    minWithdraw: string | number;
}
export declare const enum ConnectStatus {
    Success = "success",
    Progress = "progress",
    Error = "error"
}
export interface ACCOUNT {
    accountNumber: string;
    adminSignature: string;
    createdAt: string;
    id: string;
    openPositions: string;
    pendingDeposits: string;
    pendingWithdrawals: string;
    positionId: string;
    quoteBalance: string;
    starkKey: string;
    wallets: string;
}
export interface APIKEY {
    key: string;
    passphrase: string;
    secret: string;
}
export interface USER {
    apexTokenBalance: string;
    country: string;
    email: string;
    emailNotifyGeneralEnable: boolean;
    emailNotifyTradingEnable: boolean;
    emailNotifyAccountEnable: boolean;
    ethereumAddress: string;
    fees30D: string;
    id: string;
    isEmailVerified: string;
    isRegistered: string;
    isSharingAddress: string;
    isSharingUsername: string;
    makerFeeRate: string;
    makerVolume30D: string;
    referredByAffiliateLink: string;
    stakedApexTokenBalance: string;
    takerFeeRate: string;
    takerVolume30D: string;
    userData: object;
    username: string;
}
export interface USERINFO {
    account: ACCOUNT;
    apiKey: APIKEY;
    user: USER;
}
interface Currency {
    id: string;
    stark_ex_asset_id: string;
    starkExResolution: string;
    step_size: string;
}
declare const setSymbols: (data: any) => void;
declare const getSymbols: () => any;
declare const setCurrency: (data: any) => void;
declare const getCurrency: () => Currency[];
declare const setConfig: (data: any) => void;
declare const getConfig: () => {};
declare const setPerpetual: (data: "USDC" | "USDT" | string) => void;
declare const getPerpetual: () => "USDC" | "USDT" | string;
declare const setSymbolsV2: (data: any) => void;
declare const getSymbolsV2: () => any;
declare const setUSDCCurrency: (data: any) => void;
declare const getUSDCCurrency: () => Currency[];
declare const setUSDTCurrency: (data: any) => void;
declare const getUSDTCurrency: () => Currency[];
declare const setCurrencyV2: (data: any) => void;
declare const getCurrencyV2: () => any;
declare const setUSDCConfig: (data: any) => void;
declare const getUSDCConfig: () => {};
declare const setUSDTConfig: (data: any) => void;
declare const getUSDTConfig: () => {};
declare const setConfigV2: (data: any) => void;
declare const getConfigV2: () => any;
export { setUSDCConfig, getUSDCConfig, setUSDTConfig, getUSDTConfig, setUSDCCurrency, getUSDCCurrency, setUSDTCurrency, getUSDTCurrency, setPerpetual, getPerpetual, setSymbols, getSymbols, setCurrency, getCurrency, setConfig, getConfig, setSymbolsV2, getSymbolsV2, setCurrencyV2, getCurrencyV2, setConfigV2, getConfigV2, };
