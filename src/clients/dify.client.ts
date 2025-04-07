/// 以下是models

/** 运行 Workflow 请求参数接口 */
export interface WorkflowRunParams {
  /** 允许传入 App 定义的各变量值 */
  inputs: Record<string, unknown>;
  /** 响应模式：streaming（流式）或 blocking（阻塞） */
  response_mode: 'streaming' | 'blocking';
  /** 用户唯一标识 */
  user: string;
}

/** Workflow 基础响应结构 */
interface WorkflowBaseResponse {
  /** workflow 执行 ID */
  workflow_run_id: string;
  /** 任务跟踪 ID */
  task_id: string;
}

/** 阻塞模式响应体接口 */
export interface WorkflowCompletionResponse extends WorkflowBaseResponse {
  data: {
    id: string;
    workflow_id: string;
    status: 'running' | 'succeeded' | 'failed' | 'stopped';
    outputs?: any;
    error?: string;
    elapsed_time?: number;
    total_tokens?: number;
    total_steps?: number;
    created_at: number;
    finished_at?: number;
  };
}

/** 流式事件类型 */
export type WorkflowChunkEvent =
  | 'workflow_started'
  | 'node_started'
  | 'node_finished'
  | 'workflow_finished'
  | 'tts_message'
  | 'tts_message_end'
  | 'ping';

/** 流式响应块结构 */
export interface WorkflowChunkResponse extends WorkflowBaseResponse {
  event: WorkflowChunkEvent;
  data: any; // 根据事件类型细化结构
  created_at?: number;
  audio?: string;
  message_id?: string;
}

/** 文件输入结构 */
export interface WorkflowFileInput {
  type: 'document' | 'image' | 'audio' | 'video' | 'custom';
  transfer_method: 'remote_url' | 'local_file';
  url?: string;
  upload_file_id?: string;
}

/** 文件 */
export interface SendMessageFile {
  /** 支持类型：图片 image（目前仅支持图片格式） */
  type: string;
  /** 传递方式：remote_url（图片地址）或 local_file（上传文件） */
  transfer_method: string;
  /** 图片地址（仅当传递方式为 remote_url 时） */
  url?: string;
  /** 上传文件 ID（仅当传递方式为 local_file 时） */
  upload_file_id?: string;
}

/** 发送文本生成消息请求参数 */
export interface SendCompletionMessageParams {
  /** 应用变量键值对 */
  inputs?: Record<string, unknown>;
  /** 响应模式：streaming（流式）或 blocking（阻塞） */
  response_mode: 'streaming' | 'blocking';
  /** 用户唯一标识 */
  user: string;
  /** 上传的文件列表 */
  files?: Array<SendMessageFile>;
  /** 流式响应回调函数 */
  chunkCompletionCallback?: (chunk: CompletionMessageChunkResponse) => void;
}

/** 阻塞模式响应体 */
export interface CompletionMessageResponse {
  id: string;
  answer: string;
  created_at: number;
}

/** 流式响应块结构 */
export interface CompletionMessageChunkResponse {
  event: string;
  task_id?: string;
  message_id?: string;
  answer?: string;
  audio?: string;
  created_at?: number;
  metadata?: {
    usage: ModelUsage;
    retriever_resources: SendMessageRetrieverResource[];
  };
  code?: string;
  message?: string;
}

/** 停止响应请求参数 */
export interface StopCompletionMessageParams {
  task_id: string;
  user: string;
}

/** 停止响应结果 */
export interface StopCompletionMessageResult {
  result: string;
}

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
  files?: Array<SendMessageFile>;
  /** （选填）自动生成标题，默认 true */
  auto_generate_name?: boolean;
  /** （选填）流式响应回调函数，用于处理流式返回的数据块 */
  chunkCompletionCallback?: (chunk: ChatChunkCompletionResponse) => void;
}

/** 模型用量信息接口 */
export interface ModelUsage {
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
  filename: string;
  size: number;
  /** 传递方式：remote_url（图片地址）或 local_file（上传文件） */
  transfer_method: string;
  /** 文件 mime-type */
  mime_type: string;
}

/** Agent 思考内容接口 */
export interface MessageAgentThought {
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
export interface SendMessageRetrieverResource {
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
  agent_thoughts: MessageAgentThought[];
  /** 回答消息内容 */
  answer: string;
  /** 创建时间 */
  created_at: number;
  /** 反馈信息 */
  feedback: { rating: 'like' | 'dislike' } | null;
  /** 引用和归属分段列表 */
  retriever_resources: SendMessageRetrieverResource[];
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

/// 以下是interface

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
    usage: ModelUsage;
    /** 引用和归属分段列表 */
    retriever_resources: SendMessageRetrieverResource[];
  };
  /** 消息创建时间戳 */
  created_at: number;
}

/** 流式模式响应体接口 */
export interface ChatChunkCompletionResponse {
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
    usage: ModelUsage;
    /** 引用和归属分段列表 */
    retriever_resources: SendMessageRetrieverResource[];
  };
}

/** 停止响应请求参数接口 */
export interface StopMessageResponseParams {
  /** 任务 ID，可在流式返回 Chunk 中获取 */
  task_id: string;
  /** 用户标识，必须和发送消息接口传入 user 保持一致 */
  user: string;
}

/** 停止响应响应体接口 */
export interface StopMessageResponseResult {
  /** 固定返回 success */
  result: string;
}

/** 创建反馈请求参数接口 */
export interface CreateMessageFeedbackParams {
  /** 消息 ID */
  message_id: string;
  /** 点赞 like, 点踩 dislike, 撤销点赞 null */
  rating: 'like' | 'dislike' | null;
  /** 用户标识，需保证用户标识在应用内唯一 */
  user: string;
  /** 消息反馈的具体信息 */
  content?: string;
}

/** 创建反馈响应体接口 */
export interface CreateMessageFeedbackResult {
  /** 固定返回 success */
  result: string;
}

/** 获取建议问题请求参数接口 */
export interface GetMessageSuggestsParams {
  /** 消息 ID */
  message_id: string;
  /** 用户标识，需保证用户标识在应用内唯一 */
  user: string;
}

/** 获取建议问题响应体接口 */
export interface GetMessageSuggestsResult {
  /** 固定返回 success */
  result: string;
  /** 建议问题列表 */
  data: string[];
}

/** 删除会话请求参数接口 */
export interface DeleteConversationParams {
  /** 会话 ID */
  conversation_id: string;
  /** 用户标识，需保证用户标识在应用内唯一 */
  user: string;
}

/** 删除会话响应体接口 */
export interface DeleteConversationResult {
  /** 固定返回 success */
  result: string;
}

/** 重命名会话请求参数接口 */
export interface RenameConversationParams {
  /** 会话 ID */
  conversation_id: string;
  /** （选填）名称，若 auto_generate 为 true 时，该参数可不传 */
  name?: string;
  /** （选填）自动生成标题，默认 false */
  auto_generate?: boolean;
  /** 用户标识，需保证用户标识在应用内唯一 */
  user: string;
}

/** 重命名会话响应体接口 */
export interface RenameConversationResult {
  /** 会话 ID */
  id: string;
  /** 会话名称 */
  name: string;
  /** 用户输入参数 */
  inputs: Record<string, unknown>;
  /** 会话状态 */
  status: string;
  /** 开场白 */
  introduction: string;
  /** 创建时间 */
  created_at: number;
  /** 更新时间 */
  updated_at: number;
}

/** 语音转文字请求参数接口 */
export interface AudioToTextParams {
  /** 语音文件 */
  file: File | Blob;
  /** 用户标识，需保证用户标识在应用内唯一 */
  user: string;
}

/** 语音转文字响应体接口 */
export interface AudioToTextResult {
  /** 输出文字 */
  text: string;
}

/** 文字转语音请求参数接口 */
export interface TextToAudioParams {
  /** Dify 生成的文本消息 ID */
  message_id?: string;
  /** 语音生成内容 */
  text?: string;
  /** 用户标识，需保证用户标识在应用内唯一 */
  user: string;
}

/** 获取应用参数响应体接口 */
export interface AppParameters {
  /** 开场白 */
  introduction: string;
  /** 开场白 */
  opening_statement: string;
  /** 用户输入表单配置 */
  user_input_form: Array<{
    text_input?: {
      label: string;
      variable: string;
      required: boolean;
      max_length: number;
      default: string;
    };
    paragraph?: {
      label: string;
      variable: string;
      required: boolean;
      default: string;
    };
    select?: {
      label: string;
      variable: string;
      required: boolean;
      default: string;
      options: string[];
    };
  }>;
  /** 文件上传配置 */
  file_upload: {
    /** 图片设置，当前仅支持图片类型：png, jpg, jpeg, gif, webp */
    image: {
      /** 是否开启 */
      enabled: boolean;
      /** 图片数量限制，默认 3 */
      number_limits: number;
      /** 传递方式列表，remote_url , local_file，必选一个 */
      transfer_methods: string[];
    };
    /** 是否开启 */
    enabled: boolean;
    /** 允许的文件类型，比如：'document', 'image', 'audio', 'video' */
    allowed_file_types: string[];
    allowed_file_extensions: [];
    /** 允许文件的上传方式： 'remote_url', 'local_file' */
    allowed_file_upload_methods: [];
    /** 文件数量限制 */
    number_limits: number;
    /** 文件上传配置 */
    fileUploadConfig: {
      /** 文件大小限制 */
      file_size_limit: number;
      /** 批量上传数量限制 */
      batch_count_limit: number;
      /** 图片文件限制大小 */
      image_file_size_limit: number;
      /** video 限制大小 */
      video_file_size_limit: number;
      audio_file_size_limit: number;
      workflow_file_upload_limit: number;
    };
  };
  /** 系统参数 */
  system_parameters: {
    file_size_limit: number;
    image_file_size_limit: number;
    audio_file_size_limit: number;
    video_file_size_limit: number;
  };
  /** 开场推荐问题列表 */
  suggested_questions: string[];
  /** 启用回答后给出推荐问题 */
  suggested_questions_after_answer: {
    /** 是否开启 */
    enabled: boolean;
  };
  /** 语音转文本 */
  speech_to_text: {
    /** 是否开启 */
    enabled: boolean;
  };
  /**
   * 文本转语音
   */
  text_to_speech: {
    /** 是否开启 */
    enabled: boolean;
  };
  /** 引用和归属 */
  retriever_resource: {
    /** 是否开启 */
    enabled: boolean;
  };
  /** 标记回复 */
  annotation_reply: {
    /** 是否开启 */
    enabled: boolean;
  };
}

/** 获取 Workflow 请求参数接口 */
export interface GetWorkflowParams {
  /** Workflow 执行 ID */
  workflow_id: string;
}

/** 获取 Workflow 响应体接口 */
export interface GetWorkflowResult {
  /** Workflow 执行 ID */
  id: string;
  /** 关联的 Workflow ID */
  workflow_id: string;
  /** 执行状态 */
  status: 'running' | 'succeeded' | 'failed' | 'stopped';
  /** 任务输入内容 */
  inputs: any;
  /** 任务输出内容 */
  outputs: any;
  /** 错误原因 */
  error: string | null;
  /** 任务执行总步数 */
  total_steps: number;
  /** 任务执行总 tokens */
  total_tokens: number;
  /** 任务开始时间 */
  created_at: string;
  /** 任务结束时间 */
  finished_at: string;
  /** 耗时（秒） */
  elapsed_time: number;
}

/** 停止 Workflow 任务请求参数接口 */
export interface StopWorkflowTaskParams {
  /** 任务 ID */
  task_id: string;
  /** 用户标识 */
  user: string;
}

/** 停止 Workflow 任务响应体接口 */
export interface StopWorkflowTaskResult {
  /** 固定返回 "success" */
  result: string;
}

/** 获取 Workflow 日志请求参数接口 */
export interface GetWorkflowLogsParams {
  /** 关键字 */
  keyword?: string;
  /** 执行状态 */
  status?: 'succeeded' | 'failed' | 'stopped';
  /** 当前页码 */
  page?: number;
  /** 每页条数 */
  limit?: number;
}

/** 获取 Workflow 日志响应体接口 */
export interface GetWorkflowLogsResult {
  /** 当前页码 */
  page: number;
  /** 每页条数 */
  limit: number;
  /** 总条数 */
  total: number;
  /** 是否还有更多数据 */
  has_more: boolean;
  /** 当前页码的数据 */
  data: Array<{
    /** 标识 */
    id: string;
    /** Workflow 执行日志 */
    workflow_run: {
      /** 标识 */
      id: string;
      /** 版本 */
      version: string;
      /** 执行状态 */
      status: 'running' | 'succeeded' | 'failed' | 'stopped';
      /** 错误信息 */
      error: string | null;
      /** 耗时（秒） */
      elapsed_time: number;
      /** 消耗的 token 数量 */
      total_tokens: number;
      /** 执行步骤长度 */
      total_steps: number;
      /** 开始时间 */
      created_at: number;
      /** 结束时间 */
      finished_at: number;
    };
    /** 来源 */
    created_from: string;
    /** 角色 */
    created_by_role: string;
    /** 账号 */
    created_by_account: string | null;
    /** 用户 */
    created_by_end_user: {
      /** 标识 */
      id: string;
      /** 类型 */
      type: string;
      /** 是否匿名 */
      is_anonymous: boolean;
      /** 会话标识 */
      session_id: string;
    };
    /** 创建时间 */
    created_at: number;
  }>;
}

/** 获取应用 Meta 信息响应体接口 */
export interface AppMeta {
  /** 工具图标 */
  tool_icons: Record<string, string | { background: string; content: string }>;
}

/** 获取应用基本信息响应体接口 */
export interface AppInfo {
  /** 应用名称 */
  name: string;
  /** 应用描述 */
  description: string;
  /** 应用标签 */
  tags: string[];
}

/** 上传文件请求参数接口 */
export interface UploadFileParams {
  /** 要上传的文件 */
  file: File | Blob;
  /** 用户标识，用于定义终端用户的身份，必须和发送消息接口传入 user 保持一致 */
  user: string;
}

/** 上传文件响应体接口 */
export interface UploadFileResponse {
  /** 文件 ID */
  id: string;
  /** 文件名 */
  name: string;
  /** 文件大小（byte） */
  size: number;
  /** 文件后缀 */
  extension: string;
  /** 文件 mime-type */
  mime_type: string;
  /** 上传人 ID */
  created_by: string;
  /** 上传时间 */
  created_at: number;
}

/** HTTP 客户端配置 */
export interface HttpClientConfig {
  baseUrl: string;
  apiKey: string;
}

/** 上传文件后，组装前端需要的文件对象 */
export interface UploadFileResult extends UploadFileResponse {
  /** 文件类型：document， image， audio， video， custom */
  type?: string;
  /** 本地上传临时预览的图片链接 */
  url?: string;
}

export const MIME_MAP = {
  // 文档类型
  document: {
    mimeTypes: [
      'text/plain', // TXT
      'text/markdown', // MD, MDX
      'text/html', // HTML
      'application/pdf', // PDF
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
      'application/vnd.ms-excel', // XLS
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'application/msword', // DOC
      'text/csv', // CSV
      'message/rfc822', // EML
      'application/vnd.ms-outlook', // MSG
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
      'application/vnd.ms-powerpoint', // PPT
      'application/xml', // XML (通用)
      'text/xml', // XML (特定)
      'application/epub+zip', // EPUB
    ],
    extensions: [
      '.txt',
      '.md',
      '.mdx',
      '.html',
      '.htm',
      '.pdf',
      '.xlsx',
      '.xls',
      '.docx',
      '.doc',
      '.csv',
      '.eml',
      '.msg',
      '.pptx',
      '.ppt',
      '.xml',
      '.epub',
    ],
  },

  // 图片类型
  image: {
    mimeTypes: [
      'image/jpeg', // JPG, JPEG
      'image/png', // PNG
      'image/gif', // GIF
      'image/webp', // WEBP
      'image/svg+xml', // SVG
    ],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  },

  // 音频类型
  audio: {
    mimeTypes: [
      'audio/mpeg', // MP3, MPGA (MPEG Audio Layer III)
      'audio/mp4', // M4A
      'audio/wav', // WAV
      'audio/webm', // WEBM
      'audio/amr', // AMR
    ],
    extensions: ['.mp3', '.mpga', '.m4a', '.wav', '.webm', '.amr'],
  },

  // 视频类型
  video: {
    mimeTypes: [
      'video/mp4', // MP4
      'video/quicktime', // MOV
      'video/mpeg', // MPEG
      'audio/mpeg', // MPGA (复用音频类型，需注意)
    ],
    extensions: ['.mp4', '.mov', '.mpeg', '.mpg', '.mpe'],
  },
};

/** 支持浏览器/Node 的 HTTP 客户端 */
export class DifyClient {
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
  }

  getConfig() {
    return this.config;
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

    const url = `${this.config.baseUrl}/v1/conversations?${query}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.config.apiKey}`, Accept: 'application/json' },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** 获取消息列表 */
  async getMessages(params: GetMessagesParams): Promise<GetMessagesResponse> {
    const query = new URLSearchParams({ conversation_id: params.conversation_id, user: params.user });

    if (params.first_id) {
      query.set('first_id', params.first_id);
    }

    if (params.limit) {
      query.set('limit', String(params.limit));
    }

    const url = `${this.config.baseUrl}/v1/messages?${query}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.config.apiKey}`, Accept: 'application/json' },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** 发送消息 */
  async sendMessage(params: SendMessageParams): Promise<ChatCompletionResponse | ChatChunkCompletionResponse[]> {
    const useReader = (() => {
      try {
        return new Response(new ReadableStream()).body?.getReader() !== undefined;
      } catch {
        return false;
      }
    })();

    if (!useReader && params.response_mode === 'streaming') {
      return await this.handleStreamWithXHR(params);
    } else {
      const url = `${this.config.baseUrl}/v1/chat-messages`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: {}, ...params }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }

      if (params.response_mode === 'blocking') {
        return response.json() as Promise<ChatCompletionResponse>;
      } else {
        const reader = response.body?.getReader();
        const chunks: ChatChunkCompletionResponse[] = [];
        let buffer = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();

            // 将Buffer转换为字符串
            buffer += new TextDecoder().decode(value, { stream: true });
            buffer = this.parseAndFlushBuffer({ buffer, chunks, params });

            if (done) {
              // 最后一次解析（处理可能的残留数据）
              this.parseAndFlushBuffer({ buffer, chunks, params });
              break;
            }
          }
        }

        return chunks;
      }
    }
  }

  parseAndFlushBuffer(options: { buffer: string; chunks: ChatChunkCompletionResponse[]; params: SendMessageParams }): string {
    let buffer = options.buffer;
    const chunks = options.chunks;

    while (true) {
      const splitMark = '\n\n';

      // 分割数据块（根据服务端规范调整分隔符）
      const chunkEnd = buffer.indexOf(splitMark);
      // 数据不完整，继续等待
      if (chunkEnd === -1) break;

      const chunkData = buffer.slice(0, chunkEnd + splitMark.length);
      buffer = buffer.slice(chunkEnd + splitMark.length);

      // 解析JSON
      if (chunkData.trim().startsWith('data:')) {
        try {
          const chunk: ChatChunkCompletionResponse = JSON.parse(chunkData.replace(/^data: /, ''));

          if (typeof options.params.chunkCompletionCallback === 'function') {
            options.params.chunkCompletionCallback(chunk);
          }

          chunks.push(chunk);
        } catch (parseError) {
          console.error('Failed to parse chunk:', chunkData);
          throw new Error(`Invalid chunk format: ${chunkData}`);
        }
      }
    }
    return buffer;
  }

  handleStreamWithXHR(params: SendMessageParams): Promise<ChatChunkCompletionResponse[]> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${this.config.baseUrl}/v1/chat-messages`;

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', `Bearer ${this.config.apiKey}`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      let buffer = '';
      const chunks: ChatChunkCompletionResponse[] = [];
      let lastProcessedLength = 0;

      xhr.onprogress = function () {
        const newData = xhr.responseText.slice(lastProcessedLength);
        lastProcessedLength = xhr.responseText.length;
        buffer += newData;

        // 分割数据块（根据服务端规范调整分隔符）
        const splitMark = '\n\n';

        while (true) {
          const chunkEnd = buffer.indexOf(splitMark);
          if (chunkEnd === -1) break;

          const chunkData = buffer.slice(0, chunkEnd + splitMark.length);
          buffer = buffer.slice(chunkEnd + splitMark.length);

          if (chunkData.trim().startsWith('data:')) {
            try {
              const chunk: ChatChunkCompletionResponse = JSON.parse(chunkData.replace(/^data: /, ''));

              if (typeof params.chunkCompletionCallback === 'function') {
                params.chunkCompletionCallback(chunk);
              }

              chunks.push(chunk);
            } catch (e) {
              console.error('Chunk parse error:', chunkData);
            }
          }
        }
      };

      xhr.onloadend = function () {
        // 请求完成
        if (xhr.status >= 400) {
          reject(new Error(`Request failed: ${xhr.statusText}`));
        } else {
          resolve(chunks);
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error'));
      };

      // 发送请求
      xhr.send(JSON.stringify({ inputs: {}, ...params }));
    });
  }

  /**
   * 停止响应
   */
  async stopMessageResponse(params: StopMessageResponseParams): Promise<StopMessageResponseResult> {
    const url = `${this.config.baseUrl}/v1/chat-messages/${params.task_id}/stop`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: params.user }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 创建反馈
   */
  async createMessageFeedback(params: CreateMessageFeedbackParams): Promise<CreateMessageFeedbackResult> {
    const url = `${this.config.baseUrl}/v1/messages/${params.message_id}/feedbacks`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: params.rating, user: params.user, content: params.content }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 获取建议问题列表
   */
  async getMessageSuggests(params: GetMessageSuggestsParams): Promise<GetMessageSuggestsResult> {
    const url = `${this.config.baseUrl}/v1/messages/${params.message_id}/suggested?user=${encodeURIComponent(params.user)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 删除会话
   */
  async deleteConversation(params: DeleteConversationParams): Promise<DeleteConversationResult> {
    const url = `${this.config.baseUrl}/v1/conversations/${params.conversation_id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: params.user }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 重命名会话
   */
  async renameConversation(params: RenameConversationParams): Promise<RenameConversationResult> {
    const url = `${this.config.baseUrl}/v1/conversations/${params.conversation_id}/name`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: params.name, auto_generate: params.auto_generate, user: params.user }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 语音转文字
   */
  async audioToText(params: AudioToTextParams): Promise<AudioToTextResult> {
    const url = `${this.config.baseUrl}/v1/audio-to-text`;
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('user', params.user);

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.config.apiKey}` },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 文字转语音
   */
  async textToAudio(params: TextToAudioParams): Promise<Blob> {
    const url = `${this.config.baseUrl}/v1/text-to-audio`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.blob();
  }

  /**
   * 获取应用参数
   */
  async getParameters(): Promise<AppParameters> {
    const url = `${this.config.baseUrl}/v1/parameters`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.config.apiKey}` },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** 获取应用基本信息 */
  async getInfo(): Promise<AppInfo> {
    const url = `${this.config.baseUrl}/v1/info`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.config.apiKey}` },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 获取应用 Meta 信息
   * - 用于获取工具icon
   */
  async getMeta(): Promise<AppMeta> {
    const url = `${this.config.baseUrl}/v1/meta`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.config.apiKey}` },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 运行 Workflow
   */
  async runWorkflow(params: WorkflowRunParams): Promise<WorkflowCompletionResponse | WorkflowChunkResponse[]> {
    const url = `${this.config.baseUrl}/v1/workflows/run`;
    const isStreaming = params.response_mode === 'streaming';

    // 处理流式响应
    if (isStreaming) {
      return this.handleWorkflowStream(params, url);
    }

    // 阻塞模式处理
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Workflow failed: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<WorkflowCompletionResponse>;
  }

  /**
   * 处理流式响应
   */
  private async handleWorkflowStream(params: WorkflowRunParams, url: string): Promise<WorkflowChunkResponse[]> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok || !response.body) {
      throw new Error(`Workflow failed: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const chunks: WorkflowChunkResponse[] = [];
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += new TextDecoder().decode(value);

      // 按事件分割处理
      while (buffer.includes('\n\n')) {
        const chunkEnd = buffer.indexOf('\n\n');
        const chunkStr = buffer.slice(0, chunkEnd);
        buffer = buffer.slice(chunkEnd + 2);

        if (chunkStr.startsWith('data:')) {
          try {
            const chunkData: WorkflowChunkResponse = JSON.parse(chunkStr.slice(5).trim());
            chunks.push(chunkData);
          } catch (e) {
            console.error('Failed to parse workflow chunk:', chunkStr);
          }
        }
      }
    }

    return chunks;
  }

  /**
   * 获取 Workflow 执行结果
   */
  async getWorkflow(params: GetWorkflowParams): Promise<GetWorkflowResult> {
    const url = `${this.config.baseUrl}/v1/workflows/run/${params.workflow_id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 停止 Workflow 任务
   */
  async stopWorkflowTask(params: StopWorkflowTaskParams): Promise<StopWorkflowTaskResult> {
    const url = `${this.config.baseUrl}/v1/workflows/tasks/${params.task_id}/stop`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: params.user }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 获取 Workflow 日志
   */
  async getWorkflowLogs(params: GetWorkflowLogsParams): Promise<GetWorkflowLogsResult> {
    const url = `${this.config.baseUrl}/v1/workflows/logs?keyword=${params.keyword || ''}&status=${params.status || ''}&page=${
      params.page || 1
    }&limit=${params.limit || 20}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** 上传文件 */
  async uploadFile(params: UploadFileParams): Promise<UploadFileResponse> {
    const url = `${this.config.baseUrl}/v1/files/upload`;
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('user', params.user);

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.config.apiKey}` },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** 发送文本生成消息 */
  async sendCompletionMessage(
    params: SendCompletionMessageParams,
  ): Promise<CompletionMessageResponse | CompletionMessageChunkResponse[]> {
    const url = `${this.config.baseUrl}/v1/completion-messages`;
    const body = {
      inputs: params.inputs || {},
      response_mode: params.response_mode,
      user: params.user,
      files: params.files,
    };

    if (params.response_mode === 'blocking') {
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return response.json() as Promise<CompletionMessageResponse>;
    } else {
      // 流式处理逻辑
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.config.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const reader = response.body?.getReader();
      const chunks: CompletionMessageChunkResponse[] = [];
      let buffer = '';

      const processBuffer = () => {
        while (true) {
          const terminatorIdx = buffer.indexOf('\n\n');
          if (terminatorIdx === -1) break;

          const chunkStr = buffer.slice(0, terminatorIdx);
          buffer = buffer.slice(terminatorIdx + 2);

          if (chunkStr.startsWith('data:')) {
            try {
              const chunk = JSON.parse(chunkStr.replace('data: ', '')) as CompletionMessageChunkResponse;
              chunks.push(chunk);
              params.chunkCompletionCallback?.(chunk);
            } catch (e) {
              console.error('Chunk parse error:', chunkStr);
            }
          }
        }
      };

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            processBuffer(); // 处理剩余数据
            break;
          }
          buffer += new TextDecoder().decode(value);
          processBuffer();
        }
      }
      return chunks;
    }
  }

  /** 停止文本生成流式响应 */
  async stopCompletionMessage(params: StopCompletionMessageParams): Promise<StopCompletionMessageResult> {
    const url = `${this.config.baseUrl}/v1/completion-messages/${params.task_id}/stop`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: params.user }),
    });
    return response.json();
  }
}
