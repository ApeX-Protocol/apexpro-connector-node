"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.TimeInForce = void 0;
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
