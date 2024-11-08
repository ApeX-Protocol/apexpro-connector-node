"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
class Clock {
    constructor(timestampAdjustment) {
        this._timestampAdjustment = timestampAdjustment || 0;
    }
    /**
     * @description Set the timestampAdjustment which is the number of seconds the system time should
     * be adjusted for every API call.
     *
     * @param timestampAdjustment seconds to adjust the system time.
     */
    setTimestampAdjustment(timestampAdjustment) {
        this._timestampAdjustment = timestampAdjustment;
    }
    /**
     * @description Get the current value of timestampAdjustment.
     */
    get timestampAdjustment() {
        return this._timestampAdjustment;
    }
    /**
     * @description Get the ISO8601 string for the current time adjusted by the timestampAdjustment.
     */
    getAdjustedIsoString() {
        const timestamp = new Date().getTime();
        return new Date(Number(timestamp) + Number(this._timestampAdjustment)).toUTCString();
    }
}
exports.Clock = Clock;
