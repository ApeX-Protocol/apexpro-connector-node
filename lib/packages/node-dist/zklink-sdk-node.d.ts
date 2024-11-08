export function newFunding(builder: FundingBuilder): Funding;
export function newForcedExit(builder: ForcedExitBuilder): ForcedExit;
export function newWithdraw(builder: WithdrawBuilder): Withdraw;
export function newContractMatching(builder: ContractMatchingBuilder): ContractMatching;
export function newContract(builder: ContractBuilder): Contract;
export function newOrderMatching(builder: OrderMatchingBuilder): OrderMatching;
export function isTokenAmountPackable(amount: string): boolean;
export function isFeeAmountPackable(fee: string): boolean;
export function closestPackableTransactionAmount(amount: string): string;
export function closestPackableTransactionFee(fee: string): string;
export function newChangePubkey(builder: ChangePubKeyBuilder): ChangePubKey;
export function newAutoDeleveraging(builder: AutoDeleveragingBuilder): AutoDeleveraging;
export function newTransfer(builder: TransferBuilder): Transfer;
export function newLiquidation(builder: LiquidationBuilder): Liquidation;
export function newUpdateGlobalVar(builder: UpdateGlobalVarBuilder): UpdateGlobalVar;
export const ParameterType: Readonly<{
    FeeAccount: 0;
    "0": "FeeAccount";
    InsuranceFundAccount: 1;
    "1": "InsuranceFundAccount";
    MarginInfo: 2;
    "2": "MarginInfo";
    FundingInfos: 3;
    "3": "FundingInfos";
    ContractInfo: 4;
    "4": "ContractInfo";
}>;
export const EthAuthType: Readonly<{
    OnChain: 0;
    "0": "OnChain";
    EthECDSA: 1;
    "1": "EthECDSA";
    EthCREATE2: 2;
    "2": "EthCREATE2";
}>;
export const ZkLinkTxType: Readonly<{
    Deposit: 1;
    "1": "Deposit";
    FullExit: 5;
    "5": "FullExit";
    ChangePubKey: 6;
    "6": "ChangePubKey";
    Transfer: 4;
    "4": "Transfer";
    Withdraw: 3;
    "3": "Withdraw";
    ForcedExit: 7;
    "7": "ForcedExit";
    OrderMatching: 8;
    "8": "OrderMatching";
    AutoDeleveraging: 11;
    "11": "AutoDeleveraging";
    ContractMatching: 9;
    "9": "ContractMatching";
    Funding: 13;
    "13": "Funding";
    Liquidation: 10;
    "10": "Liquidation";
    UpdateGlobalVar: 12;
    "12": "UpdateGlobalVar";
}>;
export const WaitForTxStatus: Readonly<{
    Success: 0;
    "0": "Success";
    Failed: 1;
    "1": "Failed";
    Pending: 2;
    "2": "Pending";
}>;
export const BlockNumber: Readonly<{
    Latest: 0;
    "0": "Latest";
    Finalized: 1;
    "1": "Finalized";
    Safe: 2;
    "2": "Safe";
    Earliest: 3;
    "3": "Earliest";
    Pending: 4;
    "4": "Pending";
    Number: 5;
    "5": "Number";
}>;
export const AccountQueryType: Readonly<{
    AccountId: 0;
    "0": "AccountId";
    Address: 1;
    "1": "Address";
}>;
export const L1SignatureType: Readonly<{
    Eth: 0;
    "0": "Eth";
    Eip1271: 1;
    "1": "Eip1271";
    Stark: 2;
    "2": "Stark";
}>;
export const L1Type: Readonly<{
    Eth: 0;
    "0": "Eth";
    Starknet: 1;
    "1": "Starknet";
}>;
export function __wbindgen_object_drop_ref(arg0: any): void;
export function __wbindgen_number_new(arg0: any): number;
export function __wbindgen_string_new(arg0: any, arg1: any): number;
export function __wbindgen_is_undefined(arg0: any): boolean;
export function __wbindgen_in(arg0: any, arg1: any): boolean;
export function __wbindgen_boolean_get(arg0: any): 1 | 0 | 2;
export function __wbindgen_is_bigint(arg0: any): boolean;
export function __wbindgen_number_get(arg0: any, arg1: any): void;
export function __wbindgen_bigint_from_i64(arg0: any): number;
export function __wbindgen_jsval_eq(arg0: any, arg1: any): boolean;
export function __wbindgen_string_get(arg0: any, arg1: any): void;
export function __wbindgen_is_object(arg0: any): boolean;
export function __wbindgen_bigint_from_u64(arg0: any): number;
export function __wbindgen_object_clone_ref(arg0: any): number;
export function __wbindgen_as_number(arg0: any): number;
export function __wbindgen_error_new(arg0: any, arg1: any): number;
export function __wbindgen_jsval_loose_eq(arg0: any, arg1: any): boolean;
export function __wbg_getwithrefkey_4a92a5eca60879b9(arg0: any, arg1: any): number;
export function __wbg_set_9182712abebf82ef(arg0: any, arg1: any, arg2: any): void;
export function __wbg_performance_eeefc685c9bc38b4(arg0: any): number;
export function __wbg_now_e0d8ec93dd25766a(arg0: any): any;
export function __wbindgen_cb_drop(arg0: any): boolean;
export function __wbg_clearTimeout_76877dbc010e786d(arg0: any): number;
export function __wbg_setTimeout_75cb9b6991a4031d(...args: any[]): any;
export function __wbg_fetch_6a2624d7f767e331(arg0: any): number;
export function __wbg_fetch_693453ca3f88c055(arg0: any, arg1: any): number;
export function __wbg_new_7a20246daa6eec7e(...args: any[]): any;
export function __wbg_append_aa3f462f9e2b5ff2(...args: any[]): any;
export function __wbg_newwithstrandinit_f581dff0d19a8b03(...args: any[]): any;
export function __wbg_signal_3c701f5f40a5f08d(arg0: any): number;
export function __wbg_new_0ae46f44b7485bb2(...args: any[]): any;
export function __wbg_abort_2c4fb490d878d2b2(arg0: any): void;
export function __wbg_instanceof_Response_4c3b1446206114d1(arg0: any): boolean;
export function __wbg_url_83a6a4f65f7a2b38(arg0: any, arg1: any): void;
export function __wbg_status_d6d47ad2837621eb(arg0: any): any;
export function __wbg_headers_24def508a7518df9(arg0: any): number;
export function __wbg_arrayBuffer_5b2688e3dd873fed(...args: any[]): any;
export function __wbg_queueMicrotask_481971b0d87f3dd4(arg0: any): void;
export function __wbg_queueMicrotask_3cbae2ec6b6cd3d6(arg0: any): number;
export function __wbindgen_is_function(arg0: any): boolean;
export function __wbg_crypto_58f13aa23ffcb166(arg0: any): number;
export function __wbg_process_5b786e71d465a513(arg0: any): number;
export function __wbg_versions_c2ab80650590b6a2(arg0: any): number;
export function __wbg_node_523d7bd03ef69fba(arg0: any): number;
export function __wbindgen_is_string(arg0: any): boolean;
export function __wbg_require_2784e593a4674877(...args: any[]): any;
export function __wbg_msCrypto_abcb1295e768d1f2(arg0: any): number;
export function __wbg_randomFillSync_a0d98aa11c81fe89(...args: any[]): any;
export function __wbg_getRandomValues_504510b5564925af(...args: any[]): any;
export function __wbg_get_bd8e338fbd5f5cc8(arg0: any, arg1: any): number;
export function __wbg_length_cd7af8117672b8b8(arg0: any): any;
export function __wbg_new_16b304a2cfa7ff4a(): number;
export function __wbg_newnoargs_e258087cd0daa0ea(arg0: any, arg1: any): number;
export function __wbg_new_d9bc3a0147634640(): number;
export function __wbg_next_40fc327bfc8770e6(arg0: any): number;
export function __wbg_next_196c84450b364254(...args: any[]): any;
export function __wbg_done_298b57d23c0fc80c(arg0: any): any;
export function __wbg_value_d93c65011f51a456(arg0: any): number;
export function __wbg_iterator_2cee6dadfd956dfa(): number;
export function __wbg_get_e3c254076557e348(...args: any[]): any;
export function __wbg_call_27c0f87801dedf93(...args: any[]): any;
export function __wbg_new_72fb9a18b5ae2624(): number;
export function __wbg_self_ce0dbfc45cf2f5be(...args: any[]): any;
export function __wbg_window_c6fb939a7f436783(...args: any[]): any;
export function __wbg_globalThis_d1e6af4856ba331b(...args: any[]): any;
export function __wbg_global_207b558942527489(...args: any[]): any;
export function __wbg_set_d4638f722068f043(arg0: any, arg1: any, arg2: any): void;
export function __wbg_isArray_2ab64d95e09ea0ae(arg0: any): boolean;
export function __wbg_instanceof_ArrayBuffer_836825be07d4c9d2(arg0: any): boolean;
export function __wbg_call_b3ca7c6051f9bec1(...args: any[]): any;
export function __wbg_set_8417257aaedc936b(arg0: any, arg1: any, arg2: any): number;
export function __wbg_isSafeInteger_f7b04ef02296c4d2(arg0: any): boolean;
export function __wbg_entries_95cc2c823b285a09(arg0: any): number;
export function __wbg_new_81740750da40724f(arg0: any, arg1: any): number;
export function __wbg_resolve_b0083a7967828ec8(arg0: any): number;
export function __wbg_then_0c86a60e8fcfe9f6(arg0: any, arg1: any): number;
export function __wbg_then_a73caa9a87991566(arg0: any, arg1: any, arg2: any): number;
export function __wbg_buffer_12d079cc21e14bdb(arg0: any): number;
export function __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb(arg0: any, arg1: any, arg2: any): number;
export function __wbg_new_63b92bc8671ed464(arg0: any): number;
export function __wbg_set_a47bac70306a19a7(arg0: any, arg1: any, arg2: any): void;
export function __wbg_length_c20a40f15020d68a(arg0: any): any;
export function __wbg_instanceof_Uint8Array_2b3bbecd033d19f6(arg0: any): boolean;
export function __wbg_newwithlength_e9b4878cebadb3d3(arg0: any): number;
export function __wbg_subarray_a1f73cd4b5b42fe1(arg0: any, arg1: any, arg2: any): number;
export function __wbg_has_0af94d20077affa2(...args: any[]): any;
export function __wbg_set_1f9b04f170055d33(...args: any[]): any;
export function __wbg_stringify_8887fe74e1c50d81(...args: any[]): any;
export function __wbindgen_bigint_get_as_i64(arg0: any, arg1: any): void;
export function __wbindgen_debug_string(arg0: any, arg1: any): void;
export function __wbindgen_throw(arg0: any, arg1: any): never;
export function __wbindgen_memory(): number;
export function __wbindgen_closure_wrapper3851(arg0: any, arg1: any, arg2: any): number;
export function __wbindgen_closure_wrapper7125(arg0: any, arg1: any, arg2: any): number;
/**
*/
export class FundingBuilder {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {number} sub_account_nonce
    * @param {Uint32Array} funding_account_ids
    * @param {string} fee
    * @param {number} fee_token
    */
    constructor(account_id: number, sub_account_id: number, sub_account_nonce: number, funding_account_ids: Uint32Array, fee: string, fee_token: number);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {Funding}
    */
    build(): Funding;
}
/**
*/
export class Funding {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class ForcedExitBuilder {
    /**
    * @param {number} to_chain_id
    * @param {number} initiator_account_id
    * @param {number} initiator_sub_account_id
    * @param {number} target_sub_account_id
    * @param {string} target
    * @param {number} l2_source_token
    * @param {number} l1_target_token
    * @param {string} exit_amount
    * @param {number} initiator_nonce
    * @param {boolean} withdraw_to_l1
    * @param {number | undefined} [ts]
    */
    constructor(to_chain_id: number, initiator_account_id: number, initiator_sub_account_id: number, target_sub_account_id: number, target: string, l2_source_token: number, l1_target_token: number, exit_amount: string, initiator_nonce: number, withdraw_to_l1: boolean, ts?: number | undefined);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {ForcedExit}
    */
    build(): ForcedExit;
}
/**
*/
export class ForcedExit {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class WithdrawBuilder {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {number} to_chain_id
    * @param {string} to_address
    * @param {number} l2_source_token
    * @param {number} l1_target_token
    * @param {string} amount
    * @param {string | undefined} call_data
    * @param {string} fee
    * @param {number} nonce
    * @param {boolean} withdraw_to_l1
    * @param {number} withdraw_fee_ratio
    * @param {number | undefined} [ts]
    */
    constructor(account_id: number, sub_account_id: number, to_chain_id: number, to_address: string, l2_source_token: number, l1_target_token: number, amount: string, call_data: string | undefined, fee: string, nonce: number, withdraw_to_l1: boolean, withdraw_fee_ratio: number, ts?: number | undefined);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {Withdraw}
    */
    build(): Withdraw;
}
/**
*/
export class Withdraw {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {string} token_symbol
    * @returns {string}
    */
    getEthSignMsg(token_symbol: string): string;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class ContractMatchingBuilder {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {any} taker
    * @param {any[]} maker
    * @param {string} fee
    * @param {number} fee_token
    * @param {any[]} contract_prices
    * @param {any[]} margin_prices
    */
    constructor(account_id: number, sub_account_id: number, taker: any, maker: any[], fee: string, fee_token: number, contract_prices: any[], margin_prices: any[]);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {ContractMatching}
    */
    build(): ContractMatching;
}
/**
*/
export class ContractMatching {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class ContractBuilder {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {number} slot_id
    * @param {number} nonce
    * @param {number} pair_id
    * @param {string} size
    * @param {string} price
    * @param {boolean} direction
    * @param {number} maker_fee_rate
    * @param {number} taker_fee_rate
    * @param {boolean} has_subsidy
    */
    constructor(account_id: number, sub_account_id: number, slot_id: number, nonce: number, pair_id: number, size: string, price: string, direction: boolean, maker_fee_rate: number, taker_fee_rate: number, has_subsidy: boolean);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {Contract}
    */
    build(): Contract;
}
/**
*/
export class Contract {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class OrderMatchingBuilder {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {any} taker
    * @param {any} maker
    * @param {string} fee
    * @param {number} fee_token
    * @param {any[]} contract_prices
    * @param {any[]} margin_prices
    * @param {string} expect_base_amount
    * @param {string} expect_quote_amount
    */
    constructor(account_id: number, sub_account_id: number, taker: any, maker: any, fee: string, fee_token: number, contract_prices: any[], margin_prices: any[], expect_base_amount: string, expect_quote_amount: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {OrderMatching}
    */
    build(): OrderMatching;
}
/**
*/
export class OrderMatching {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class ChangePubKeyBuilder {
    /**
    * @param {number} chain_id
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {string} new_pubkey_hash
    * @param {number} fee_token
    * @param {string} fee
    * @param {number} nonce
    * @param {string | undefined} [eth_signature]
    * @param {number | undefined} [ts]
    */
    constructor(chain_id: number, account_id: number, sub_account_id: number, new_pubkey_hash: string, fee_token: number, fee: string, nonce: number, eth_signature?: string | undefined, ts?: number | undefined);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {ChangePubKey}
    */
    build(): ChangePubKey;
}
/**
*/
export class ChangePubKey {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {number} layer_one_chain_id
    * @param {string} verifying_contract
    * @returns {string}
    */
    getChangePubkeyMessage(layer_one_chain_id: number, verifying_contract: string): string;
    /**
    * @param {number} nonce
    * @param {number} account_id
    * @returns {string}
    */
    getEthSignMsg(nonce: number, account_id: number): string;
    /**
    * @param {string} sig
    * @returns {any}
    */
    setEthAuthData(sig: string): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class AutoDeleveragingBuilder {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {number} sub_account_nonce
    * @param {any[]} contract_prices
    * @param {any[]} margin_prices
    * @param {number} adl_account_id
    * @param {number} pair_id
    * @param {string} adl_size
    * @param {string} adl_price
    * @param {string} fee
    * @param {number} fee_token
    */
    constructor(account_id: number, sub_account_id: number, sub_account_nonce: number, contract_prices: any[], margin_prices: any[], adl_account_id: number, pair_id: number, adl_size: string, adl_price: string, fee: string, fee_token: number);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {AutoDeleveraging}
    */
    build(): AutoDeleveraging;
}
/**
*/
export class AutoDeleveraging {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class TransferBuilder {
    /**
    * @param {number} account_id
    * @param {string} to_address
    * @param {number} from_sub_account_id
    * @param {number} to_sub_account_id
    * @param {number} token
    * @param {string} fee
    * @param {string} amount
    * @param {number} nonce
    * @param {number | undefined} [ts]
    */
    constructor(account_id: number, to_address: string, from_sub_account_id: number, to_sub_account_id: number, token: number, fee: string, amount: string, nonce: number, ts?: number | undefined);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {Transfer}
    */
    build(): Transfer;
}
/**
*/
export class Transfer {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {string} token_symbol
    * @returns {string}
    */
    getEthSignMsg(token_symbol: string): string;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class LiquidationBuilder {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {number} sub_account_nonce
    * @param {any[]} contract_prices
    * @param {any[]} margin_prices
    * @param {number} liquidation_account_id
    * @param {string} fee
    * @param {number} fee_token
    */
    constructor(account_id: number, sub_account_id: number, sub_account_nonce: number, contract_prices: any[], margin_prices: any[], liquidation_account_id: number, fee: string, fee_token: number);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {Liquidation}
    */
    build(): Liquidation;
}
/**
*/
export class Liquidation {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class UpdateGlobalVarBuilder {
    /**
    * @param {number} from_chain_id
    * @param {number} sub_account_id
    * @param {Parameter} parameter
    * @param {number} serial_id
    */
    constructor(from_chain_id: number, sub_account_id: number, parameter: Parameter, serial_id: number);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {UpdateGlobalVar}
    */
    build(): UpdateGlobalVar;
}
/**
*/
export class UpdateGlobalVar {
    static __wrap(ptr: any): any;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @returns {any}
    */
    zklinkTx(): any;
}
/**
*/
export class AccountQuery {
    /**
    * @param {AccountQueryType} query_type
    * @param {string} query_param
    */
    constructor(query_type: AccountQueryType, query_param: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
}
/**
*/
export class ContractInfo {
    /**
    * @param {number} pair_id
    * @param {string} symbol
    * @param {number} initial_margin_rate
    * @param {number} maintenance_margin_rate
    */
    constructor(pair_id: number, symbol: string, initial_margin_rate: number, maintenance_margin_rate: number);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class ContractPrice {
    /**
    * @param {number} pair_id
    * @param {string} market_price
    */
    constructor(pair_id: number, market_price: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class Create2Data {
    /**
    * @param {string} creator_address
    * @param {string} salt
    * @param {string} code_hash
    */
    constructor(creator_address: string, salt: string, code_hash: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @param {string} pubkey_hash
    * @returns {string}
    */
    salt(pubkey_hash: string): string;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class EthTxOption {
    /**
    * @param {boolean} is_support_eip1559
    * @param {string} to
    * @param {number | undefined} [nonce]
    * @param {string | undefined} [value]
    * @param {number | undefined} [gas]
    * @param {string | undefined} [gas_price]
    */
    constructor(is_support_eip1559: boolean, to: string, nonce?: number | undefined, value?: string | undefined, gas?: number | undefined, gas_price?: string | undefined);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class FundingInfo {
    /**
    * @param {number} pair_id
    * @param {number} funding_rate
    * @param {string} price
    */
    constructor(pair_id: number, funding_rate: number, price: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class MarginInfo {
    /**
    * @param {number} margin_id
    * @param {number} token_id
    * @param {number} ratio
    */
    constructor(margin_id: number, token_id: number, ratio: number);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class Order {
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {number} slot_id
    * @param {number} nonce
    * @param {number} base_token_id
    * @param {number} quote_token_id
    * @param {string} amount
    * @param {string} price
    * @param {boolean} is_sell
    * @param {number} maker_fee_rate
    * @param {number} taker_fee_rate
    * @param {boolean} has_subsidy
    */
    constructor(account_id: number, sub_account_id: number, slot_id: number, nonce: number, base_token_id: number, quote_token_id: number, amount: string, price: string, is_sell: boolean, maker_fee_rate: number, taker_fee_rate: number, has_subsidy: boolean);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
    /**
    * @param {ZkLinkSigner} signer
    * @returns {any}
    */
    sign(signer: ZkLinkSigner): any;
}
/**
*/
export class Parameter {
    /**
    * @param {ParameterType} parameter_type
    * @param {any} parameter_value
    */
    constructor(parameter_type: ParameterType, parameter_value: any);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
}
/**
*/
export class RpcClient {
    /**
    * @param {string} network
    * @param {string | undefined} [custom_url]
    */
    constructor(network: string, custom_url?: string | undefined);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {Promise<any>}
    */
    getSupportTokens(): Promise<any>;
    /**
    * @param {AccountQuery} account_query
    * @param {number | undefined} [sub_account_id]
    * @param {number | undefined} [block_number]
    * @returns {Promise<any>}
    */
    getAccountSnapshot(account_query: AccountQuery, sub_account_id?: number | undefined, block_number?: number | undefined): Promise<any>;
    /**
    * @param {any} tx
    * @param {TxLayer1Signature | undefined} [l1_signature]
    * @param {TxZkLinkSignature | undefined} [l2_signature]
    * @returns {Promise<any>}
    */
    sendTransaction(tx: any, l1_signature?: TxLayer1Signature | undefined, l2_signature?: TxZkLinkSignature | undefined): Promise<any>;
    /**
    * @returns {Promise<any>}
    */
    getSupportChains(): Promise<any>;
    /**
    * @returns {Promise<any>}
    */
    getLatestBlockNumber(): Promise<any>;
    /**
    * @param {number | undefined} block_number
    * @param {boolean} include_tx
    * @param {boolean} include_update
    * @returns {Promise<any>}
    */
    getBlockByNumber(block_number: number | undefined, include_tx: boolean, include_update: boolean): Promise<any>;
    /**
    * @param {bigint} last_tx_timestamp_micro
    * @param {boolean} include_tx
    * @param {boolean} include_update
    * @param {number | undefined} [limit]
    * @returns {Promise<any>}
    */
    getPendingBlock(last_tx_timestamp_micro: bigint, include_tx: boolean, include_update: boolean, limit?: number | undefined): Promise<any>;
    /**
    * @param {number} block_number
    * @returns {Promise<any>}
    */
    getBlockOnChainByNumber(block_number: number): Promise<any>;
    /**
    * @param {AccountQuery} account_query
    * @returns {Promise<any>}
    */
    getAccount(account_query: AccountQuery): Promise<any>;
    /**
    * @param {number} account_id
    * @param {number | undefined} [sub_account_id]
    * @returns {Promise<any>}
    */
    getAccountBalances(account_id: number, sub_account_id?: number | undefined): Promise<any>;
    /**
    * @param {number} account_id
    * @param {number | undefined} [sub_account_id]
    * @returns {Promise<any>}
    */
    getAccountOrderSlots(account_id: number, sub_account_id?: number | undefined): Promise<any>;
    /**
    * @param {number} token_id
    * @param {boolean} mapping
    * @returns {Promise<any>}
    */
    getTokenReserve(token_id: number, mapping: boolean): Promise<any>;
    /**
    * @param {string} hash
    * @param {boolean} include_update
    * @returns {Promise<any>}
    */
    getTransactionByHash(hash: string, include_update: boolean): Promise<any>;
    /**
    * @param {ZkLinkTxType} tx_type
    * @param {string} address
    * @param {bigint} page_index
    * @param {number} page_size
    * @returns {Promise<any>}
    */
    getAccountTransactionHistory(tx_type: ZkLinkTxType, address: string, page_index: bigint, page_size: number): Promise<any>;
    /**
    * @param {bigint} last_tx_timestamp
    * @param {number} max_txs
    * @returns {Promise<any>}
    */
    getWithdrawTxs(last_tx_timestamp: bigint, max_txs: number): Promise<any>;
    /**
    * @param {number} sub_account_id
    * @param {bigint} offset_id
    * @param {bigint} limit
    * @returns {Promise<any>}
    */
    pullForwardTxs(sub_account_id: number, offset_id: bigint, limit: bigint): Promise<any>;
    /**
    * @param {string} topic
    * @param {number} from_topic_index_included
    * @param {number | undefined} [limit]
    * @returns {Promise<any>}
    */
    getWebSocketEvents(topic: string, from_topic_index_included: number, limit?: number | undefined): Promise<any>;
}
/**
*/
export class Signer {
    /**
    * @param {string} private_key
    * @param {L1Type} l1_type
    * @param {string | undefined} [starknet_chain_id]
    * @param {string | undefined} [starknet_addr]
    */
    constructor(private_key: string, l1_type: L1Type, starknet_chain_id?: string | undefined, starknet_addr?: string | undefined);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {string}
    */
    getPubkey(): string;
    /**
    * @returns {string}
    */
    getPubkeyHash(): string;
    /**
    * @param {ChangePubKey} tx
    * @returns {any}
    */
    signChangePubkeyWithOnchain(tx: ChangePubKey): any;
    /**
    * @param {ChangePubKey} tx
    * @returns {any}
    */
    signChangePubkeyWithEthEcdsaAuth(tx: ChangePubKey): any;
    /**
    * @param {ChangePubKey} tx
    * @param {Create2Data} create2_data
    * @returns {any}
    */
    signChangePubkeyWithCreate2DataAuth(tx: ChangePubKey, create2_data: Create2Data): any;
    /**
    * @param {Transfer} tx
    * @param {string} token_symbol
    * @param {string | undefined} [chain_id]
    * @param {string | undefined} [addr]
    * @returns {any}
    */
    signTransfer(tx: Transfer, token_symbol: string, chain_id?: string | undefined, addr?: string | undefined): any;
    /**
    * @param {Order} order
    * @returns {any}
    */
    createSignedOrder(order: Order): any;
    /**
    * @param {OrderMatching} tx
    * @returns {any}
    */
    signOrderMatching(tx: OrderMatching): any;
    /**
    * @param {Withdraw} tx
    * @param {string} token_symbol
    * @param {string | undefined} [chain_id]
    * @param {string | undefined} [addr]
    * @returns {any}
    */
    signWithdraw(tx: Withdraw, token_symbol: string, chain_id?: string | undefined, addr?: string | undefined): any;
    /**
    * @param {ForcedExit} tx
    * @returns {any}
    */
    signForcedExit(tx: ForcedExit): any;
    /**
    * @param {AutoDeleveraging} tx
    * @returns {any}
    */
    signAutoDeleveraging(tx: AutoDeleveraging): any;
    /**
    * @param {Contract} contract
    * @returns {any}
    */
    createSignedContract(contract: Contract): any;
    /**
    * @param {ContractMatching} tx
    * @returns {any}
    */
    signContractMatching(tx: ContractMatching): any;
    /**
    * @param {Funding} tx
    * @returns {any}
    */
    signFunding(tx: Funding): any;
    /**
    * @param {Liquidation} tx
    * @returns {any}
    */
    signLiquidation(tx: Liquidation): any;
    /**
    * @param {Uint8Array} msg
    * @returns {TxZkLinkSignature}
    */
    signMusig(msg: Uint8Array): TxZkLinkSignature;
    /**
    * @returns {ZkLinkSigner}
    */
    getZkLinkSigner(): ZkLinkSigner;
}
/**
*/
export class SpotPriceInfo {
    /**
    * @param {number} token_id
    * @param {string} price
    */
    constructor(token_id: number, price: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {any}
    */
    jsValue(): any;
}
/**
*/
export class TxLayer1Signature {
    /**
    * @param {L1SignatureType} sign_type
    * @param {string} signature
    */
    constructor(sign_type: L1SignatureType, signature: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {L1SignatureType}
    */
    signType(): L1SignatureType;
    /**
    * @returns {string}
    */
    signature(): string;
}
/**
*/
export class TxZkLinkSignature {
    static __wrap(ptr: any): any;
    /**
    * @param {string} pub_key
    * @param {string} signature
    */
    constructor(pub_key: string, signature: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {string}
    */
    pubKey(): string;
    /**
    * @returns {string}
    */
    signature(): string;
}
/**
*/
export class Wallet {
    /**
    * @param {string} url
    * @param {string} private_key
    */
    constructor(url: string, private_key: string);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
    * @returns {Promise<string>}
    */
    getBalance(): Promise<string>;
    /**
    * @param {BlockNumber} block_number
    * @param {number | undefined} [block]
    * @returns {Promise<number>}
    */
    getNonce(block_number: BlockNumber, block?: number | undefined): Promise<number>;
    /**
    * @param {EthTxOption} eth_params
    * @returns {Promise<string>}
    */
    getDepositFee(eth_params: EthTxOption): Promise<string>;
    /**
    * @param {string} tx_hash
    * @param {number | undefined} [timeout]
    * @returns {Promise<WaitForTxStatus>}
    */
    waitForTransaction(tx_hash: string, timeout?: number | undefined): Promise<WaitForTxStatus>;
    /**
    * @param {string} contract
    * @param {string} amount
    * @param {EthTxOption} eth_params
    * @returns {Promise<string>}
    */
    approveERC20(contract: string, amount: string, eth_params: EthTxOption): Promise<string>;
    /**
    * @param {number} sub_account_id
    * @param {string} deposit_to
    * @param {string} token_addr
    * @param {string} amount
    * @param {boolean} mapping
    * @param {EthTxOption} eth_params
    * @param {boolean} is_gateway
    * @returns {Promise<string>}
    */
    depositERC20(sub_account_id: number, deposit_to: string, token_addr: string, amount: string, mapping: boolean, eth_params: EthTxOption, is_gateway: boolean): Promise<string>;
    /**
    * @param {number} sub_account_id
    * @param {string} deposit_to
    * @param {EthTxOption} eth_params
    * @param {boolean} is_gateway
    * @returns {Promise<string>}
    */
    depositETH(sub_account_id: number, deposit_to: string, eth_params: EthTxOption, is_gateway: boolean): Promise<string>;
    /**
    * @param {number} nonce
    * @param {string} new_pubkey_hash
    * @param {EthTxOption} eth_params
    * @returns {Promise<string>}
    */
    setAuthPubkeyHash(nonce: number, new_pubkey_hash: string, eth_params: EthTxOption): Promise<string>;
    /**
    * @param {number} account_id
    * @param {number} sub_account_id
    * @param {number} token_id
    * @param {boolean} mapping
    * @param {EthTxOption} eth_params
    * @returns {Promise<string>}
    */
    fullExit(account_id: number, sub_account_id: number, token_id: number, mapping: boolean, eth_params: EthTxOption): Promise<string>;
}
/**
*/
export class ZkLinkSigner {
    static __wrap(ptr: any): any;
    /**
    * @param {string} sig
    * @returns {ZkLinkSigner}
    */
    static ethSig(sig: string): ZkLinkSigner;
    /**
    * @param {string} sig
    * @returns {ZkLinkSigner}
    */
    static starknetSig(sig: string): ZkLinkSigner;
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
}
/**
*/
export class ZkLinkTx {
    /**
    * @param {number} tx_type
    * @param {any} tx
    */
    constructor(tx_type: number, tx: any);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
}
declare let wasm: any;
export { wasm as __wasm };
