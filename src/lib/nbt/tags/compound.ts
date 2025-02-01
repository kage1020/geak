import { DataInput } from '../io/input';
import { DataOutput } from '../io/output';
import { Json, JsonValue } from '../json';
import { NbtParser } from '../parser';
import { StringReader } from '../string-reader';
import { NbtTag } from './base';
import { NbtByte } from './byte';
import { NbtByteArray } from './byte-array';
import { NbtDouble } from './double';
import { NbtFloat } from './float';
import { NbtInt } from './int';
import { NbtIntArray } from './int-array';
import { NbtList } from './list';
import { NbtLong } from './long';
import { NbtLongArray } from './long-array';
import { NbtShort } from './short';
import { NbtString } from './string';
import { NbtType } from './type';

export class NbtCompound extends NbtTag {
  private readonly properties: Map<string, NbtTag>;

  constructor(properties?: Map<string, NbtTag>) {
    super();
    this.properties = properties ?? new Map();
  }

  public override getId() {
    return NbtType.Compound;
  }

  public override equals(other: NbtTag): boolean {
    return (
      other.isCompound() &&
      this.size === other.size &&
      [...this.properties.entries()].every(([key, value]) => {
        const otherValue = other.properties.get(key) as NbtTag | undefined;
        return otherValue !== undefined && value.equals(otherValue);
      })
    );
  }

  public has(key: string) {
    return this.properties.has(key);
  }

  public hasNumber(key: string) {
    return this.get(key)?.isNumber() ?? false;
  }

  public hasString(key: string) {
    return this.get(key)?.isString() ?? false;
  }

  public hasList(key: string, type?: number, length?: number) {
    const tag = this.get(key);
    return (
      (tag?.isList() &&
        (type === undefined || tag.getType() === type) &&
        (length === undefined || tag.length === length)) ??
      false
    );
  }

  public hasCompound(key: string) {
    return this.get(key)?.isCompound() ?? false;
  }

  public get(key: string) {
    return this.properties.get(key);
  }

  public getString(key: string) {
    return this.get(key)?.getAsString() ?? '';
  }

  public getNumber(key: string) {
    return this.get(key)?.getAsNumber() ?? 0;
  }

  public getBoolean(key: string) {
    return this.getNumber(key) !== 0;
  }

  public getList(key: string): NbtList;
  public getList(key: string, type: 1): NbtList<NbtByte>;
  public getList(key: string, type: 2): NbtList<NbtShort>;
  public getList(key: string, type: 3): NbtList<NbtInt>;
  public getList(key: string, type: 4): NbtList<NbtLong>;
  public getList(key: string, type: 5): NbtList<NbtFloat>;
  public getList(key: string, type: 6): NbtList<NbtDouble>;
  public getList(key: string, type: 7): NbtList<NbtByteArray>;
  public getList(key: string, type: 8): NbtList<NbtString>;
  public getList(key: string, type: 9): NbtList<NbtList>;
  public getList(key: string, type: 10): NbtList<NbtCompound>;
  public getList(key: string, type: 11): NbtList<NbtIntArray>;
  public getList(key: string, type: 12): NbtList<NbtLongArray>;
  public getList(key: string, type?: number) {
    const tag = this.get(key);
    if (tag?.isList() && (type === undefined || tag.getType() === type)) {
      return tag;
    }
    return NbtList.create();
  }

  public getCompound(key: string) {
    const tag = this.get(key);
    if (tag?.isCompound()) {
      return tag;
    }
    return NbtCompound.create();
  }

  public getByteArray(key: string) {
    const tag = this.get(key);
    if (tag?.isByteArray()) {
      return tag;
    }
    return NbtByteArray.create();
  }

  public getIntArray(key: string) {
    const tag = this.get(key);
    if (tag?.isIntArray()) {
      return tag;
    }
    return NbtIntArray.create();
  }

  public getLongArray(key: string) {
    const tag = this.get(key);
    if (tag?.isLongArray()) {
      return tag;
    }
    return NbtLongArray.create();
  }

  public keys() {
    return this.properties.keys();
  }

  public get size() {
    return this.properties.size;
  }

  public map<U>(fn: (key: string, value: NbtTag, compound: this) => [string, U]) {
    return Object.fromEntries(
      [...this.properties.entries()].map(([key, value]) => fn(key, value, this))
    );
  }

  public forEach(fn: (key: string, value: NbtTag, compound: this) => void) {
    [...this.properties.entries()].forEach(([key, value]) => fn(key, value, this));
  }

  public set(key: string, value: NbtTag) {
    this.properties.set(key, value);
    return this;
  }

  public delete(key: string) {
    return this.properties.delete(key);
  }

  public clear() {
    this.properties.clear();
    return this;
  }

  public override toString() {
    const pairs = [];
    for (const [key, tag] of this.properties.entries()) {
      const needsQuotes = key.split('').some((c) => !StringReader.isAllowedInUnquotedString(c));
      pairs.push((needsQuotes ? JSON.stringify(key) : key) + ':' + tag.toString());
    }
    return '{' + pairs.join(',') + '}';
  }

  public override toPrettyString(indent = '  ', depth = 0) {
    if (this.size === 0) return '{}';
    const i = indent.repeat(depth);
    const ii = indent.repeat(depth + 1);
    const pairs = [];
    for (const [key, tag] of this.properties.entries()) {
      const needsQuotes = key.split('').some((c) => !StringReader.isAllowedInUnquotedString(c));
      pairs.push(
        (needsQuotes ? JSON.stringify(key) : key) + ': ' + tag.toPrettyString(indent, depth + 1)
      );
    }
    return '{\n' + pairs.map((p) => ii + p).join(',\n') + '\n' + i + '}';
  }

  public override toSimplifiedJson() {
    return this.map((key, value) => [key, value.toSimplifiedJson()]);
  }

  public override toJson() {
    return this.map((key, value) => [
      key,
      {
        type: value.getId(),
        value: value.toJson(),
      },
    ]);
  }

  public override toBytes(output: DataOutput) {
    for (const [key, tag] of this.properties.entries()) {
      const id = tag.getId();
      output.writeByte(id);
      output.writeString(key);
      tag.toBytes(output);
    }
    output.writeByte(NbtType.End);
  }

  public static create() {
    return new NbtCompound();
  }

  public static fromString(reader: StringReader) {
    return NbtParser.readTag(reader);
  }

  public static fromJson(value: JsonValue) {
    const properties = Json.readMap(value, (e) => {
      const { type, value } = Json.readObject(e) ?? {};
      const id = Json.readNumber(type);
      const tag = NbtTag.fromJson(value ?? {}, id);
      return tag;
    });
    return new NbtCompound(new Map(Object.entries(properties)));
  }

  public static fromBytes(input: DataInput) {
    const properties = new Map<string, NbtTag>();
    while (true) {
      const id = input.readByte();
      if (id === NbtType.End) break;
      const key = input.readString();
      const value = NbtTag.fromBytes(input, id);
      properties.set(key, value);
    }
    return new NbtCompound(properties);
  }
}

NbtTag.register(NbtType.Compound, NbtCompound);
