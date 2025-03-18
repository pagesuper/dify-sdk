/** 获取会话列表请求参数接口 */
export interface GetConversationsParams {
  /** 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 */
  user: string;
  /** （选填）当前页最后面一条记录的 ID，默认 null */
  last_id?: string | null;
  /** （选填）一次请求返回记录数，默认 20，最大 100，最小 1 */
  limit?: number;
  /** （选填）排序字段，默认 -updated_at（更新时间倒序） */
  sort_by?: 'created_at' | '-created_at' | 'updated_at' | '-updated_at';
}

/** 会话对象接口 */
export interface Conversation {
  /** 会话 ID */
  id: string;
  /** 会话名称，默认为会话中用户最开始问题的截取 */
  name: string;
  /** 用户输入参数 */
  inputs: Record<string, unknown>;
  /** 会话状态 */
  status: string;
  /** 开场白（可选） */
  introduction?: string;
  /** 创建时间（时间戳格式） */
  created_at: number;
  /** 更新时间（时间戳格式） */
  updated_at: number;
}

/** 会话列表响应体接口 */
export interface GetConversationsResponse {
  /** 实际返回条数 */
  limit: number;
  /** 是否还有更多数据 */
  has_more: boolean;
  /** 会话数据列表 */
  data: Conversation[];
}

/** HTTP 客户端配置 */
interface HttpClientConfig {
  baseUrl: string;
  apiKey: string;
}

/** 支持浏览器/Node 的 HTTP 客户端 */
export class DifyClient {
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
  }

  /** 获取会话列表 */
  async getConversations(params: GetConversationsParams): Promise<GetConversationsResponse> {
    const query = new URLSearchParams({ user: params.user });

    if (params.last_id) {
      query.set('last_id', params.last_id);
    }

    if (params.limit) {
      query.set('limit', String(params.limit));
    }

    if (params.sort_by) {
      query.set('sort_by', params.sort_by);
    }

    const url = `${this.config.baseUrl}/conversations?${query}`;

    const response = await this._fetch(url, {
      headers: { Authorization: `Bearer ${this.config.apiKey}`, Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** 跨环境 fetch 实现 */
  private async _fetch(input: string, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
  }
}

// // 使用示例
// const difyClient = new DifyClient({ baseUrl: 'http://10.32.120.77/v1', apiKey: 'your_api_key_here' });

// async function fetchConversations() {
//   try {
//     const response = await difyClient.getConversations({ user: 'abc-123', limit: 20, sort_by: '-updated_at' });
//     console.log('最新会话:', response.data);
//     return response;
//   } catch (error) {
//     console.error('获取会话列表失败:', error);
//   }
// }
