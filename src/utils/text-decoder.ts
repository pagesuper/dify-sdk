/**
 * 流式解码器（TypeScript 版）
 * 支持原生 TextDecoder 的流式解码，兼容低版本环境
 */
interface StreamDecodeOptions {
  encoding?: string;
  stream?: boolean;
}

class CompatibleTextDecoder {
  private _buffer: number[];
  private encoding: string;

  constructor(encoding: string = 'utf-8') {
    this.encoding = encoding.toLowerCase();
    this._buffer = [];
  }

  decode(input: ArrayBuffer | Uint8Array, options: { stream?: boolean } = {}): string {
    const uint8Array = input instanceof ArrayBuffer ? new Uint8Array(input) : input;

    uint8Array.forEach((bf) => {
      this._buffer.push(bf);
    });

    if (!options.stream) {
      const str = String.fromCharCode(...this._buffer);
      this._buffer = [];
      return this.encoding === 'utf-8' ? decodeURIComponent(escape(str)) : str;
    }
    return ''; // 流模式下暂不返回
  }
}

/**
 * 流式解码函数
 * @param input 二进制数据块
 * @param options 配置项 { encoding: 编码格式, stream: 是否流模式 }
 * @returns 解码后的字符串
 */
function streamDecode(input: ArrayBuffer | Uint8Array, options: StreamDecodeOptions = {}): string {
  const { encoding = 'utf-8', stream = false } = options;

  // 1. 环境检测与Polyfill注入
  if (typeof TextDecoder === 'undefined') {
    (globalThis as any).TextDecoder = CompatibleTextDecoder;
  }

  // 2. 解码逻辑
  const decoder = new TextDecoder(encoding);
  try {
    return decoder.decode(input, { stream });
  } catch (e) {
    console.warn('流式解码失败，降级处理:', e);

    // 降级方案：手动维护缓冲区
    if (!streamDecode._buffer) {
      streamDecode._buffer = new Uint8Array(0);
    }

    const inputArray = input instanceof ArrayBuffer ? new Uint8Array(input) : input;

    const tmp = new Uint8Array(streamDecode._buffer.length + inputArray.length);
    tmp.set(streamDecode._buffer, 0);
    tmp.set(inputArray, streamDecode._buffer.length);
    streamDecode._buffer = tmp;

    return stream ? '' : decoder.decode(streamDecode._buffer);
  }
}

// 静态缓冲区变量声明
declare namespace streamDecode {
  let _buffer: Uint8Array | null;
}

function decode(input: ArrayBuffer | Uint8Array, options: StreamDecodeOptions = {}): string {
  return streamDecode(input, options);
}

export default {
  decode,
};
