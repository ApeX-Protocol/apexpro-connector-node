/* tslint:disable */
/* eslint-disable */
/**
* @param {FundingBuilder} builder
* @returns {Funding}
*/
export function newFunding(builder: FundingBuilder): Funding;
/**
* @param {ForcedExitBuilder} builder
* @returns {ForcedExit}
*/
export function newForcedExit(builder: ForcedExitBuilder): ForcedExit;
/**
* @param {WithdrawBuilder} builder
* @returns {Withdraw}
*/
export function newWithdraw(builder: WithdrawBuilder): Withdraw;
/**
* @param {ContractMatchingBuilder} builder
* @returns {ContractMatching}
*/
export function newContractMatching(builder: ContractMatchingBuilder): ContractMatching;
/**
* @param {ContractBuilder} builder
* @returns {Contract}
*/
export function newContract(builder: ContractBuilder): Contract;
/**
* @param {OrderMatchingBuilder} builder
* @returns {OrderMatching}
*/
export function newOrderMatching(builder: OrderMatchingBuilder): OrderMatching;
/**
* @param {string} amount
* @returns {boolean}
*/
export function isTokenAmountPackable(amount: string): boolean;
/**
* @param {string} fee
* @returns {boolean}
*/
export function isFeeAmountPackable(fee: string): boolean;
/**
* @param {string} amount
* @returns {string}
*/
export function closestPackableTransactionAmount(amount: string): string;
/**
* @param {string} fee
* @returns {string}
*/
export function closestPackableTransactionFee(fee: string): string;
/**
* @param {ChangePubKeyBuilder} builder
* @returns {ChangePubKey}
*/
export function newChangePubkey(builder: ChangePubKeyBuilder): ChangePubKey;
/**
* @param {AutoDeleveragingBuilder} builder
* @returns {AutoDeleveraging}
*/
export function newAutoDeleveraging(builder: AutoDeleveragingBuilder): AutoDeleveraging;
/**
* @param {TransferBuilder} builder
* @returns {Transfer}
*/
export function newTransfer(builder: TransferBuilder): Transfer;
/**
* @param {LiquidationBuilder} builder
* @returns {Liquidation}
*/
export function newLiquidation(builder: LiquidationBuilder): Liquidation;
/**
* @param {UpdateGlobalVarBuilder} builder
* @returns {UpdateGlobalVar}
*/
export function newUpdateGlobalVar(builder: UpdateGlobalVarBuilder): UpdateGlobalVar;
/**
*/
export enum ParameterType {
  FeeAccount = 0,
  InsuranceFundAccount = 1,
  MarginInfo = 2,
  FundingInfos = 3,
  ContractInfo = 4,
}
/**
*/
export enum EthAuthType {
  OnChain = 0,
  EthECDSA = 1,
  EthCREATE2 = 2,
}
/**
* A set of L2 transaction type supported by the zklink network.
*/
export enum ZkLinkTxType {
  Deposit = 1,
  FullExit = 5,
  ChangePubKey = 6,
  Transfer = 4,
  Withdraw = 3,
  ForcedExit = 7,
  OrderMatching = 8,
  AutoDeleveraging = 11,
  ContractMatching = 9,
  Funding = 13,
  Liquidation = 10,
  UpdateGlobalVar = 12,
}
/**
*/
export enum WaitForTxStatus {
  Success = 0,
  Failed = 1,
  Pending = 2,
}
/**
*/
export enum BlockNumber {
  Latest = 0,
  Finalized = 1,
  Safe = 2,
  Earliest = 3,
  Pending = 4,
  Number = 5,
}
/**
*/
export enum AccountQueryType {
  AccountId = 0,
  Address = 1,
}
/**
*/
export enum L1SignatureType {
  Eth = 0,
  Eip1271 = 1,
  Stark = 2,
}
/**
*/
export enum L1Type {
  Eth = 0,
  Starknet = 1,
}
/**
*/
export class AccountQuery {
  free(): void;
/**
* @param {AccountQueryType} query_type
* @param {string} query_param
*/
  constructor(query_type: AccountQueryType, query_param: string);
}
/**
*/
export class AutoDeleveraging {
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
export class AutoDeleveragingBuilder {
  free(): void;
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
/**
* @returns {AutoDeleveraging}
*/
  build(): AutoDeleveraging;
}
/**
*/
export class ChangePubKey {
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
export class ChangePubKeyBuilder {
  free(): void;
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
  constructor(chain_id: number, account_id: number, sub_account_id: number, new_pubkey_hash: string, fee_token: number, fee: string, nonce: number, eth_signature?: string, ts?: number);
/**
* @returns {ChangePubKey}
*/
  build(): ChangePubKey;
}
/**
*/
export class Contract {
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
  free(): void;
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
/**
* @returns {Contract}
*/
  build(): Contract;
}
/**
*/
export class ContractInfo {
  free(): void;
/**
* @param {number} pair_id
* @param {string} symbol
* @param {number} initial_margin_rate
* @param {number} maintenance_margin_rate
*/
  constructor(pair_id: number, symbol: string, initial_margin_rate: number, maintenance_margin_rate: number);
/**
* @returns {any}
*/
  jsValue(): any;
}
/**
*/
export class ContractMatching {
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
export class ContractMatchingBuilder {
  free(): void;
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
/**
* @returns {ContractMatching}
*/
  build(): ContractMatching;
}
/**
*/
export class ContractPrice {
  free(): void;
/**
* @param {number} pair_id
* @param {string} market_price
*/
  constructor(pair_id: number, market_price: string);
/**
* @returns {any}
*/
  jsValue(): any;
}
/**
*/
export class Create2Data {
  free(): void;
/**
* @param {string} creator_address
* @param {string} salt
* @param {string} code_hash
*/
  constructor(creator_address: string, salt: string, code_hash: string);
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
  free(): void;
/**
* @param {boolean} is_support_eip1559
* @param {string} to
* @param {number | undefined} [nonce]
* @param {string | undefined} [value]
* @param {number | undefined} [gas]
* @param {string | undefined} [gas_price]
*/
  constructor(is_support_eip1559: boolean, to: string, nonce?: number, value?: string, gas?: number, gas_price?: string);
/**
* @returns {any}
*/
  jsValue(): any;
}
/**
*/
export class ForcedExit {
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
  free(): void;
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
  constructor(to_chain_id: number, initiator_account_id: number, initiator_sub_account_id: number, target_sub_account_id: number, target: string, l2_source_token: number, l1_target_token: number, exit_amount: string, initiator_nonce: number, withdraw_to_l1: boolean, ts?: number);
/**
* @returns {ForcedExit}
*/
  build(): ForcedExit;
}
/**
*/
export class Funding {
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
export class FundingBuilder {
  free(): void;
/**
* @param {number} account_id
* @param {number} sub_account_id
* @param {number} sub_account_nonce
* @param {Uint32Array} funding_account_ids
* @param {string} fee
* @param {number} fee_token
*/
  constructor(account_id: number, sub_account_id: number, sub_account_nonce: number, funding_account_ids: Uint32Array, fee: string, fee_token: number);
/**
* @returns {Funding}
*/
  build(): Funding;
}
/**
*/
export class FundingInfo {
  free(): void;
/**
* @param {number} pair_id
* @param {number} funding_rate
* @param {string} price
*/
  constructor(pair_id: number, funding_rate: number, price: string);
/**
* @returns {any}
*/
  jsValue(): any;
}
/**
*/
export class Liquidation {
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
export class LiquidationBuilder {
  free(): void;
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
/**
* @returns {Liquidation}
*/
  build(): Liquidation;
}
/**
*/
export class MarginInfo {
  free(): void;
/**
* @param {number} margin_id
* @param {number} token_id
* @param {number} ratio
*/
  constructor(margin_id: number, token_id: number, ratio: number);
/**
* @returns {any}
*/
  jsValue(): any;
}
/**
*/
export class Order {
  free(): void;
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
export class OrderMatching {
  free(): void;
/**
* @returns {any}
*/
  jsValue(): any;
}
/**
*/
export class OrderMatchingBuilder {
  free(): void;
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
/**
* @returns {OrderMatching}
*/
  build(): OrderMatching;
}
/**
*/
export class Parameter {
  free(): void;
/**
* @param {ParameterType} parameter_type
* @param {any} parameter_value
*/
  constructor(parameter_type: ParameterType, parameter_value: any);
}
/**
*/
export class RpcClient {
  free(): void;
/**
* @param {string} network
* @param {string | undefined} [custom_url]
*/
  constructor(network: string, custom_url?: string);
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
  getAccountSnapshot(account_query: AccountQuery, sub_account_id?: number, block_number?: number): Promise<any>;
/**
* @param {any} tx
* @param {TxLayer1Signature | undefined} [l1_signature]
* @param {TxZkLinkSignature | undefined} [l2_signature]
* @returns {Promise<any>}
*/
  sendTransaction(tx: any, l1_signature?: TxLayer1Signature, l2_signature?: TxZkLinkSignature): Promise<any>;
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
  getPendingBlock(last_tx_timestamp_micro: bigint, include_tx: boolean, include_update: boolean, limit?: number): Promise<any>;
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
  getAccountBalances(account_id: number, sub_account_id?: number): Promise<any>;
/**
* @param {number} account_id
* @param {number | undefined} [sub_account_id]
* @returns {Promise<any>}
*/
  getAccountOrderSlots(account_id: number, sub_account_id?: number): Promise<any>;
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
  getWebSocketEvents(topic: string, from_topic_index_included: number, limit?: number): Promise<any>;
}
/**
*/
export class Signer {
  free(): void;
/**
* @param {string} private_key
* @param {L1Type} l1_type
* @param {string | undefined} [starknet_chain_id]
* @param {string | undefined} [starknet_addr]
*/
  constructor(private_key: string, l1_type: L1Type, starknet_chain_id?: string, starknet_addr?: string);
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
  signTransfer(tx: Transfer, token_symbol: string, chain_id?: string, addr?: string): any;
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
  signWithdraw(tx: Withdraw, token_symbol: string, chain_id?: string, addr?: string): any;
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
  free(): void;
/**
* @param {number} token_id
* @param {string} price
*/
  constructor(token_id: number, price: string);
/**
* @returns {any}
*/
  jsValue(): any;
}
/**
*/
export class Transfer {
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
export class TransferBuilder {
  free(): void;
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
  constructor(account_id: number, to_address: string, from_sub_account_id: number, to_sub_account_id: number, token: number, fee: string, amount: string, nonce: number, ts?: number);
/**
* @returns {Transfer}
*/
  build(): Transfer;
}
/**
*/
export class TxLayer1Signature {
  free(): void;
/**
* @param {L1SignatureType} sign_type
* @param {string} signature
*/
  constructor(sign_type: L1SignatureType, signature: string);
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
  free(): void;
/**
* @param {string} pub_key
* @param {string} signature
*/
  constructor(pub_key: string, signature: string);
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
export class UpdateGlobalVar {
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
export class UpdateGlobalVarBuilder {
  free(): void;
/**
* @param {number} from_chain_id
* @param {number} sub_account_id
* @param {Parameter} parameter
* @param {number} serial_id
*/
  constructor(from_chain_id: number, sub_account_id: number, parameter: Parameter, serial_id: number);
/**
* @returns {UpdateGlobalVar}
*/
  build(): UpdateGlobalVar;
}
/**
*/
export class Wallet {
  free(): void;
/**
* @param {string} url
* @param {string} private_key
*/
  constructor(url: string, private_key: string);
/**
* @returns {Promise<string>}
*/
  getBalance(): Promise<string>;
/**
* @param {BlockNumber} block_number
* @param {number | undefined} [block]
* @returns {Promise<number>}
*/
  getNonce(block_number: BlockNumber, block?: number): Promise<number>;
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
  waitForTransaction(tx_hash: string, timeout?: number): Promise<WaitForTxStatus>;
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
export class Withdraw {
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
export class WithdrawBuilder {
  free(): void;
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
  constructor(account_id: number, sub_account_id: number, to_chain_id: number, to_address: string, l2_source_token: number, l1_target_token: number, amount: string, call_data: string | undefined, fee: string, nonce: number, withdraw_to_l1: boolean, withdraw_fee_ratio: number, ts?: number);
/**
* @returns {Withdraw}
*/
  build(): Withdraw;
}
/**
*/
export class ZkLinkSigner {
  free(): void;
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
}
/**
*/
export class ZkLinkTx {
  free(): void;
/**
* @param {number} tx_type
* @param {any} tx
*/
  constructor(tx_type: number, tx: any);
}
