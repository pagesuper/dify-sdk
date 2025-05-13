"use strict";
/// 以下是models
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifyClient = exports.MIME_MAP = void 0;
var tslib_1 = require("tslib");
exports.MIME_MAP = {
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
function omit(obj, keys) {
    return new Proxy(obj, {
        get: function (target, prop) {
            return keys.includes(prop) ? undefined : target[prop];
        },
        ownKeys: function (target) {
            return Object.keys(target).filter(function (key) { return !keys.includes(key); });
        },
        // 其他trap根据需要实现
    });
}
/** 支持浏览器/Node 的 HTTP 客户端 */
var DifyClient = /** @class */ (function () {
    function DifyClient(config) {
        this.config = tslib_1.__assign({ defaultHeaders: {} }, config);
    }
    DifyClient.prototype.getConfig = function () {
        return this.config;
    };
    /** 获取会话列表 */
    DifyClient.prototype.getConversations = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new URLSearchParams({ user: params.user });
                        if (params.last_id) {
                            query.set('last_id', params.last_id);
                        }
                        if (params.limit) {
                            query.set('limit', String(params.limit));
                        }
                        if (params.sort_by) {
                            query.set('sort_by', params.sort_by);
                        }
                        url = "".concat(this.config.baseUrl, "/v1/conversations?").concat(query);
                        return [4 /*yield*/, fetch(url, {
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), Accept: 'application/json' }, this.config.defaultHeaders),
                                method: 'GET',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /** 获取消息列表 */
    DifyClient.prototype.getMessages = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new URLSearchParams({ conversation_id: params.conversation_id, user: params.user });
                        if (params.first_id) {
                            query.set('first_id', params.first_id);
                        }
                        if (params.limit) {
                            query.set('limit', String(params.limit));
                        }
                        url = "".concat(this.config.baseUrl, "/v1/messages?").concat(query);
                        return [4 /*yield*/, fetch(url, {
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), Accept: 'application/json' }, this.config.defaultHeaders),
                                method: 'GET',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /** 发送消息 */
    DifyClient.prototype.sendMessage = function (params) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var useReader, url, response, reader, chunks, buffer, _b, done, value;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        useReader = (function () {
                            var _a;
                            try {
                                return ((_a = new Response(new ReadableStream()).body) === null || _a === void 0 ? void 0 : _a.getReader()) !== undefined;
                            }
                            catch (_b) {
                                return false;
                            }
                        })();
                        if (!(!useReader && params.response_mode === 'streaming')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handleStreamWithXHR(params)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        url = "".concat(this.config.baseUrl, "/v1/chat-messages");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify(tslib_1.__assign({ inputs: {} }, params)),
                            })];
                    case 3:
                        response = _c.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        if (!(params.response_mode === 'blocking')) return [3 /*break*/, 4];
                        return [2 /*return*/, response.json()];
                    case 4:
                        reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
                        chunks = [];
                        buffer = '';
                        if (!reader) return [3 /*break*/, 7];
                        _c.label = 5;
                    case 5:
                        if (!true) return [3 /*break*/, 7];
                        return [4 /*yield*/, reader.read()];
                    case 6:
                        _b = _c.sent(), done = _b.done, value = _b.value;
                        // 将Buffer转换为字符串
                        buffer += new TextDecoder().decode(value, { stream: true });
                        buffer = this.parseAndFlushBuffer({ buffer: buffer, chunks: chunks, params: params });
                        if (done) {
                            // 最后一次解析（处理可能的残留数据）
                            this.parseAndFlushBuffer({ buffer: buffer, chunks: chunks, params: params });
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 5];
                    case 7: return [2 /*return*/, chunks];
                }
            });
        });
    };
    DifyClient.prototype.parseAndFlushBuffer = function (options) {
        var buffer = options.buffer;
        var chunks = options.chunks;
        while (true) {
            var splitMark = '\n\n';
            // 分割数据块（根据服务端规范调整分隔符）
            var chunkEnd = buffer.indexOf(splitMark);
            // 数据不完整，继续等待
            if (chunkEnd === -1)
                break;
            var chunkData = buffer.slice(0, chunkEnd + splitMark.length);
            buffer = buffer.slice(chunkEnd + splitMark.length);
            // 解析JSON
            if (chunkData.trim().startsWith('data:')) {
                try {
                    var chunk = JSON.parse(chunkData.replace(/^data: /, ''));
                    if (typeof options.params.chunkCompletionCallback === 'function') {
                        options.params.chunkCompletionCallback(chunk);
                    }
                    chunks.push(chunk);
                }
                catch (parseError) {
                    console.error('Failed to parse chunk:', chunkData);
                    throw new Error("Invalid chunk format: ".concat(chunkData));
                }
            }
        }
        return buffer;
    };
    DifyClient.prototype.handleStreamWithXHR = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            var url = "".concat(_this.config.baseUrl, "/v1/chat-messages");
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', "Bearer ".concat(_this.config.apiKey));
            xhr.setRequestHeader('Content-Type', 'application/json');
            _this.config.defaultHeaders &&
                Object.keys(_this.config.defaultHeaders).forEach(function (key) {
                    xhr.setRequestHeader(key, _this.config.defaultHeaders[key]);
                });
            var buffer = '';
            var chunks = [];
            var lastProcessedLength = 0;
            xhr.onprogress = function () {
                var newData = xhr.responseText.slice(lastProcessedLength);
                lastProcessedLength = xhr.responseText.length;
                buffer += newData;
                // 分割数据块（根据服务端规范调整分隔符）
                var splitMark = '\n\n';
                while (true) {
                    var chunkEnd = buffer.indexOf(splitMark);
                    if (chunkEnd === -1)
                        break;
                    var chunkData = buffer.slice(0, chunkEnd + splitMark.length);
                    buffer = buffer.slice(chunkEnd + splitMark.length);
                    if (chunkData.trim().startsWith('data:')) {
                        try {
                            var chunk = JSON.parse(chunkData.replace(/^data: /, ''));
                            if (typeof params.chunkCompletionCallback === 'function') {
                                params.chunkCompletionCallback(chunk);
                            }
                            chunks.push(chunk);
                        }
                        catch (e) {
                            console.error('Chunk parse error:', chunkData);
                        }
                    }
                }
            };
            xhr.onloadend = function () {
                // 请求完成
                if (xhr.status >= 400) {
                    reject(new Error("Request failed: ".concat(xhr.statusText)));
                }
                else {
                    resolve(chunks);
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network error'));
            };
            // 发送请求
            xhr.send(JSON.stringify(tslib_1.__assign({ inputs: {} }, params)));
        });
    };
    /**
     * 停止响应
     */
    DifyClient.prototype.stopMessageResponse = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/chat-messages/").concat(params.task_id, "/stop");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify({ user: params.user }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 创建反馈
     */
    DifyClient.prototype.createMessageFeedback = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/messages/").concat(params.message_id, "/feedbacks");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify(tslib_1.__assign({}, omit(params, ['message_id']))),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 获取建议问题列表
     */
    DifyClient.prototype.getMessageSuggests = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/messages/").concat(params.message_id, "/suggested?user=").concat(encodeURIComponent(params.user));
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 删除会话
     */
    DifyClient.prototype.deleteConversation = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/conversations/").concat(params.conversation_id);
                        return [4 /*yield*/, fetch(url, {
                                method: 'DELETE',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify({ user: params.user }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 重命名会话
     */
    DifyClient.prototype.renameConversation = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/conversations/").concat(params.conversation_id, "/name");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify({ name: params.name, auto_generate: params.auto_generate, user: params.user }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 语音转文字
     */
    DifyClient.prototype.audioToText = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, formData, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/audio-to-text");
                        formData = new FormData();
                        formData.append('file', params.file);
                        formData.append('user', params.user);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey) }, this.config.defaultHeaders),
                                body: formData,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 文字转语音
     */
    DifyClient.prototype.textToAudio = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/text-to-audio");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify(params),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.blob()];
                }
            });
        });
    };
    /**
     * 获取应用参数
     */
    DifyClient.prototype.getParameters = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/parameters");
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey) }, this.config.defaultHeaders),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /** 获取应用基本信息 */
    DifyClient.prototype.getInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/info");
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey) }, this.config.defaultHeaders),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 获取应用 Meta 信息
     * - 用于获取工具icon
     */
    DifyClient.prototype.getMeta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/meta");
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey) }, this.config.defaultHeaders),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 运行 Workflow
     */
    DifyClient.prototype.runWorkflow = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, isStreaming, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/workflows/run");
                        isStreaming = params.response_mode === 'streaming';
                        // 处理流式响应
                        if (isStreaming) {
                            return [2 /*return*/, this.handleWorkflowStream(params, url)];
                        }
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify(params),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Workflow failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 处理流式响应
     */
    DifyClient.prototype.handleWorkflowStream = function (params, url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            // 设置请求头
            xhr.setRequestHeader('Authorization', "Bearer ".concat(_this.config.apiKey));
            xhr.setRequestHeader('Content-Type', 'application/json');
            if (_this.config.defaultHeaders) {
                Object.keys(_this.config.defaultHeaders).forEach(function (key) {
                    xhr.setRequestHeader(key, _this.config.defaultHeaders[key]);
                });
            }
            var buffer = '';
            var chunks = [];
            var lastProcessedLength = 0;
            // 流式数据处理
            xhr.onprogress = function () {
                var newData = xhr.responseText.slice(lastProcessedLength);
                lastProcessedLength = xhr.responseText.length;
                buffer += newData;
                // 事件分割处理（根据服务端规范使用 \n\n 分隔符）
                while (buffer.includes('\n\n')) {
                    var chunkEnd = buffer.indexOf('\n\n');
                    var chunkStr = buffer.slice(0, chunkEnd);
                    buffer = buffer.slice(chunkEnd + 2);
                    if (chunkStr.startsWith('data:')) {
                        try {
                            var chunkData = JSON.parse(chunkStr.replace(/^data: /, '').trim());
                            chunks.push(chunkData);
                        }
                        catch (e) {
                            console.error('Failed to parse workflow chunk:', chunkStr);
                        }
                    }
                }
            };
            // 请求完成处理
            xhr.onloadend = function () {
                if (xhr.status >= 400) {
                    reject(new Error("Workflow failed: ".concat(xhr.status, " ").concat(xhr.statusText)));
                }
                else {
                    resolve(chunks);
                }
            };
            // 错误处理
            xhr.onerror = function () {
                reject(new Error('Network error'));
            };
            // 发送请求
            xhr.send(JSON.stringify(params));
        });
    };
    /**
     * 获取 Workflow 执行结果
     */
    DifyClient.prototype.getWorkflow = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/workflows/run/").concat(params.workflow_id);
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 停止 Workflow 任务
     */
    DifyClient.prototype.stopWorkflowTask = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/workflows/tasks/").concat(params.task_id, "/stop");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify({ user: params.user }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 获取 Workflow 日志
     */
    DifyClient.prototype.getWorkflowLogs = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/workflows/logs?keyword=").concat(params.keyword || '', "&status=").concat(params.status || '', "&page=").concat(params.page || 1, "&limit=").concat(params.limit || 20);
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /** 上传文件 */
    DifyClient.prototype.uploadFile = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, formData, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/files/upload");
                        formData = new FormData();
                        formData.append('file', params.file);
                        formData.append('user', params.user);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey) }, this.config.defaultHeaders),
                                body: formData,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /** 发送文本生成消息 */
    DifyClient.prototype.sendCompletionMessage = function (params) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, body, response, response, reader, chunks_1, buffer_1, processBuffer, _b, done, value;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/completion-messages");
                        body = {
                            inputs: params.inputs || {},
                            response_mode: params.response_mode,
                            user: params.user,
                            files: params.files,
                        };
                        if (!(params.response_mode === 'blocking')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify(body),
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response.json()];
                    case 2: return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                            body: JSON.stringify(body),
                        })];
                    case 3:
                        response = _c.sent();
                        reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
                        chunks_1 = [];
                        buffer_1 = '';
                        processBuffer = function () {
                            var _a;
                            while (true) {
                                var terminatorIdx = buffer_1.indexOf('\n\n');
                                if (terminatorIdx === -1)
                                    break;
                                var chunkStr = buffer_1.slice(0, terminatorIdx);
                                buffer_1 = buffer_1.slice(terminatorIdx + 2);
                                if (chunkStr.startsWith('data:')) {
                                    try {
                                        var chunk = JSON.parse(chunkStr.replace('data: ', ''));
                                        chunks_1.push(chunk);
                                        (_a = params.chunkCompletionCallback) === null || _a === void 0 ? void 0 : _a.call(params, chunk);
                                    }
                                    catch (e) {
                                        console.error('Chunk parse error:', chunkStr);
                                    }
                                }
                            }
                        };
                        if (!reader) return [3 /*break*/, 6];
                        _c.label = 4;
                    case 4:
                        if (!true) return [3 /*break*/, 6];
                        return [4 /*yield*/, reader.read()];
                    case 5:
                        _b = _c.sent(), done = _b.done, value = _b.value;
                        if (done) {
                            processBuffer(); // 处理剩余数据
                            return [3 /*break*/, 6];
                        }
                        buffer_1 += new TextDecoder().decode(value);
                        processBuffer();
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/, chunks_1];
                }
            });
        });
    };
    /** 停止文本生成流式响应 */
    DifyClient.prototype.stopCompletionMessage = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/v1/completion-messages/").concat(params.task_id, "/stop");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify({ user: params.user }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return DifyClient;
}());
exports.DifyClient = DifyClient;
//# sourceMappingURL=dify.client.js.map