import { ISO8601 } from '../interface';
export declare class Clock {
    private _timestampAdjustment;
    constructor(timestampAdjustment?: number);
    /**
     * @description Set the timestampAdjustment which is the number of seconds the system time should
     * be adjusted for every API call.
     *
     * @param timestampAdjustment seconds to adjust the system time.
     */
    setTimestampAdjustment(timestampAdjustment: number): void;
    /**
     * @description Get the current value of timestampAdjustment.
     */
    get timestampAdjustment(): number;
    /**
     * @description Get the ISO8601 string for the current time adjusted by the timestampAdjustment.
     */
    getAdjustedIsoString(): ISO8601;
}
