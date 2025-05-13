"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifyDataset = void 0;
var tslib_1 = require("tslib");
var DifyDataset = /** @class */ (function () {
    function DifyDataset(config) {
        this.config = tslib_1.__assign({ defaultHeaders: {} }, config);
    }
    DifyDataset.prototype.getUploadFile = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/datasets/").concat(params.dataset_id, "/documents/").concat(params.document_id, "/upload-file");
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
    /**
     * 通过文本创建文档
     * @param params 创建文档参数
     * @returns 创建结果
     */
    DifyDataset.prototype.createDocumentByText = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dataset_id, bodyParams, url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataset_id = params.dataset_id, bodyParams = tslib_1.__rest(params, ["dataset_id"]);
                        url = "".concat(this.config.baseUrl, "/datasets/").concat(dataset_id, "/document/create-by-text");
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey), 'Content-Type': 'application/json' }, this.config.defaultHeaders),
                                body: JSON.stringify(bodyParams),
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
     * 通过文件创建文档
     * @param params 创建文档参数
     * @returns 创建结果
     */
    DifyDataset.prototype.createDocumentByFile = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dataset_id, file, original_document_id, restParams, url, formData, data, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataset_id = params.dataset_id, file = params.file, original_document_id = params.original_document_id, restParams = tslib_1.__rest(params, ["dataset_id", "file", "original_document_id"]);
                        url = "".concat(this.config.baseUrl, "/datasets/").concat(dataset_id, "/document/create-by-file");
                        formData = new FormData();
                        formData.append('file', file);
                        data = tslib_1.__assign(tslib_1.__assign({}, restParams), (original_document_id ? { original_document_id: original_document_id } : {}));
                        formData.append('data', JSON.stringify(data));
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
     * 创建空知识库
     * @param params 创建知识库参数
     * @returns 创建的知识库信息
     */
    DifyDataset.prototype.createDataset = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/datasets");
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
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 获取知识库列表
     * @param params 查询参数
     * @returns 知识库列表响应
     */
    DifyDataset.prototype.listDatasets = function (params) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queryParams, url, response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryParams = new URLSearchParams();
                        // 添加可选查询参数
                        if (params === null || params === void 0 ? void 0 : params.keyword)
                            queryParams.append('keyword', params.keyword);
                        if ((_a = params === null || params === void 0 ? void 0 : params.tag_ids) === null || _a === void 0 ? void 0 : _a.length)
                            queryParams.append('tag_ids', params.tag_ids.join(','));
                        if (params === null || params === void 0 ? void 0 : params.page)
                            queryParams.append('page', params.page.toString());
                        if (params === null || params === void 0 ? void 0 : params.limit)
                            queryParams.append('limit', params.limit.toString());
                        if (params === null || params === void 0 ? void 0 : params.include_all)
                            queryParams.append('include_all', params.include_all.toString());
                        url = "".concat(this.config.baseUrl, "/datasets?").concat(queryParams.toString());
                        return [4 /*yield*/, fetch(url, {
                                headers: tslib_1.__assign({ Authorization: "Bearer ".concat(this.config.apiKey) }, this.config.defaultHeaders),
                            })];
                    case 1:
                        response = _b.sent();
                        if (!response.ok) {
                            throw new Error("Request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * 获取知识库详情
     * @param dataset_id 知识库ID
     * @returns 知识库详细信息
     */
    DifyDataset.prototype.getDataset = function (dataset_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.config.baseUrl, "/datasets/").concat(dataset_id);
                        return [4 /*yield*/, fetch(url, {
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
    return DifyDataset;
}());
exports.DifyDataset = DifyDataset;
//# sourceMappingURL=dify.dataset.js.map