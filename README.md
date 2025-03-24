# Dify SDK

Dify SDK 是一个用于与 Dify 平台交互的 TypeScript/JavaScript SDK。它提供了与 Dify API 的完整集成，支持发送消息、管理会话、处理文件上传等功能。通过 Dify SDK，开发者可以轻松地将 Dify 的功能集成到自己的应用中。

## 安装

使用 npm 安装 Dify SDK：

```bash
npm install dify-sdk
# or
yarn add dify-sdk
# or
bun add dify-sdk
```

## 快速开始

### 初始化客户端

首先，初始化 `DifyClient` 并配置 API 密钥和基础 URL：

```typescript
import { DifyClient } from 'dify-sdk';

const difyClient = new DifyClient({
  baseUrl: 'https://api.dify.ai', // 替换为实际的 Dify API 地址
  apiKey: 'your-api-key', // 替换为你的 API 密钥
});
```

### 主要方法

以下是 Dify SDK 的主要方法：

#### 发送消息

使用 `sendMessage` 方法发送消息，支持流式响应和阻塞模式：

```typescript
const result = await difyClient.sendMessage({
  query: '你好，Dify！',
  response_mode: 'streaming', // 或 'blocking'
  user: 'user-001',
  streamingCallback: (chunk) => {
    console.log('chuck: ...', chunk);
  }
});

if (Array.isArray(result)) {
  result.forEach(chunk => {
    console.log(chunk.answer); // 处理流式响应的数据块
  });
} else {
  console.log(result.answer); // 处理阻塞模式的完整响应
}
```

#### 获取会话列表

使用 `getConversations` 方法获取用户的会话列表：

```typescript
const conversations = await difyClient.getConversations({
  user: 'user-001',
  limit: 10,
});

console.log(conversations.data); // 输出会话列表
```

#### 上传文件

使用 `uploadFile` 方法上传文件：

```typescript
const fileResponse = await difyClient.uploadFile({
  file: new File(['file content'], 'example.txt'),
  user: 'user-001',
});

console.log(fileResponse.id); // 输出文件 ID
```

#### 获取消息列表

使用 `getMessages` 方法获取指定会话的消息列表：

```typescript
const messages = await difyClient.getMessages({
  conversation_id: 'conversation-id',
  user: 'user-001',
});

console.log(messages.data); // 输出消息列表
```

#### 停止响应

使用 `stopMessageResponse` 方法停止流式响应：

```typescript
const stopResponse = await difyClient.stopMessageResponse({
  task_id: 'task-id',
  user: 'user-001',
});

console.log(stopResponse.result); // 输出停止结果
```

### 其他方法

Dify SDK 还提供了许多其他功能，例如创建反馈、获取建议问题、删除会话、重命名会话、语音转文字、文字转语音等。详细信息请查看[源代码](https://github.com/pagesuper/dify-sdk)。

以上是 Dify SDK 的 README 文件，包含了主要方法的示例和其他功能的说明。如果需要更多详细信息，请查看源代码。