import { ENV } from '../../Constant';
export declare class ApiTool {
    env: ENV;
    constructor(env: ENV);
    request<T = any>(path: string, method: 'get' | 'post' | 'put' | 'delete', data: any, config?: any): Promise<T>;
    apiRequest<T = any>(path: string, method: 'get' | 'post' | 'put' | 'delete', data?: any, config?: any): Promise<T>;
}
