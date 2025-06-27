/**
 * 流式解码器（TypeScript 版）
 * 支持原生 TextDecoder 的流式解码，兼容低版本环境
 */
interface StreamDecodeOptions {
    encoding?: string;
    stream?: boolean;
}
declare function decode(input: ArrayBuffer | Uint8Array, options?: StreamDecodeOptions): string;
declare const _default: {
    decode: typeof decode;
};
export default _default;
