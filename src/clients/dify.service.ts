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

export class DifyService {
  private config: HttpClientServiceConfig;

  constructor(config: HttpClientServiceConfig) {
    this.config = { defaultHeaders: {}, ...config };
  }

  async getUploadFile(params: GetUploadFileParams) {
    const url = `${this.config.baseUrl}/datasets/${params.dataset_id}/documents/${params.document_id}/upload-file`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.config.apiKey}`, Accept: 'application/json', ...this.config.defaultHeaders },
      method: 'GET',
    });

    // console.log('response:', response);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
