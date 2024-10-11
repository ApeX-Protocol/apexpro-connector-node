import axios, { AxiosRequestConfig } from 'axios';
import { Trace } from './Tool';
import { ENV } from '../Constant';
import { BasicException } from './BasicException';

const debug = true;

export class ApiTool {
  env: ENV;

  constructor(env: ENV) {
    this.env = env;
  }

  async request<T = any>(
    path: string,
    method: 'get' | 'post' | 'put' | 'delete',
    data: any,
    config: any = {
      headers: {},
    },
  ): Promise<T> {
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
      } else {
        req.data = data;
      }
      if (config.headers) {
        req.headers = config.headers;
      }
      axios(req as AxiosRequestConfig)
        .then((res) => {
          if (debug) {
            Trace.debug(
              `request success ${method} ${requestUrl} data =`,
              data,
              `headers = `,
              config.headers,
              `result = `,
              res.data,
            );
          }
          resolve(res.data as T);
        })
        .catch((err) => {
          if (debug) {
            Trace.error(
              `request error ${method} ${requestUrl} data =`,
              data,
              `headers = `,
              config.headers,
              `error = `,
              err.message,
            );
          }
          const msg = err.message || 'Network Error';
          reject(msg);
        });
    });
  }

  async apiRequest<T = any>(
    path: string,
    method: 'get' | 'post' | 'put' | 'delete',
    data: any = {},
    config: any = {
      headers: {},
    },
  ): Promise<T> {
    try {
      const result = await this.request(path, method, data, config);
      if (result.code) {
        throw new BasicException(result.msg);
      }
      return result.data;
    } catch (e) {
      throw new BasicException(e.message || e);
    }
  }
}
