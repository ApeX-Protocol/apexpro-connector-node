export declare class BasicException extends Error {
    static CODE: number;
    private readonly _code;
    private readonly _msg;
    private readonly _sourceError;
    private readonly _detail;
    /**
     * @param msg
     * @param code
     * @param sourceError
     * @param detail
     */
    constructor(msg?: string, sourceError?: Error, code?: number, detail?: any);
    get code(): number;
    /**
     * 错误信息
     */
    get msg(): string;
    /**
     * 其他数据
     */
    get detail(): any;
    get sourceError(): Error;
    toString(): string;
}
