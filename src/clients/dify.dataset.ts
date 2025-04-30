/* eslint-disable camelcase */
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

export interface CreateDocumentByTextParams {
  /** 知识库ID */
  dataset_id: string;
  /** 文档名称 */
  name: string;
  /** 文档内容 */
  text: string;
  /** 索引方式 */
  indexing_technique?: 'high_quality' | 'economy';
  /** 索引内容的形式 */
  doc_form?: 'text_model' | 'hierarchical_model' | 'qa_model';
  /** 文档语言 (Q&A模式下使用) */
  doc_language?: string;
  /** 处理规则 */
  process_rule?: {
    mode: 'automatic' | 'custom';
    rules?: {
      pre_processing_rules?: Array<{
        id: 'remove_extra_spaces' | 'remove_urls_emails';
        enabled: boolean;
      }>;
      segmentation?: {
        separator?: string;
        max_tokens?: number;
        parent_mode?: 'full-doc' | 'paragraph';
      };
      subchunk_segmentation?: {
        separator?: string;
        max_tokens?: number;
        chunk_overlap?: number;
      };
    };
  };
  /** 检索模式 */
  retrieval_model?: {
    search_method: 'hybrid_search' | 'semantic_search' | 'full_text_search';
    reranking_enable?: boolean;
    reranking_mode?: 'weighted_score';
    reranking_model?: {
      reranking_provider_name: string;
      reranking_model_name: string;
    };
    top_k?: number;
    score_threshold_enabled?: boolean;
    score_threshold?: number;
  };
  /** Embedding 模型名称 */
  embedding_model?: string;
  /** Embedding 模型供应商 */
  embedding_model_provider?: string;
}

export interface CreateDocumentByTextResponse {
  document: {
    id: string;
    position: number;
    data_source_type: string;
    data_source_info: {
      upload_file_id: string;
    };
    dataset_process_rule_id: string;
    name: string;
    created_from: string;
    created_by: string;
    created_at: number;
    tokens: number;
    indexing_status: string;
    error: null | string;
    enabled: boolean;
    disabled_at: null | number;
    disabled_by: null | string;
    archived: boolean;
    display_status: string;
    word_count: number;
    hit_count: number;
    doc_form: string;
  };
  batch: string;
}

export interface CreateDocumentByFileParams {
  /** 知识库ID */
  dataset_id: string;
  /** 需要上传的文件 */
  file: File;
  /** 源文档ID（选填，用于更新文档） */
  original_document_id?: string;
  /** 索引方式 */
  indexing_technique?: 'high_quality' | 'economy';
  /** 索引内容的形式 */
  doc_form?: 'text_model' | 'hierarchical_model' | 'qa_model';
  /** 文档语言 (Q&A模式下使用) */
  doc_language?: string;
  /** 处理规则 */
  process_rule?: {
    mode: 'automatic' | 'custom';
    rules?: {
      pre_processing_rules?: Array<{
        id: 'remove_extra_spaces' | 'remove_urls_emails';
        enabled: boolean;
      }>;
      segmentation?: {
        separator?: string;
        max_tokens?: number;
        parent_mode?: 'full-doc' | 'paragraph';
      };
      subchunk_segmentation?: {
        separator?: string;
        max_tokens?: number;
        chunk_overlap?: number;
      };
    };
  };
  /** 检索模式 */
  retrieval_model?: {
    search_method: 'hybrid_search' | 'semantic_search' | 'full_text_search';
    reranking_enable?: boolean;
    reranking_mode?: 'weighted_score';
    reranking_model?: {
      reranking_provider_name: string;
      reranking_model_name: string;
    };
    top_k?: number;
    score_threshold_enabled?: boolean;
    score_threshold?: number;
  };
  /** Embedding 模型名称 */
  embedding_model?: string;
  /** Embedding 模型供应商 */
  embedding_model_provider?: string;
}

export interface CreateDocumentByFileResponse {
  document: {
    id: string;
    position: number;
    data_source_type: string;
    data_source_info: {
      upload_file_id: string;
    };
    dataset_process_rule_id: string;
    name: string;
    created_from: string;
    created_by: string;
    created_at: number;
    tokens: number;
    indexing_status: string;
    error: null | string;
    enabled: boolean;
    disabled_at: null | number;
    disabled_by: null | string;
    archived: boolean;
    display_status: string;
    word_count: number;
    hit_count: number;
    doc_form: string;
  };
  batch: string;
}

export interface CreateDatasetParams {
  /** 知识库名称 */
  name: string;
  /** 知识库描述 */
  description?: string;
  /** 索引模式 */
  indexing_technique?: 'high_quality' | 'economy';
  /** 权限设置 */
  permission?: 'only_me' | 'all_team_members' | 'partial_members';
  /** 知识库提供方 */
  provider?: 'vendor' | 'external';
  /** 外部知识库 API_ID */
  external_knowledge_api_id?: string;
  /** 外部知识库 ID */
  external_knowledge_id?: string;
  /** Embedding 模型名称 */
  embedding_model?: string;
  /** Embedding 模型供应商 */
  embedding_provider_name?: string;
  /** 检索模式配置 */
  retrieval_model?: {
    search_method: 'hybrid_search' | 'semantic_search' | 'full_text_search';
    reranking_enable?: boolean;
    reranking_model?: {
      reranking_provider_name: string;
      reranking_model_name: string;
    };
    top_k?: number;
    score_threshold_enabled?: boolean;
    score_threshold?: number;
  };
}

export interface DatasetInfo {
  id: string;
  name: string;
  description: string | null;
  provider: string;
  permission: string;
  data_source_type: string | null;
  indexing_technique: string | null;
  app_count: number;
  document_count: number;
  word_count: number;
  created_by: string;
  created_at: number;
  updated_by: string;
  updated_at: number;
  embedding_model: string | null;
  embedding_model_provider: string | null;
  embedding_available: boolean | null;
}

export interface ListDatasetsParams {
  /** 搜索关键词 */
  keyword?: string;
  /** 标签 ID 列表 */
  tag_ids?: string[];
  /** 页码 */
  page?: number;
  /** 每页返回条数 */
  limit?: number;
  /** 是否包含所有数据集（仅对所有者生效） */
  include_all?: boolean;
}

export interface DatasetListItem {
  id: string;
  name: string;
  description: string;
  permission: string;
  data_source_type: string;
  indexing_technique: string;
  app_count: number;
  document_count: number;
  word_count: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

export interface ListDatasetsResponse {
  data: DatasetListItem[];
  has_more: boolean;
  limit: number;
  total: number;
  page: number;
}

export interface DatasetDetail {
  id: string;
  name: string;
  description: string;
  provider: string;
  permission: string;
  data_source_type: string | null;
  indexing_technique: string | null;
  app_count: number;
  document_count: number;
  word_count: number;
  created_by: string;
  created_at: number;
  updated_by: string;
  updated_at: number;
  embedding_model: string | null;
  embedding_model_provider: string | null;
  embedding_available: boolean;
  retrieval_model_dict: {
    search_method: string;
    reranking_enable: boolean;
    reranking_mode: string | null;
    reranking_model: {
      reranking_provider_name: string;
      reranking_model_name: string;
    };
    weights: any | null;
    top_k: number;
    score_threshold_enabled: boolean;
    score_threshold: number | null;
  };
  tags: string[];
  doc_form: string | null;
  external_knowledge_info: {
    external_knowledge_id: string | null;
    external_knowledge_api_id: string | null;
    external_knowledge_api_name: string | null;
    external_knowledge_api_endpoint: string | null;
  };
  external_retrieval_model: {
    top_k: number;
    score_threshold: number;
    score_threshold_enabled: boolean | null;
  };
}

export class DifyDataset {
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

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 通过文本创建文档
   * @param params 创建文档参数
   * @returns 创建结果
   */
  async createDocumentByText(params: CreateDocumentByTextParams): Promise<CreateDocumentByTextResponse> {
    const { dataset_id, ...bodyParams } = params;
    const url = `${this.config.baseUrl}/datasets/${dataset_id}/document/create-by-text`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...this.config.defaultHeaders,
      },
      body: JSON.stringify(bodyParams),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 通过文件创建文档
   * @param params 创建文档参数
   * @returns 创建结果
   */
  async createDocumentByFile(params: CreateDocumentByFileParams): Promise<CreateDocumentByFileResponse> {
    const { dataset_id, file, original_document_id, ...restParams } = params;
    const url = `${this.config.baseUrl}/datasets/${dataset_id}/document/create-by-file`;

    // 准备 form-data
    const formData = new FormData();
    formData.append('file', file);

    // 准备 data 部分
    const data = {
      ...restParams,
      ...(original_document_id ? { original_document_id } : {}),
    };
    formData.append('data', JSON.stringify(data));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        ...this.config.defaultHeaders,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 创建空知识库
   * @param params 创建知识库参数
   * @returns 创建的知识库信息
   */
  async createDataset(params: CreateDatasetParams): Promise<DatasetInfo> {
    const url = `${this.config.baseUrl}/datasets`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...this.config.defaultHeaders,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 获取知识库列表
   * @param params 查询参数
   * @returns 知识库列表响应
   */
  async listDatasets(params?: ListDatasetsParams): Promise<ListDatasetsResponse> {
    const queryParams = new URLSearchParams();

    // 添加可选查询参数
    if (params?.keyword) queryParams.append('keyword', params.keyword);
    if (params?.tag_ids?.length) queryParams.append('tag_ids', params.tag_ids.join(','));
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.include_all) queryParams.append('include_all', params.include_all.toString());

    const url = `${this.config.baseUrl}/datasets?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        ...this.config.defaultHeaders,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 获取知识库详情
   * @param dataset_id 知识库ID
   * @returns 知识库详细信息
   */
  async getDataset(dataset_id: string): Promise<DatasetDetail> {
    const url = `${this.config.baseUrl}/datasets/${dataset_id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        ...this.config.defaultHeaders,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
