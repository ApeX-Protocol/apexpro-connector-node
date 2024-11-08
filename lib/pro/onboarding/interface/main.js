"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRecordType = exports.OrderStatus = exports.TimeInForce = exports.OrderType = exports.OrderSide = exports.PositionStatus = exports.LeaguesExpectedOutcome = exports.LeaderboardPnlPeriod = exports.AccountLeaderboardPnlPeriod = exports.SideAction = exports.AccountAction = exports.RequestMethod = exports.SignatureTypes = exports.SigningMethod = exports.TransferAsset = exports.ApexAsset = exports.ApexMarket = void 0;
var ApexMarket;
(function (ApexMarket) {
    ApexMarket["BTC_USDT"] = "BTC-USDT";
    ApexMarket["BTC_USDC"] = "BTC-USDC";
    ApexMarket["BTC_USD"] = "BTC-USD";
    ApexMarket["ETH_USD"] = "ETH-USD";
    ApexMarket["ETH_USDC"] = "ETH-USDC";
    ApexMarket["LINK_USD"] = "LINK-USD";
    ApexMarket["AAVE_USD"] = "AAVE-USD";
    ApexMarket["UNI_USD"] = "UNI-USD";
    ApexMarket["SUSHI_USD"] = "SUSHI-USD";
    ApexMarket["SOL_USD"] = "SOL-USD";
    ApexMarket["YFI_USD"] = "YFI-USD";
    ApexMarket["ONEINCH_USD"] = "1INCH-USD";
    ApexMarket["AVAX_USD"] = "AVAX-USD";
    ApexMarket["SNX_USD"] = "SNX-USD";
    ApexMarket["CRV_USD"] = "CRV-USD";
    ApexMarket["UMA_USD"] = "UMA-USD";
    ApexMarket["DOT_USD"] = "DOT-USD";
    ApexMarket["DOGE_USD"] = "DOGE-USD";
    ApexMarket["MATIC_USD"] = "MATIC-USD";
    ApexMarket["MKR_USD"] = "MKR-USD";
    ApexMarket["FIL_USD"] = "FIL-USD";
    ApexMarket["ADA_USD"] = "ADA-USD";
    ApexMarket["ATOM_USD"] = "ATOM-USD";
    ApexMarket["COMP_USD"] = "COMP-USD";
    ApexMarket["BCH_USD"] = "BCH-USD";
    ApexMarket["LTC_USD"] = "LTC-USD";
    ApexMarket["EOS_USD"] = "EOS-USD";
    ApexMarket["ALGO_USD"] = "ALGO-USD";
    ApexMarket["ZRX_USD"] = "ZRX-USD";
    ApexMarket["XMR_USD"] = "XMR-USD";
    ApexMarket["ZEC_USD"] = "ZEC-USD";
    ApexMarket["ENJ_USD"] = "ENJ-USD";
    ApexMarket["ETC_USD"] = "ETC-USD";
    ApexMarket["XLM_USD"] = "XLM-USD";
    ApexMarket["TRX_USD"] = "TRX-USD";
    ApexMarket["XTZ_USD"] = "XTZ-USD";
    ApexMarket["HNT_USD"] = "HNT-USD";
})(ApexMarket || (exports.ApexMarket = ApexMarket = {}));
var ApexAsset;
(function (ApexAsset) {
    ApexAsset["USDC"] = "USDC";
    ApexAsset["USDT"] = "USDT";
    ApexAsset["BTC"] = "BTC";
    ApexAsset["ETH"] = "ETH";
    ApexAsset["LINK"] = "LINK";
    ApexAsset["AAVE"] = "AAVE";
    ApexAsset["UNI"] = "UNI";
    ApexAsset["SUSHI"] = "SUSHI";
    ApexAsset["SOL"] = "SOL";
    ApexAsset["YFI"] = "YFI";
    ApexAsset["ONEINCH"] = "1INCH";
    ApexAsset["AVAX"] = "AVAX";
    ApexAsset["SNX"] = "SNX";
    ApexAsset["CRV"] = "CRV";
    ApexAsset["UMA"] = "UMA";
    ApexAsset["DOT"] = "DOT";
    ApexAsset["DOGE"] = "DOGE";
    ApexAsset["MATIC"] = "MATIC";
    ApexAsset["MKR"] = "MKR";
    ApexAsset["FIL"] = "FIL";
    ApexAsset["ADA"] = "ADA";
    ApexAsset["ATOM"] = "ATOM";
    ApexAsset["COMP"] = "COMP";
    ApexAsset["BCH"] = "BCH";
    ApexAsset["LTC"] = "LTC";
    ApexAsset["EOS"] = "EOS";
    ApexAsset["ALGO"] = "ALGO";
    ApexAsset["ZRX"] = "ZRX";
    ApexAsset["XMR"] = "XMR";
    ApexAsset["ZEC"] = "ZEC";
    ApexAsset["ENJ"] = "ENJ";
    ApexAsset["ETC"] = "ETC";
    ApexAsset["XLM"] = "XLM";
    ApexAsset["TRX"] = "TRX";
    ApexAsset["XTZ"] = "XTZ";
    ApexAsset["HNT"] = "HNT";
})(ApexAsset || (exports.ApexAsset = ApexAsset = {}));
var TransferAsset;
(function (TransferAsset) {
    TransferAsset["USDC"] = "USDC";
    TransferAsset["USDT"] = "USDT";
})(TransferAsset || (exports.TransferAsset = TransferAsset = {}));
var SigningMethod;
(function (SigningMethod) {
    SigningMethod["Compatibility"] = "Compatibility";
    SigningMethod["UnsafeHash"] = "UnsafeHash";
    SigningMethod["Hash"] = "Hash";
    SigningMethod["TypedData"] = "TypedData";
    SigningMethod["MetaMask"] = "MetaMask";
    SigningMethod["MetaMaskLatest"] = "MetaMaskLatest";
    SigningMethod["CoinbaseWallet"] = "CoinbaseWallet";
    SigningMethod["Personal"] = "Personal";
    SigningMethod["Personal2"] = "Personal2";
})(SigningMethod || (exports.SigningMethod = SigningMethod = {}));
var SignatureTypes;
(function (SignatureTypes) {
    SignatureTypes[SignatureTypes["NO_PREPEND"] = 0] = "NO_PREPEND";
    SignatureTypes[SignatureTypes["DECIMAL"] = 1] = "DECIMAL";
    SignatureTypes[SignatureTypes["HEXADECIMAL"] = 2] = "HEXADECIMAL";
    SignatureTypes[SignatureTypes["PERSONAL"] = 3] = "PERSONAL";
})(SignatureTypes || (exports.SignatureTypes = SignatureTypes = {}));
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["POST"] = "POST";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["GET"] = "GET";
    RequestMethod["DELETE"] = "DELETE";
})(RequestMethod || (exports.RequestMethod = RequestMethod = {}));
var AccountAction;
(function (AccountAction) {
    AccountAction["DEPOSIT"] = "DEPOSIT";
    AccountAction["WITHDRAWAL"] = "WITHDRAWAL";
})(AccountAction || (exports.AccountAction = AccountAction = {}));
/**
 * @param LONG
 * @param SHORT
 * */
var SideAction;
(function (SideAction) {
    SideAction["LONG"] = "LONG";
    SideAction["SHORT"] = "SHORT";
})(SideAction || (exports.SideAction = SideAction = {}));
var AccountLeaderboardPnlPeriod;
(function (AccountLeaderboardPnlPeriod) {
    AccountLeaderboardPnlPeriod["DAILY"] = "DAILY";
    AccountLeaderboardPnlPeriod["WEEKLY"] = "WEEKLY";
    AccountLeaderboardPnlPeriod["MONTHLY"] = "MONTHLY";
    AccountLeaderboardPnlPeriod["ALL_TIME"] = "ALL_TIME";
    AccountLeaderboardPnlPeriod["COMPETITION"] = "COMPETITION";
    AccountLeaderboardPnlPeriod["DAILY_COMPETITION"] = "DAILY_COMPETITION";
    AccountLeaderboardPnlPeriod["LEAGUES"] = "LEAGUES";
})(AccountLeaderboardPnlPeriod || (exports.AccountLeaderboardPnlPeriod = AccountLeaderboardPnlPeriod = {}));
var LeaderboardPnlPeriod;
(function (LeaderboardPnlPeriod) {
    LeaderboardPnlPeriod["DAILY"] = "DAILY";
    LeaderboardPnlPeriod["WEEKLY"] = "WEEKLY";
    LeaderboardPnlPeriod["MONTHLY"] = "MONTHLY";
    LeaderboardPnlPeriod["ALL_TIME"] = "ALL_TIME";
    LeaderboardPnlPeriod["COMPETITION"] = "COMPETITION";
    LeaderboardPnlPeriod["DAILY_COMPETITION"] = "DAILY_COMPETITION";
    LeaderboardPnlPeriod["BRONZE"] = "BRONZE";
    LeaderboardPnlPeriod["SILVER"] = "SILVER";
    LeaderboardPnlPeriod["GOLD"] = "GOLD";
    LeaderboardPnlPeriod["PLATINUM"] = "PLATINUM";
    LeaderboardPnlPeriod["DIAMOND"] = "DIAMOND";
})(LeaderboardPnlPeriod || (exports.LeaderboardPnlPeriod = LeaderboardPnlPeriod = {}));
var LeaguesExpectedOutcome;
(function (LeaguesExpectedOutcome) {
    LeaguesExpectedOutcome["PROMOTION"] = "PROMOTION";
    LeaguesExpectedOutcome["DEMOTION"] = "DEMOTION";
    LeaguesExpectedOutcome["SAME_LEAGUE"] = "SAME_LEAGUE";
    // deprecated.
    LeaguesExpectedOutcome["RELEGATION"] = "RELEGATION";
})(LeaguesExpectedOutcome || (exports.LeaguesExpectedOutcome = LeaguesExpectedOutcome = {}));
var PositionStatus;
(function (PositionStatus) {
    PositionStatus["OPEN"] = "OPEN";
    PositionStatus["CLOSED"] = "CLOSED";
    PositionStatus["LIQUIDATED"] = "LIQUIDATED";
})(PositionStatus || (exports.PositionStatus = PositionStatus = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
var OrderType;
(function (OrderType) {
    OrderType["LIMIT_ORDER_WITH_FEES"] = "LIMIT_ORDER_WITH_FEES";
})(OrderType || (exports.OrderType = OrderType = {}));
var TimeInForce;
(function (TimeInForce) {
    TimeInForce["GTT"] = "GTT";
    TimeInForce["FOK"] = "FOK";
    TimeInForce["IOC"] = "IOC";
})(TimeInForce || (exports.TimeInForce = TimeInForce = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["OPEN"] = "OPEN";
    OrderStatus["FILLED"] = "FILLED";
    OrderStatus["CANCELED"] = "CANCELED";
    OrderStatus["UNTRIGGERED"] = "UNTRIGGERED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var OrderRecordType;
(function (OrderRecordType) {
    OrderRecordType["OPEN"] = "openOrders";
    OrderRecordType["HISTORY"] = "historyOrders";
    OrderRecordType["FILLS"] = "fills";
    OrderRecordType["PNL"] = "historicalPNL";
})(OrderRecordType || (exports.OrderRecordType = OrderRecordType = {}));
