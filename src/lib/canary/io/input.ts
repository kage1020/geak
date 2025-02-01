export interface DataInputOptions {
  littleEndian?: boolean;
  offset?: number;
}

export class DataInput {
  private readonly littleEndian: boolean;
  public offset: number;
  private readonly array: Uint8Array;
  private readonly view: DataView;

  constructor(input: Uint8Array | ArrayLike<number> | ArrayBuffer, options?: DataInputOptions) {
    this.littleEndian = options?.littleEndian ?? false;
    this.offset = options?.offset ?? 0;
    this.array = input instanceof Uint8Array ? input : new Uint8Array(input);
    this.view = new DataView(this.array.buffer, this.array.byteOffset);
  }

  private readNumber(
    type: 'getInt8' | 'getInt16' | 'getInt32' | 'getFloat32' | 'getFloat64',
    size: number
  ) {
    const value = this.view[type](this.offset, this.littleEndian);
    this.offset += size;
    return value;
  }

  public readByte() {
    return this.readNumber('getInt8', 1);
  }

  public readShort() {
    return this.readNumber('getInt16', 2);
  }

  public readInt() {
    return this.readNumber('getInt32', 4);
  }

  public readFloat() {
    return this.readNumber('getFloat32', 4);
  }

  public readDouble() {
    return this.readNumber('getFloat64', 8);
  }

  public readBytes(length: number) {
    const bytes = this.array.slice(this.offset, this.offset + length);
    this.offset += length;
    return bytes;
  }

  public readString() {
    const length = this.readShort();
    const bytes = this.readBytes(length);
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  }
}
