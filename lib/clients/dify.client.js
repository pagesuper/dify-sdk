"use strict";
/// 以下是models
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifyClient = void 0;
var tslib_1 = require("tslib");
/** 支持浏览器/Node 的 HTTP 客户端 */
var DifyClient = /** @class */ (function () {
    function DifyClient(config) {
        this.config = config;
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
                        url = "".concat(this.config.baseUrl, "/conversations?").concat(query);
                        return [4 /*yield*/, fetch(url, {
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), Accept: 'application/json' },
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
                        url = "".concat(this.config.baseUrl, "/messages?").concat(query);
                        console.log('url', url);
                        return [4 /*yield*/, fetch(url, {
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), Accept: 'application/json' },
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
            var url, response, reader, chunks_1, _b, done, value, text, lines;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/chat-messages");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
                                body: JSON.stringify(params),
                            })];
                    case 1:
                        response = _c.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        if (!(params.response_mode === 'blocking')) return [3 /*break*/, 2];
                        return [2 /*return*/, response.json()];
                    case 2:
                        reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
                        chunks_1 = [];
                        if (!reader) return [3 /*break*/, 5];
                        _c.label = 3;
                    case 3:
                        if (!true) return [3 /*break*/, 5];
                        return [4 /*yield*/, reader.read()];
                    case 4:
                        _b = _c.sent(), done = _b.done, value = _b.value;
                        if (done)
                            return [3 /*break*/, 5];
                        text = new TextDecoder().decode(value);
                        lines = text.split('\n\n').filter(function (line) { return line.startsWith('data: '); });
                        lines.forEach(function (line) {
                            var json = line.replace('data: ', '');
                            chunks_1.push(JSON.parse(json));
                        });
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, chunks_1];
                }
            });
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
                        url = "".concat(this.config.baseUrl, "/chat-messages/").concat(params.task_id, "/stop");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
                                body: JSON.stringify({ user: params.user }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
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
                        url = "".concat(this.config.baseUrl, "/messages/").concat(params.message_id, "/feedbacks");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
                                body: JSON.stringify({ rating: params.rating, user: params.user, content: params.content }),
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
                        url = "".concat(this.config.baseUrl, "/messages/").concat(params.message_id, "/suggested?user=").concat(encodeURIComponent(params.user));
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
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
                        url = "".concat(this.config.baseUrl, "/conversations/").concat(params.conversation_id);
                        return [4 /*yield*/, fetch(url, {
                                method: 'DELETE',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
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
                        url = "".concat(this.config.baseUrl, "/conversations/").concat(params.conversation_id, "/name");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
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
                        url = "".concat(this.config.baseUrl, "/audio-to-text");
                        formData = new FormData();
                        formData.append('file', params.file);
                        formData.append('user', params.user);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey) },
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
            var url, formData, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/text-to-audio");
                        formData = new FormData();
                        if (params.message_id) {
                            formData.append('message_id', params.message_id);
                        }
                        if (params.text) {
                            formData.append('text', params.text);
                        }
                        formData.append('user', params.user);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey) },
                                body: formData,
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
                        url = "".concat(this.config.baseUrl, "/parameters");
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey) },
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
     */
    DifyClient.prototype.getMeta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/meta");
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey) },
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
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/workflows/run/").concat(params.workflow_id);
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
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
     * 获取 Workflow 执行结果
     */
    DifyClient.prototype.getWorkflow = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/workflows/run/").concat(params.workflow_id);
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
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
                        url = "".concat(this.config.baseUrl, "/workflows/tasks/").concat(params.task_id, "/stop");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
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
                        url = "".concat(this.config.baseUrl, "/workflows/logs?keyword=").concat(params.keyword || '', "&status=").concat(params.status || '', "&page=").concat(params.page || 1, "&limit=").concat(params.limit || 20);
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' },
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
                        url = "".concat(this.config.baseUrl, "/files/upload");
                        formData = new FormData();
                        formData.append('file', params.file);
                        formData.append('user', params.user);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: { Authorization: "Bearer ".concat(this.config.apiKey) },
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
    return DifyClient;
}());
exports.DifyClient = DifyClient;
//# sourceMappingURL=dify.client.js.map