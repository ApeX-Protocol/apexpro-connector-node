"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicException = void 0;
class BasicException extends Error {
    /**
     * @param msg
     * @param code
     * @param sourceError
     * @param detail
     */
    constructor(msg = '', sourceError = null, code = BasicException.CODE, detail = {}) {
        super(msg);
        this._code = BasicException.CODE;
        this._msg = '';
        this._sourceError = null;
        this._detail = {};
        this.name = 'BasicException';
        this._msg = msg;
        this._code = code;
        this._sourceError = sourceError;
        this._detail = detail;
    }
    get code() {
        return this._code;
    }
    /**
     * 错误信息
     */
    get msg() {
        return this._msg;
    }
    /**
     * 其他数据
     */
    get detail() {
        return this._detail;
    }
    get sourceError() {
        return this._sourceError;
    }
    toString() {
        return `${this._msg}`;
    }
}
exports.BasicException = BasicException;
BasicException.CODE = 400;
