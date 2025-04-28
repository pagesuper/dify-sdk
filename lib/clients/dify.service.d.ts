/** HTTP 服务配置 */
export interface HttpClientServiceConfig {
    baseUrl: string;
    apiKey: string;
    defaultHeaders?: Record<string, string>;
}
export interface GetUploadFileParams {
    /** 知识库ID */
    dataset_id: string;
    /** 文档ID */
    document_id: string;
}
export declare class DifyService {
    private config;
    constructor(config: HttpClientServiceConfig);
    getUploadFile(params: GetUploadFileParams): Promise<any>;
}
