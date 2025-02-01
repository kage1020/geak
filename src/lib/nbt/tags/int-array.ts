import { DataInput } from '../io/input';
import { DataOutput } from '../io/output';
import { Json, JsonValue } from '../json';
import { NbtAbstractList } from './abstract-list';
import { NbtTag } from './base';
import { NbtInt } from './int';
import { NbtType } from './type';

export class NbtIntArray extends NbtAbstractList<NbtInt> {
  constructor(items?: ArrayLike<number | NbtInt>) {
    super(Array.from(items ?? [], (e) => (typeof e === 'number' ? new NbtInt(e) : e)));
  }

  public override getId() {
    return NbtType.IntArray;
  }

  public override equals(other: NbtTag): boolean {
    return (
      other.isIntArray() &&
      this.length === other.length &&
      this.items.every((item, i) => item.equals(other.items[i]))
    );
  }

  public override getType() {
    return NbtType.Int;
  }

  public get length() {
    return this.items.length;
  }

  public override toString() {
    const entries = this.items.map((e) => e.getAsNumber().toFixed());
    return '[I;' + entries.join(',') + ']';
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
    for (const entry of this.items) {
      output.writeInt(entry.getAsNumber());
    }
  }

  public static create() {
    return new NbtIntArray();
  }

  public static fromJson(value: JsonValue) {
    const items = Json.readArray(value, (e) => Json.readNumber(e) ?? 0) ?? [];
    return new NbtIntArray(items);
  }

  public static fromBytes(input: DataInput) {
    const length = input.readInt();
    const items = [];
    for (let i = 0; i < length; i += 1) {
      items.push(input.readInt());
    }
    return new NbtIntArray(items);
  }
}

NbtTag.register(NbtType.IntArray, NbtIntArray);
