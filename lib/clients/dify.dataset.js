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
                        // console.log('response:', response);
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