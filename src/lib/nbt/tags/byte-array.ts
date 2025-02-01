import { DataInput } from '../io/input';
import { DataOutput } from '../io/output';
import { Json, JsonValue } from '../json';
import { NbtAbstractList } from './abstract-list';
import { NbtTag } from './base';
import { NbtByte } from './byte';
import { NbtType } from './type';

export class NbtByteArray extends NbtAbstractList<NbtByte> {
  constructor(items?: ArrayLike<number | NbtByte>) {
    super(Array.from(items ?? [], (e) => (typeof e === 'number' ? new NbtByte(e) : e)));
  }

  public override getId() {
    return NbtType.ByteArray;
  }

  public override equals(other: NbtTag) {
    return (
      other.isByteArray() &&
      this.length === other.length &&
      this.items.every((item, i) => item.equals(other.items[i]))
    );
  }

  public override getType() {
    return NbtType.Byte;
  }

  public override toString() {
    const entries = this.items.map((e) => e.getAsNumber().toFixed() + 'B');
    return '[B;' + entries.join(',') + ']';
  }

  public override toPrettyString() {
    return this.toString();
  }

  public override toSimplifiedJson() {
    return this.items.map((e) => e.getAsNumber());
  }

  public override toJson() {
    return this.items.map((e) => e.getAsNumber());
  }

  public override toBytes(output: DataOutput) {
    output.writeInt(this.items.length);
    output.writeBytes(this.items.map((e) => e.getAsNumber()));
  }

  public static create() {
    return new NbtByteArray([]);
  }

  public static fromJson(value: JsonValue) {
    const items = Json.readArray(value, (e) => Json.readNumber(e) ?? 0) ?? [];
    return new NbtByteArray(items);
  }

  public static fromBytes(input: DataInput) {
    const length = input.readInt();
    const items = input.readBytes(length);
    return new NbtByteArray(items);
  }
}

NbtTag.register(NbtType.ByteArray, NbtByteArray);
