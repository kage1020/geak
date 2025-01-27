import { DataInput, RawDataInput } from '@/lib/nbt/io/input';
import { DataOutput, RawDataOutput } from '@/lib/nbt/io/output';
import { Json, JsonValue } from '@/lib/nbt/json';
import { NbtCompound } from '@/lib/nbt/tags/compound';
import { NbtType } from '@/lib/nbt/tags/type';
import Pako from 'pako';

export type NbtCompressionMode = 'gzip' | 'zlib' | 'none';

export interface NbtCreateOptions {
  name?: string;
  compression?: NbtCompressionMode;
  littleEndian?: boolean;
  bedrockHeader?: number | boolean;
}

export function hasGzipHeader(array: Uint8Array) {
  const head = array.slice(0, 2);
  return head.length === 2 && head[0] === 0x1f && head[1] === 0x8b;
}

export function hasZlibHeader(array: Uint8Array) {
  const head = array.slice(0, 2);
  return (
    head.length === 2 &&
    head[0] === 0x78 &&
    (head[1] === 0x01 || head[1] === 0x5e || head[1] === 0x9c || head[2] === 0xda)
  );
}

export function getBedrockHeader(array: Uint8Array) {
  const head = array.slice(0, 8);
  const view = new DataView(head.buffer, head.byteOffset);
  const version = view.getUint32(0, true);
  const length = view.getUint32(4, true);
  if (head.length === 8 && version > 0 && version < 100 && length === array.byteLength - 8) {
    return version;
  }
  return undefined;
}

export class NbtFile {
  private static readonly DEFAULT_NAME = '';
  private static readonly DEFAULT_BEDROCK_HEADER = 4;

  constructor(
    public name: string,
    public root: NbtCompound,
    public compression: NbtCompressionMode,
    public readonly littleEndian: boolean,
    public readonly bedrockHeader: number | undefined
  ) {}

  private writeNamedTag(output: DataOutput) {
    output.writeByte(NbtType.Compound);
    output.writeString(this.name);
    this.root.toBytes(output);
  }

  public write() {
    const littleEndian = this.littleEndian === true || this.bedrockHeader !== undefined;
    const output = new RawDataOutput({ littleEndian, offset: this.bedrockHeader && 8 });
    this.writeNamedTag(output);

    if (this.bedrockHeader !== undefined) {
      const end = output.offset;
      output.offset = 0;
      output.writeInt(this.bedrockHeader);
      output.writeInt(end - 8);
      output.offset = end;
    }
    const array = output.getData();

    if (this.compression === 'gzip') {
      return Pako.gzip(array);
    } else if (this.compression === 'zlib') {
      return Pako.deflate(array);
    }
    return array;
  }

  private static readNamedTag(input: DataInput) {
    if (input.readByte() !== NbtType.Compound) {
      throw new Error('Top tag should be a compound');
    }
    return {
      name: input.readString(),
      root: NbtCompound.fromBytes(input),
    };
  }

  public static create(options: NbtCreateOptions = {}) {
    const name = options.name ?? NbtFile.DEFAULT_NAME;
    const root = NbtCompound.create();
    const compression = options.compression ?? 'none';
    const bedrockHeader =
      typeof options.bedrockHeader === 'boolean'
        ? NbtFile.DEFAULT_BEDROCK_HEADER
        : options.bedrockHeader;
    const littleEndian = options.littleEndian ?? options.bedrockHeader !== undefined;

    return new NbtFile(name, root, compression, littleEndian, bedrockHeader);
  }

  public static read(array: Uint8Array, options: NbtCreateOptions = {}) {
    const bedrockHeader =
      typeof options.bedrockHeader === 'number'
        ? options.bedrockHeader
        : options.bedrockHeader
        ? getBedrockHeader(array)
        : undefined;
    const isGzipCompressed =
      options.compression === 'gzip' ||
      (!bedrockHeader && options.compression === undefined && hasGzipHeader(array));
    const isZlibCompressed =
      options.compression === 'zlib' ||
      (!bedrockHeader && options.compression === undefined && hasZlibHeader(array));

    const uncompressedData = isZlibCompressed || isGzipCompressed ? Pako.inflate(array) : array;
    const littleEndian = options.littleEndian || bedrockHeader !== undefined;
    const compression = isGzipCompressed ? 'gzip' : isZlibCompressed ? 'zlib' : 'none';

    const input = new RawDataInput(uncompressedData, { littleEndian, offset: bedrockHeader && 8 });
    const { name, root } = NbtFile.readNamedTag(input);

    return new NbtFile(options.name ?? name, root, compression, littleEndian, bedrockHeader);
  }

  public toJson(): JsonValue {
    return {
      name: this.name,
      root: this.root.toJson(),
      compression: this.compression,
      littleEndian: this.littleEndian,
      bedrockHeader: this.bedrockHeader ?? null,
    };
  }

  public static fromJson(value: JsonValue): NbtFile {
    const obj = Json.readObject(value) ?? {};
    const name = Json.readString(obj.name) ?? '';
    const root = NbtCompound.fromJson(obj.root ?? {});
    const compression = (Json.readString(obj.compression) ?? 'none') as NbtCompressionMode;
    const littleEndian = Json.readBoolean(obj.littleEndian) ?? false;
    const bedrockHeader = Json.readNumber(obj.bedrockHeader);
    return new NbtFile(name, root, compression, littleEndian, bedrockHeader);
  }
}
