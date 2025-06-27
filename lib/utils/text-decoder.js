"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompatibleTextDecoder = /** @class */ (function () {
    function CompatibleTextDecoder(encoding) {
        if (encoding === void 0) { encoding = 'utf-8'; }
        this.encoding = encoding.toLowerCase();
        this._buffer = [];
    }
    CompatibleTextDecoder.prototype.decode = function (input, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var uint8Array = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
        uint8Array.forEach(function (bf) {
            _this._buffer.push(bf);
        });
        if (!options.stream) {
            var str = String.fromCharCode.apply(String, this._buffer);
            this._buffer = [];
            return this.encoding === 'utf-8' ? decodeURIComponent(escape(str)) : str;
        }
        return ''; // 流模式下暂不返回
    };
    return CompatibleTextDecoder;
}());
/**
 * 流式解码函数
 * @param input 二进制数据块
 * @param options 配置项 { encoding: 编码格式, stream: 是否流模式 }
 * @returns 解码后的字符串
 */
function streamDecode(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.encoding, encoding = _a === void 0 ? 'utf-8' : _a, _b = options.stream, stream = _b === void 0 ? false : _b;
    // 1. 环境检测与Polyfill注入
    if (typeof TextDecoder === 'undefined') {
        globalThis.TextDecoder = CompatibleTextDecoder;
    }
    // 2. 解码逻辑
    var decoder = new TextDecoder(encoding);
    try {
        return decoder.decode(input, { stream: stream });
    }
    catch (e) {
        console.warn('流式解码失败，降级处理:', e);
        // 降级方案：手动维护缓冲区
        if (!streamDecode._buffer) {
            streamDecode._buffer = new Uint8Array(0);
        }
        var inputArray = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
        var tmp = new Uint8Array(streamDecode._buffer.length + inputArray.length);
        tmp.set(streamDecode._buffer, 0);
        tmp.set(inputArray, streamDecode._buffer.length);
        streamDecode._buffer = tmp;
        return stream ? '' : decoder.decode(streamDecode._buffer);
    }
}
function decode(input, options) {
    if (options === void 0) { options = {}; }
    return streamDecode(input, options);
}
exports.default = {
    decode: decode,
};
//# sourceMappingURL=text-decoder.js.map