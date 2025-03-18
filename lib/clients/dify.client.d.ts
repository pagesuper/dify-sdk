/** 发送消息请求参数接口 */
export interface SendMessageParams {
    /** 用户输入/提问内容 */
    query: string;
    /** 允许传入 App 定义的各变量值，默认 {} */
    inputs?: Record<string, unknown>;
    /** 响应模式，streaming 流式模式（推荐），blocking 阻塞模式 */
    response_mode: 'streaming' | 'blocking';
    /** 用户标识，用于定义终端用户的身份，方便检索、统计 */
    user: string;
    /** （选填）会话 ID，需要基于之前的聊天记录继续对话，必须传之前消息的 conversation_id */
    conversation_id?: string;
    /** （选填）上传的文件 */
    files?: Array<{
        /** 支持类型：图片 image（目前仅支持图片格式） */
        type: string;
        /** 传递方式：remote_url（图片地址）或 local_file（上传文件） */
        transfer_method: string;
        /** 图片地址（仅当传递方式为 remote_url 时） */
        url?: string;
        /** 上传文件 ID（仅当传递方式为 local_file 时） */
        upload_file_id?: string;
    }>;
    /** （选填）自动生成标题，默认 true */
    auto_generate_name?: boolean;
}
/** 模型用量信息接口 */
export interface Usage {
    /** 输入 token 数 */
    prompt_tokens: number;
    /** 输入 token 单价 */
    prompt_unit_price: string;
    /** 输入价格单位 */
    prompt_price_unit: string;
    /** 输入总价 */
    prompt_price: string;
    /** 输出 token 数 */
    completion_tokens: number;
    /** 输出 token 单价 */
    completion_unit_price: string;
    /** 输出价格单位 */
    completion_price_unit: string;
    /** 输出总价 */
    completion_price: string;
    /** 总 token 数 */
    total_tokens: number;
    /** 总价 */
    total_price: string;
    /** 货币单位 */
    currency: string;
    /** 延迟时间 */
    latency: number;
}
/** 消息文件对象接口 */
export interface MessageFile {
    /** 文件 ID */
    id: string;
    /** 文件类型，image 图片 */
    type: string;
    /** 预览图片地址 */
    url: string;
    /** 文件归属方，user 或 assistant */
    belongs_to: string;
}
/** Agent 思考内容接口 */
export interface AgentThought {
    /** agent_thought ID，每一轮Agent迭代都会有一个唯一的id */
    id: string;
    /** 消息唯一ID */
    message_id: string;
    /** agent_thought在消息中的位置，如第一轮迭代position为1 */
    position: number;
    /** agent的思考内容 */
    thought: string;
    /** 工具调用的返回结果 */
    observation: string;
    /** 使用的工具列表，以 ; 分割多个工具 */
    tool: string;
    /** 工具的输入，JSON格式的字符串(object) */
    tool_input: string;
    /** 创建时间戳 */
    created_at: number;
    /** 当前agent_thought 关联的文件ID */
    message_files: string[];
}
/** 引用和归属分段列表接口 */
export interface RetrieverResource {
    /** 引用位置 */
    position: number;
    /** 数据集 ID */
    dataset_id: string;
    /** 数据集名称 */
    dataset_name: string;
    /** 文档 ID */
    document_id: string;
    /** 文档名称 */
    document_name: string;
    /** 分段 ID */
    segment_id: string;
    /** 引用分数 */
    score: number;
    /** 引用内容 */
    content: string;
}
/** 消息对象接口 */
export interface Message {
    /** 消息 ID */
    id: string;
    /** 会话 ID */
    conversation_id: string;
    /** 用户输入参数 */
    inputs: Record<string, unknown>;
    /** 用户输入 / 提问内容 */
    query: string;
    /** 消息文件列表 */
    message_files: MessageFile[];
    /** Agent思考内容（仅Agent模式下不为空） */
    agent_thoughts: AgentThought[];
    /** 回答消息内容 */
    answer: string;
    /** 创建时间 */
    created_at: number;
    /** 反馈信息 */
    feedback: {
        rating: 'like' | 'dislike';
    } | null;
    /** 引用和归属分段列表 */
    retriever_resources: RetrieverResource[];
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
/** 会话列表响应体接口 */
export interface GetConversationsResponse {
    /** 实际返回条数 */
    limit: number;
    /** 是否还有更多数据 */
    has_more: boolean;
    /** 会话数据列表 */
    data: Conversation[];
}
/** 获取消息列表请求参数接口 */
export interface GetMessagesParams {
    /** 会话 ID */
    conversation_id: string;
    /** 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 */
    user: string;
    /** 当前页第一条聊天记录的 ID，默认 null */
    first_id?: string | null;
    /** 一次请求返回多少条聊天记录，默认 20 条 */
    limit?: number;
}
/** 消息列表响应体接口 */
export interface GetMessagesResponse {
    /** 实际返回条数 */
    limit: number;
    /** 是否还有更多数据 */
    has_more: boolean;
    /** 消息数据列表 */
    data: Message[];
}
/** 阻塞模式响应体接口 */
export interface ChatCompletionResponse {
    /** 消息唯一 ID */
    message_id: string;
    /** 会话 ID */
    conversation_id: string;
    /** App 模式，固定为 chat */
    mode: string;
    /** 完整回复内容 */
    answer: string;
    /** 元数据 */
    metadata: {
        /** 模型用量信息 */
        usage: Usage;
        /** 引用和归属分段列表 */
        retriever_resources: RetrieverResource[];
    };
    /** 消息创建时间戳 */
    created_at: number;
}
/** 流式模式响应体接口 */
export interface ChunkChatCompletionResponse {
    /** 事件类型 */
    event: string;
    /** 任务 ID，用于请求跟踪和下方的停止响应接口 */
    task_id: string;
    /** 消息唯一 ID */
    message_id: string;
    /** 会话 ID */
    conversation_id: string;
    /** LLM 返回文本块内容 */
    answer?: string;
    /** 创建时间戳 */
    created_at?: number;
    /** 文件唯一 ID */
    id?: string;
    /** 文件类型，目前仅为 image */
    type?: string;
    /** 文件归属，user 或 assistant */
    belongs_to?: string;
    /** 文件访问地址 */
    url?: string;
    /** 语音合成之后的音频块使用 Base64 编码之后的文本内容 */
    audio?: string;
    /** 元数据 */
    metadata?: {
        /** 模型用量信息 */
        usage: Usage;
        /** 引用和归属分段列表 */
        retriever_resources: RetrieverResource[];
    };
}
/** HTTP 客户端配置 */
export interface HttpClientConfig {
    baseUrl: string;
    apiKey: string;
}
/** 支持浏览器/Node 的 HTTP 客户端 */
export declare class DifyClient {
    private config;
    constructor(config: HttpClientConfig);
    getConfig(): HttpClientConfig;
    /** 获取会话列表 */
    getConversations(params: GetConversationsParams): Promise<GetConversationsResponse>;
    /** 获取消息列表 */
    getMessages(params: GetMessagesParams): Promise<GetMessagesResponse>;
    /** 发送消息 */
    sendMessage(params: SendMessageParams): Promise<ChatCompletionResponse | ChunkChatCompletionResponse[]>;
}
