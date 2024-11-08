"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTool = void 0;
const axios_1 = __importDefault(require("axios"));
const Tool_1 = require("./Tool");
const BasicException_1 = require("../BasicException");
class ApiTool {
    constructor(env) {
        this.env = env;
    }
    async request(path, method, data, config = {
        headers: {},
    }) {
        return await new Promise((resolve, reject) => {
            const requestUrl = this.env.url + path;
            const req = {
                url: requestUrl,
                method,
                params: undefined,
                data: undefined,
                headers: {},
            };
            if (['get', 'delete'].indexOf(method.toLowerCase()) >= 0) {
                req.params = data;
            }
            else {
                req.data = data;
            }
            if (config.headers) {
                req.headers = config.headers;
            }
            (0, axios_1.default)(req)
                .then((res) => {
                Tool_1.Trace.debug(`request success ${method} ${requestUrl} data =`, data, `headers = `, config.headers, `result = `, res.data);
                resolve(res.data);
            })
                .catch((err) => {
                Tool_1.Trace.error(`request error ${method} ${requestUrl} data =`, data, `headers = `, config.headers, `error = `, err.message);
                const msg = err.message || 'Network Error';
                reject(msg);
            });
        });
    }
    async apiRequest(path, method, data = {}, config = {
        headers: {},
    }) {
        try {
            const result = await this.request(path, method, data, config);
            if (result.code) {
                throw new BasicException_1.BasicException(result.msg);
            }
            return result.data;
        }
        catch (e) {
            throw new BasicException_1.BasicException(e.message || e);
        }
    }
}
exports.ApiTool = ApiTool;
